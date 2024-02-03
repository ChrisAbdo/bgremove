import React from "react"

import ImageUploader from "@/components/uploader/image-uploader"

export default function Home() {
  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Remove Any Image Background
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              100% Completely free and automatic
            </p>
            <div className="mt-10">
              <ImageUploader />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
