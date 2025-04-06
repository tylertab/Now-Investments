import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { articleData } from "@/app/data/data";

export function News() {
    const router = useRouter();
    const categories = Array.from(new Set(articleData.map(article => article.data.category)));

    return (
        <Tabs defaultValue="all" className="w-full md:w-full lg:w-full p-4">
            <TabsList className="w-full md:w-full lg:w-full overflow-scroll">
                <TabsTrigger value="all" className="flex-1 data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-all duration-200">All</TabsTrigger>
                {categories.map((category) => (
                    <TabsTrigger 
                        key={category} 
                        value={category} 
                        className="flex-1 data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-all duration-200"
                    >
                        {category}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="all">
                <div className="flex flex-col pt-4 items-center">
                    <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
                    <Carousel 
                        className="w-full md:w-[50vw] lg:w-[60vw] max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto h-auto" 
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                    >
                        <div className="w-full h-auto">
                            <CarouselContent className="flex gap-4">
                                {articleData.map((article) => (
                                    <CarouselItem key={article.id}>
                                        <Card 
                                            className="overflow-hidden p-0 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                                            onClick={() => router.push(`/story/${article.id}`)}
                                        >
                                            <AspectRatio ratio={16/9}>
                                                <Image 
                                                    src={article.data.urlToImage}
                                                    alt={article.data.title}
                                                    fill
                                                    className="object-cover w-full h-full opacity-50"
                                                />
                                                <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                    <CardTitle className="md:text-2xl font-bold text-white">{article.data.title}</CardTitle>
                                                    <CardDescription className="text-sm text-white/80">{article.data.summary.substring(0, 100)}...</CardDescription>
                                                </CardContent>
                                            </AspectRatio>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className="invisible md:visible lg:visible absolute top-1/2" />
                            <CarouselPrevious className="invisible md:visible lg:visible absolute top-1/2" />
                        </div>
                    </Carousel>
                </div>
            </TabsContent>
            {categories.map((category) => (
                <TabsContent key={category} value={category}>
                    <div className="flex flex-col pt-4 items-center">
                        <h2 className="text-2xl font-bold mb-4">Trending in {category}</h2>
                        <Carousel 
                            className="w-full md:w-[50vw] lg:w-[60vw] max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto h-auto" 
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 5000,
                                }),
                            ]}
                        >
                            <div className="w-full h-auto">
                                <CarouselContent className="flex gap-4">
                                    {articleData
                                        .filter(article => article.data.category === category)
                                        .map((article) => (
                                            <CarouselItem key={article.id}>
                                                <Card 
                                                    className="overflow-hidden p-0 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                                                    onClick={() => router.push(`/story/${article.id}`)}
                                                >
                                                    <AspectRatio ratio={16/9}>
                                                        <Image 
                                                            src={article.data.urlToImage}
                                                            alt={article.data.title}
                                                            fill
                                                            className="object-cover w-full h-full opacity-50"
                                                        />
                                                        <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                            <CardTitle className="text-2xl font-bold text-white">{article.data.title}</CardTitle>
                                                            <CardDescription className="text-sm text-white/80">{article.data.summary.substring(0, 10)}...</CardDescription>
                                                        </CardContent>
                                                    </AspectRatio>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                </CarouselContent>
                                <CarouselNext className="invisible md:visible lg:visible absolute top-1/2" />
                                <CarouselPrevious className="invisible md:visible lg:visible absolute top-1/2" />
                            </div>
                        </Carousel>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default News;