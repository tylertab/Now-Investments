import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const investments = [
  {
    title: "Tech Growth Fund",
    date: "2024-03-15 @ 12:00",
    ticker: "TGF",
    href: "/",
  },
  {
    title: "Global Markets ETF",
    date: "2024-03-14 @ 12:00",
    ticker: "GME",
    href: "/",
  },
  {
    title: "Sustainable Energy",
    date: "2024-03-13 @ 12:00",
    ticker: "SEN",
    href: "/",
  },
  {
    title: "Healthcare Innovation",
    date: "2024-03-12 @ 12:00",
    ticker: "HCI",
    href: "/",
  },
  {
    title: "Real Estate Trust",
    date: "2024-03-11 @ 12:00",
    ticker: "RET",
    href: "/",
  },
]

const summary = [{
  title: "Tech Growth Fund",
  date: "2024-03-15 @ 12:00",
  ticker: "TGF",
  href: "/",
  roi: "-2.1%",
},
{
  title: "Global Markets ETF",
  date: "2024-03-14 @ 12:00",
  ticker: "GME",
  href: "/",
  roi: "-2.1%",
},
{
  title: "Sustainable Energy",
  date: "2024-03-13 @ 12:00",
  ticker: "SEN",
  href: "/",
  roi: "+2.1%",
},
{
  title: "Healthcare Innovation",
  date: "2024-03-12 @ 12:00",
  ticker: "HCI",
  href: "/",
  roi: "+2.1%",
},
{
  title: "Real Estate Trust",
  date: "2024-03-11 @ 12:00",
  ticker: "RET",
  href: "/",
  roi: "+2.1%",
},]

import { articleData } from "@/app/data/data"

export function TableDemo() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent investments.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Ticker</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articleData.map((article) => (
          <TableRow key={article.id}>
            {typeof window !== 'undefined' && window.innerWidth > 768 ? (
              <>
                <TableCell><Link href={"/story/" + article.id}>{article.data.title}</Link></TableCell>
                <TableCell>{article.data.publishedAt}</TableCell>
                <TableCell>{article.data.tickers}</TableCell>
              </>
            ) : (
              <>
                <TableCell><span className="text-sm">{article.data.title.substring(0, 20)}...</span></TableCell>
                <TableCell><span className="text-sm">{article.data.publishedAt}</span></TableCell>
                <TableCell><span className="text-sm">{article.data.tickers}</span></TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


export function PosSummaryTable() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent investments.</TableCaption> */}
      <TableBody>
        {summary.map((summary) => (
          <TableRow key={summary.ticker}>
            {summary.roi.startsWith("+") && <TableCell className = "text-2xl" >{summary.ticker}</TableCell>}
            {summary.roi.startsWith("+") && <TableCell className="text-right font-medium text-green-400">{summary.roi}</TableCell>}
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function NegSummaryTable() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent investments.</TableCaption> */}
      <TableBody>
        {summary.map((summary) => (
          <TableRow key={summary.ticker}>
            {summary.roi.startsWith("-") && <TableCell className = "text-2xl" >{summary.ticker}</TableCell>}
            {summary.roi.startsWith("-") && <TableCell className="text-right font-medium text-red-400">{summary.roi}</TableCell>}
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
