import React from 'react'
import {
    XAxis,
    YAxis,
    Line,
    Tooltip,
    ComposedChart,
    CartesianGrid,
    ResponsiveContainer,
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
            width={765}
            height={300}
            data={data}
            className="width-auto"
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow
                        dx="0"
                        dy="18"
                        stdDeviation="11"
                        floodColor="#8ce7ba"
                    />
                </filter>
            </defs>
            <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize="0.75rem"
                height={18}
            />
            <YAxis
                axisLine={false}
                tickLine={false}
                fontSize="0.75rem"
                width={34}
            />
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Line
                dataKey="uv"
                type="monotone"
                dot={false}
                stroke="#52da95"
                strokeWidth={2}
                filter="url(#shadow)"
            />
        </ComposedChart>
    )
}

export default Chart
