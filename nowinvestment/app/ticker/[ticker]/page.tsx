"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { getTickerPrices, type AlphaVantageResponse } from "@/app/data/data"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface ChartDataPoint {
  date: string;
  tickerClose: number;
  sp500Close: number;
}

export default function TickerPage() {
  const params = useParams()
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      Promise.all([
        getTickerPrices(params.ticker as string),
        getTickerPrices('^GSPC') // S&P 500 symbol
      ])
        .then(([tickerData, sp500Data]) => {
          if (!tickerData || !tickerData['Time Series (Daily)'] || !sp500Data || !sp500Data['Time Series (Daily)']) {
            setError('Invalid data structure received from API')
            return
          }

          const tickerSeries = tickerData['Time Series (Daily)']
          const sp500Series = sp500Data['Time Series (Daily)']

          // Get common dates between both series
          const commonDates = Object.keys(tickerSeries).filter(date => sp500Series[date])
          
          const formattedData = commonDates
            .map(date => {
              const tickerDaily = tickerSeries[date]
              const sp500Daily = sp500Series[date]
              
              if (!tickerDaily || !tickerDaily['4. close'] || !sp500Daily || !sp500Daily['4. close']) return null
              
              return {
                date,
                tickerClose: parseFloat(tickerDaily['4. close']),
                sp500Close: parseFloat(sp500Daily['4. close'])
              }
            })
            .filter((item): item is ChartDataPoint => item !== null)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30) // Show last 30 days

          if (formattedData.length === 0) {
            setError('No valid data points found')
            return
          }

          setChartData(formattedData)
        })
        .catch((err: Error) => {
          console.error('Error fetching data:', err)
          setError(err.message || 'Failed to fetch data')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    fetchData()
  }, [params.ticker])

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {error}</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Please try again later or check if the ticker symbol is correct.
        </div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="p-6">
        <div className="text-muted-foreground">No data available for this ticker.</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{String(params.ticker).toUpperCase()} vs S&P 500</h1>
        <p className="text-muted-foreground">Last 30 Days</p>
      </div>
      
      <ChartContainer config={{
        tickerClose: {
          label: `${String(params.ticker).toUpperCase()} Close Price`,
          color: "hsl(var(--primary))",
        },
        sp500Close: {
          label: "S&P 500 Close Price",
          color: "hsl(var(--secondary))",
        }
      }}>
        <LineChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 12,
            bottom: 12,
          }}
          width={800}
          height={400}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Date
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {new Date(payload[0].payload.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {String(params.ticker).toUpperCase()}
                        </span>
                        <span className="font-bold">
                          ${payload[0].payload.tickerClose.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          S&P 500
                        </span>
                        <span className="font-bold">
                          ${payload[0].payload.sp500Close.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="tickerClose"
            name={`${String(params.ticker).toUpperCase()} Close`}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="sp500Close"
            name="S&P 500 Close"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>

      <div className="mt-4 flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
            {chartData.length > 1 && (
              <>
                <div className="flex items-center gap-2">
                  {chartData[chartData.length - 1].tickerClose > chartData[0].tickerClose ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                  )}
                  {String(params.ticker).toUpperCase()}: {((chartData[chartData.length - 1].tickerClose - chartData[0].tickerClose) / chartData[0].tickerClose * 100).toFixed(2)}%
                </div>
                <div className="flex items-center gap-2">
                  {chartData[chartData.length - 1].sp500Close > chartData[0].sp500Close ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                  )}
                  S&P 500: {((chartData[chartData.length - 1].sp500Close - chartData[0].sp500Close) / chartData[0].sp500Close * 100).toFixed(2)}%
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing last 30 days of trading data
          </div>
        </div>
      </div>
    </div>
  )
}