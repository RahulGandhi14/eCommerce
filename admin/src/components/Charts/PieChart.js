import React, { PureComponent } from 'react'
import {
    PieChart,
    Pie,
    Legend,
    Cell,
    Sector,
    ResponsiveContainer,
} from 'recharts'
import './Chart.scss'

const data = [
    { name: 'Delivered', value: 400, color: '#66d4c0' },
    { name: 'Pending', value: 250, color: '#fec53a' },
    { name: 'Canceled', value: 100, color: '#ed7970' },
]

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    let {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            {/* <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            /> */}
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >
                {value}
            </text>
        </g>
    )
}

export default class Pie_Chart extends PureComponent {
    state = {
        activeIndex: 0,
    }

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        })
    }

    renderLegend = (props) => {
        const { payload } = props

        return (
            <div className="flex justify-around text-xs pt-10">
                {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center">
                        <div
                            className="h-3 w-3 mr-1"
                            style={{ background: `${entry.color}` }}
                        ></div>{' '}
                        <div>{entry.value}</div>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart className={`flex justify-center width-auto`}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Legend content={this.renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }
}
