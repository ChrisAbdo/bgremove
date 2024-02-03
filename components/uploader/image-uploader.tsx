"use client"

import { ChangeEvent, useCallback, useMemo, useState } from "react"
import * as fal from "@fal-ai/serverless-client"
import { UploadIcon } from "@radix-ui/react-icons"
import { PutBlobResult } from "@vercel/blob"
import { toast } from "sonner"

import { Button } from "../ui/button"
import ImageDisplay from "./image-display"

fal.config({
  proxyUrl: "/api/fal/proxy",
})

interface FalResult {
  image: {
    url: string
  }
}

export default function Uploader() {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [rmbgUrl, setRmbgUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)")
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )

  const [saving, setSaving] = useState(false)

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  async function createImg({ url }: { url: string }) {
    // Wrap the async operation in a promise
    const processImage = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await fal.subscribe("fal-ai/imageutils", {
            path: "/rembg",
            input: {
              image_url: url,
            },
            logs: true,
            onQueueUpdate(update) {
              console.log("queue update", update)
            },
          })

          // Resolve the promise with the result
          // @ts-ignore
          resolve(result.image.url)
          // @ts-ignore
          setRmbgUrl(result.image.url)
        } catch (error) {
          // Reject the promise if there's an error
          reject(error)
        }
      })

    // Use toast.promise to show loading, success, or error states
    toast.promise(
      processImage(), // Execute the processImage function which returns a Promise
      {
        loading: "Processing image...",
        success: "Image processing complete!",
        error: "Error processing image.",
      }
    )
  }

  return (
    <>
      {rmbgUrl ? (
        <ImageDisplay
          generatedUrl={generatedUrl || ""}
          rmbgUrl={rmbgUrl || ""}
        />
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (e) => {
            e.preventDefault()
            setSaving(true)
            fetch("/api/blob", {
              method: "POST",
              headers: {
                "content-type": file?.type || "application/octet-stream",
              },
              body: file,
            }).then(async (res) => {
              if (res.status === 200) {
                const { url } = (await res.json()) as PutBlobResult
                setGeneratedUrl(url)
                createImg({ url })
                console.log(url)
              } else {
                const error = await res.text()
                toast.error(error)
              }
              setSaving(false)
            })
          }}
        >
          <div>
            <label
              htmlFor="image-upload"
              className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border bg-background shadow-sm transition-all hover:bg-muted"
            >
              <div
                className="absolute z-50 h-full w-full rounded-md"
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragActive(true)
                }}
                onDragEnter={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragActive(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragActive(false)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragActive(false)

                  const file = e.dataTransfer.files && e.dataTransfer.files[0]
                  if (file) {
                    if (file.size / 1024 / 1024 > 50) {
                      toast.error("File size too big (max 50MB)")
                    } else {
                      setFile(file)
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        setData((prev) => ({
                          ...prev,
                          image: e.target?.result as string,
                        }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }
                }}
              />
              <div
                className={`${
                  dragActive ? "border-2" : ""
                } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                  data.image
                    ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                    : "bg-background opacity-100 hover:bg-muted"
                }`}
              >
                <UploadIcon
                  className={`${
                    dragActive ? "scale-110" : "scale-100"
                  } h-7 w-7 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                />
                <p className="mt-2 text-center text-sm">
                  Drag and drop or click to upload.
                </p>
                <p className="mt-2 text-center text-sm">Max file size: 50MB</p>
                <span className="sr-only">Photo upload</span>
              </div>
              {data.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.image}
                  alt="Preview"
                  className="relative z-50 h-full w-full rounded-md object-cover" // Add relative and z-10 to the class
                />
              )}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onChangePicture}
              />
            </div>
          </div>

          <Button disabled={saveDisabled} className="w-full" type="submit">
            {saving ? "Processing..." : "Remove Background"}
          </Button>
        </form>
      )}
    </>
  )
}
