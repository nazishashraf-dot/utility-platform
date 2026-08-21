import ImageCompressorForm from "@/components/ImageCompressorForm";

export const metadata = {
  title: "Image Compressor - JPG, PNG, WEBP | Utility Platform",
  description:
    "Compress JPG, PNG, or WEBP images entirely in your browser. Nothing is ever uploaded to a server.",
};

export default function ImageCompressorPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Image Compressor
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Shrink a JPG, PNG, or WEBP image right in your browser. Your
          image is processed locally and never uploaded anywhere.
        </p>
        <div className="mt-8">
          <ImageCompressorForm />
        </div>
      </div>
    </div>
  );
}
