import React from 'react'
import Card from '../utils/Card'
import StatisticsCard from './StatisticsCard'
import Chart from '../Charts/Chart'
// eslint-disable-next-line
import Pie_Chart from '../Charts/PieChart'
import RecentOrders from './RecentOrders'
import TopProducts from './TopProducts'
import { statisticsData } from './StatisticsData'

const Statistics = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-7">
                {statisticsData.map((item) => (
                    <StatisticsCard {...item} />
                ))}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-7 h-96 overflow-hidden">
                <Card className="col-span-2">
                    <h3 className="font-semibold text-lg mb-4">Revenue</h3>
                    <Chart />
                </Card>
                <Card>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-semibold text-lg">Top Products</h3>
                        <p className="cursor-pointer">See all</p>
                    </div>
                    <TopProducts />
                </Card>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-7 h-80 mb-7">
                <Card className="">
                    <h3 className="font-semibold text-lg mb-4">
                        Product Status
                    </h3>
                    <Pie_Chart />
                </Card>
                <Card className="col-span-2">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                        <p className="cursor-pointer">See all</p>
                    </div>
                    <RecentOrders />
                </Card>
            </div>
        </>
    )
}

export default Statistics
