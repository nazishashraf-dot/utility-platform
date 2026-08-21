"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE_BYTES,
  calculateReductionPercent,
  formatBytes,
} from "@/features/fileTools/imageCompressor/format";

function getDownloadFilename(originalName) {
  const lastDot = originalName.lastIndexOf(".");
  if (lastDot === -1) return `${originalName}-compressed`;
  return `${originalName.slice(0, lastDot)}-compressed${originalName.slice(lastDot)}`;
}

export default function ImageCompressorForm() {
  const fileInputId = useId();
  const qualityInputId = useId();

  const [selectedFile, setSelectedFile] = useState(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState(null);
  const [quality, setQuality] = useState(80);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const bitmapRef = useRef(null);
  const requestIdRef = useRef(0);

  // Revoke each object URL exactly when it stops being the active one -
  // either replaced by a new one or the component unmounting.
  useEffect(() => {
    if (!originalPreviewUrl) return undefined;
    return () => URL.revokeObjectURL(originalPreviewUrl);
  }, [originalPreviewUrl]);

  useEffect(() => {
    if (!compressedPreviewUrl) return undefined;
    return () => URL.revokeObjectURL(compressedPreviewUrl);
  }, [compressedPreviewUrl]);

  useEffect(() => {
    return () => bitmapRef.current?.close?.();
  }, []);

  async function handleFile(file) {
    setErrorMessage(null);
    setCompressedBlob(null);
    setCompressedPreviewUrl(null);
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMessage("Please choose a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        `That file is too large to compress in the browser (max ${formatBytes(
          MAX_FILE_SIZE_BYTES
        )}).`
      );
      return;
    }

    setIsLoadingImage(true);
    try {
      const bitmap = await createImageBitmap(file);
      bitmapRef.current?.close?.();
      bitmapRef.current = bitmap;
      setSelectedFile(file);
      setOriginalPreviewUrl(URL.createObjectURL(file));
    } catch {
      setErrorMessage(
        "Unable to read this image. It may be corrupted or in an unsupported format."
      );
    } finally {
      setIsLoadingImage(false);
    }
  }

  async function compress() {
    const bitmap = bitmapRef.current;
    const file = selectedFile;
    if (!bitmap || !file) return;

    const requestId = ++requestIdRef.current;
    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, 0, 0);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, file.type, quality / 100);
      });

      if (requestIdRef.current !== requestId) return; // superseded, ignore
      if (!blob) throw new Error("toBlob returned null");

      setCompressedBlob(blob);
      setCompressedPreviewUrl(URL.createObjectURL(blob));
    } catch {
      if (requestIdRef.current !== requestId) return;
      setErrorMessage("Unable to compress this image. Try a different file.");
    } finally {
      if (requestIdRef.current === requestId) setIsCompressing(false);
    }
  }

  // Recompress whenever the file or quality changes, debounced so dragging
  // the slider doesn't fire a canvas re-encode on every pixel of movement.
  useEffect(() => {
    if (!selectedFile || !bitmapRef.current) return undefined;

    const timeoutId = setTimeout(() => {
      compress();
    }, 200);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, quality]);

  function handleDrop(event) {
    event.preventDefault();
    setIsDraggingOver(false);
    handleFile(event.dataTransfer.files?.[0] ?? null);
  }

  function handleDownload() {
    if (!compressedPreviewUrl || !selectedFile) return;
    const link = document.createElement("a");
    link.href = compressedPreviewUrl;
    link.download = getDownloadFilename(selectedFile.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const reductionPercent = compressedBlob
    ? calculateReductionPercent(selectedFile.size, compressedBlob.size)
    : null;

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          isDraggingOver
            ? "border-primary-400 bg-primary-50"
            : "border-gray-300 bg-white hover:border-primary-300"
        }`}
      >
        <label htmlFor={fileInputId} className="cursor-pointer">
          <p className="text-sm font-medium text-gray-700">
            Drop an image here, or{" "}
            <span className="text-primary-600 underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="mt-1 text-xs text-gray-400">JPG, PNG, or WEBP</p>
        </label>
        <input
          id={fileInputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </div>

      {isLoadingImage && (
        <p className="mt-4 text-center text-sm text-gray-400">
          Loading image...
        </p>
      )}

      {errorMessage && (
        <p className="mt-4 text-center text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      {selectedFile && (
        <>
          <div className="mt-6">
            <label
              htmlFor={qualityInputId}
              className="flex items-center justify-between text-sm font-medium text-gray-700"
            >
              <span>Quality</span>
              <span>{quality}%</span>
            </label>
            <input
              id={qualityInputId}
              type="range"
              min={10}
              max={100}
              step={1}
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
            {selectedFile.type === "image/png" && (
              <p className="mt-2 text-xs text-gray-400">
                PNG is lossless, so the quality slider won&apos;t shrink it
                much. For the biggest savings, try a JPEG or WEBP source
                image instead.
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-200/50">
              <p className="text-xs font-medium text-gray-500">Original</p>
              {originalPreviewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={originalPreviewUrl}
                  alt="Original"
                  className="mt-2 max-h-48 w-full rounded-lg object-contain"
                />
              )}
              <p className="mt-2 text-sm font-semibold text-gray-900">
                {formatBytes(selectedFile.size)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-200/50">
              <p className="text-xs font-medium text-gray-500">Compressed</p>
              {compressedPreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={compressedPreviewUrl}
                  alt="Compressed"
                  className="mt-2 max-h-48 w-full rounded-lg object-contain"
                />
              ) : (
                <div className="mt-2 flex h-48 items-center justify-center text-xs text-gray-400">
                  {isCompressing ? "Compressing..." : "No preview yet"}
                </div>
              )}
              <p className="mt-2 text-sm font-semibold text-gray-900">
                {compressedBlob ? formatBytes(compressedBlob.size) : "-"}
              </p>
            </div>
          </div>

          {compressedBlob && reductionPercent !== null && (
            <div className="mt-4 rounded-xl bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100/60 p-6 text-center">
              <p className="text-sm font-medium text-gray-500">
                {reductionPercent >= 0 ? "Size reduced by" : "Size increased by"}
              </p>
              <p className="mt-1 text-3xl font-bold text-primary-600 sm:text-4xl">
                {formatBytes(selectedFile.size)} &rarr;{" "}
                {formatBytes(compressedBlob.size)}
              </p>
              <p className="mt-1 text-lg font-semibold text-primary-600">
                {Math.abs(reductionPercent).toFixed(1)}%
              </p>

              <button
                type="button"
                onClick={handleDownload}
                className="mt-4 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Download Compressed Image
              </button>
            </div>
          )}
        </>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        Your image is processed entirely in your browser using the Canvas
        API - it is never uploaded to a server. Nothing leaves your device.
      </p>
    </div>
  );
}
