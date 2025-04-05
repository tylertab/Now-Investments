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

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent investments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Ticker</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment) => (
          <TableRow key={investment.ticker}>
            <TableCell className="font-medium hover:underline text-blue-500"><Link href={investment.href}>{investment.title}</Link></TableCell>
            <TableCell>{investment.date}</TableCell>
            <TableCell>{investment.ticker}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
