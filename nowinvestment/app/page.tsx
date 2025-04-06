"use client"
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { TableDemo, PosSummaryTable, NegSummaryTable } from "@/app/components/table"
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {News} from "@/app/components/news"
import MarqueeStocks from "@/app/components/marquee"
export default function Home() {
  return (
    <div className="">
      <header>
        <MarqueeStocks />
        <div className="pr-4 pl-4 mt-6 mb-4 text-4xl font-bold flex items-center">
          <span className="text-red-500 mr-1 ">&bull;</span><h1>NowInvestments</h1>
        </div>
      </header>
      <main className="pr-4 pl-4">
        <News/>
        <h2 className="pt-4 text-2xl font-bold">Other Stories</h2>
        <TableDemo />
        <h2 className="pt-4 text-2xl font-bold">Today's Summary</h2>
        <h3 className="pt-2 text-lg text-green-400">Building Momentum</h3>
        <PosSummaryTable />
        <h3 className="pt-2 text-lg text-red-400">On the Decline</h3>
        <NegSummaryTable />
      </main>

    </div>
  );
}
