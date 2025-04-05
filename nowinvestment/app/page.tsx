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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { TableDemo } from "@/app/components/table"

export default function Home() {
  return (
    <div className="p-4">
      <header>
        <span>Ticker</span><span>Ticker</span>
        <div className="mt-6 mb-4 text-4xl font-bold flex items-center">
          <span className="text-red-500 mr-1">&bull;</span><h1>NowInvestments</h1>
        </div>
      </header>
      <main className="">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="politics">Politics</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="">
            <div className="flex flex-col pt-4">
              <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
              <Carousel className="w-full max-w-xs" opts={{
                align: "start",
                loop: true,
              }}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
              >
                <CarouselContent className="w-full">
                  <CarouselItem>
                    <Card>
                      <CardHeader className="h-full w-full flex flex-col">
                        <CardTitle className="text-xl font-bold p-1">Story 1</CardTitle>
                        <CardDescription className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader className="h-full w-full flex flex-col">
                        <CardTitle className="text-xl font-bold p-1">Story 2</CardTitle>
                        <CardDescription className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader className="h-full w-full flex flex-col">
                        <CardTitle className="text-xl font-bold p-1">Story 3</CardTitle>
                        <CardDescription className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader className="h-full w-full flex flex-col">
                        <CardTitle className="text-xl font-bold p-1">Story 4</CardTitle>
                        <CardDescription className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader className="h-full w-full flex flex-col">
                        <CardTitle className="text-xl font-bold p-1">Story 5</CardTitle>
                        <CardDescription className="p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>

                </CarouselContent>
              </Carousel>
            </div>
          </TabsContent>
          <TabsContent value="politics">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Trending Stories</h2>
            </div>
          </TabsContent>
          <TabsContent value="tech">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Trending Stories</h2>
            </div>
          </TabsContent>
          <TabsContent value="entertainment">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Trending Stories</h2>
            </div>
          </TabsContent>
          <TabsContent value="health">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Trending Stories</h2>
            </div>
          </TabsContent>
        </Tabs>
        <h2 className="pt-4 text-2xl font-bold">Other Stories</h2>
        <TableDemo />
      </main>

    </div>
  );
}
