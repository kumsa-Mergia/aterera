import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";

export default function UploadHeader() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-green-200 via-green-500 to-green-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
          >
            <Sparkle className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-green-500 text-base">
              AI Powered Content Creation
            </p>
          </Badge>
        </div>
        <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          
          <span className="relative inline-block">
          Start Uploading Your
            <span className="text-green-400">  PDF's</span>.
          </span>
        </div>
        <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            <p>upload your PDF and let our AI do the magic!</p>
        </div>
        <form action=""></form>
      </div>    )
}