import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"
import ReactCompareImage from "react-compare-image"

import { Button } from "../ui/button"

export default function ImageDisplay({
  generatedUrl,
  rmbgUrl,
}: {
  generatedUrl: string
  rmbgUrl: string
}) {
  return (
    <>
      <ReactCompareImage leftImage={generatedUrl} rightImage={rmbgUrl} />

      <Link href={rmbgUrl}>
        <Button className="mt-2">
          <DownloadIcon className="mr-2 h-5 w-5" />
          Download
        </Button>
      </Link>
    </>
  )
}
