"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

export default function ImageGallery({ images, name }: { images: GalleryItem[]; name: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="font-eurostile text-7xl font-bold text-brand-blue/20">M</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/3] rounded overflow-hidden bg-gray-100">
        <Image
          src={images[active].url}
          alt={images[active].description || name}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                active === i ? "border-brand-green" : "border-gray-200 hover:border-brand-blue"
              }`}
            >
              <Image src={img.url} alt={img.name} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
