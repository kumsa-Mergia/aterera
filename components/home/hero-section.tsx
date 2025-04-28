import { ArrowRight, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex justify-center mb-4">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-green-200 via-green-500 to-green-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-green-50 transition-colors duration-200"
          >
            <Sparkle className="h-6 w-6 mr-2 text-green-600 animate-pulse" />
            <p className="text-base text-green-600">Powered by AI</p>
          </Badge>
        </div>
      </div>
      
      <h1 className="font-bold py-6 text-center">
        <span className="relative inline-block">
          “Turn your documents into{" "}
          <span className="text-green-400">insight</span>.”
        </span>
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Quickly generate a stunning summary of your document.
      </h2>
      <div className="mt-6">
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-green-500 hover:from-green-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try Aterera</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
