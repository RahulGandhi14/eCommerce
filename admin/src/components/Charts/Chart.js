import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    LineChart,
} from 'recharts'

const data = [
    {
        name: 'Page A',
        uv: 2000,
    },
    {
        name: 'Page B',
        uv: 3000,
    },
    {
        name: 'Page C',
        uv: 2000,
    },
    {
        name: 'Page D',
        uv: 2780,
    },
    {
        name: 'Page E',
        uv: 1890,
    },
    {
        name: 'Page F',
        uv: 2390,
    },
    {
        name: 'Page G',
        uv: 3490,
    },
    {
        name: 'Page H',
        uv: 30,
    },
]

const Chart = () => {
    return (
        <ComposedChart
            width={800}
            height={300}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="10" stdDeviation="11" />
                </filter>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#129a74" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                </linearGradient>
            </defs>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <Line
                dataKey="uv"
                type="monotone"
                fill="black"
                color="black"
                stroke="black"
                strokeWidth={2}
                filter="url(#shadow)"
            />
            <Area
                dataKey="uv"
                type="monotone"
                fill="url(#colorUv)"
                fillOpacity={1}
            />
        </ComposedChart>
    )
}

export default Chart
