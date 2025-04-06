import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articleData } from "@/app/data/data";

export function Article({ id }: { id: string }) {
    const router = useRouter();
    const article = articleData.find(a => a.id === Number(id));
    if (!article) {
        return <div>Article not found</div>;
    }
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold pl-2 pr-2">{article.data.title}</h1>
            <p className="text-xl text-gray-300 p-2 ">{article.data.publishedAt}</p>
            <AspectRatio ratio={16 / 9}>
                <img 
                    src={article.data.urlToImage}
                    alt={article.data.title}
                    className="object-cover w-full h-full flex-col item-center rounded-lg "
                />
            </AspectRatio>
            <p className="text-xl text-gray-500 p-2">{article.data.summary}</p>
            <h2 className="text-2xl font-bold p-2">Insights</h2>
            <p className="text-xl text-gray-500 p-2">{article.data.insight}</p>
            <h2 className="text-2xl font-bold p-2">Sentiment</h2>
            <p className="text-xl text-gray-500 p-2">{article.data.sentiment}</p>
            <h2 className="text-2xl font-bold p-2">Market Impact</h2>
            <p className="text-xl text-gray-500 p-2">{article.data.marketImpact}</p>
            <h2 className="text-2xl font-bold p-2">Key Metrics</h2>
            <div className="text-xl text-gray-500 p-2">
                {Object.entries(article.data.keyMetrics).map(([key, value]) => (
                    <p key={key}><b>{key}</b>: {value}</p>
                ))}
            </div>
            <h2 className="text-2xl font-bold p-2">Related Tickers</h2>
            <div className="flex flex-row gap-2">
                {article.data.tickers.map((ticker: string) => (
                    <Button key={ticker} onClick={() => router.push(`/ticker/${ticker}`)} variant="outline" className="text-lg text-sky-800 hover: hover:bg-blue-500 hover:text-white">{ticker}</Button>
                ))}
                {article.data.relatedTickers.map((ticker: string) => (
                    <Button key={ticker} onClick={() => router.push(`/ticker/${ticker}`)} variant="outline" className="text-lg text-gray-500 hover: hover:bg-blue-500 hover:text-white">{ticker}</Button>
                ))}
            </div>
        </div>
    );
}





