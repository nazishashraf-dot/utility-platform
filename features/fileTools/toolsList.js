import { FolderIcon, ImageIcon } from "@/components/icons";

// Single source of truth for the File Tools hub, so the hub page, the
// homepage card, and the header nav link can't drift out of sync. New
// file tools get added here and automatically show up on the hub page.
// Everything in this category runs entirely in the browser - no file is
// ever uploaded to a server.
export const fileTools = [
  {
    name: "Image Compressor",
    description: "Shrink JPG, PNG, or WEBP images - processed locally, never uploaded.",
    href: "/file-tools/image-compressor",
    icon: ImageIcon,
  },
];

// The one link the header and homepage grid show for this section - it
// points at the hub, not at any individual tool.
export const fileToolsHubLink = {
  name: "File Tools",
  description: "Client-side file tools: image compression, and more to come.",
  href: "/file-tools",
  icon: FolderIcon,
};

export default fileTools;
