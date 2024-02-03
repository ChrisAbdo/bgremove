import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import {
  GitHubLogoIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function LearnMore() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <QuestionMarkIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <DrawerHeader className="mx-auto mt-4 max-w-lg gap-4">
          <DrawerTitle>Welcome to bg.remove</DrawerTitle>
          <DrawerDescription>
            This is an Open Source AI-powered tool to remove the background from
            any image. It&apos;s free and easy to use. Just upload your image
            and download the result.
            <br />
            <Link href="https://www.github.com/chrisabdo/bgremove">
              <Button>
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
                View GitHub Repository
              </Button>
            </Link>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
