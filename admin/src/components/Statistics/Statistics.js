import React from 'react'
import Card from '../utils/Card'
import StatisticsCard from './StatisticsCard'
import Chart from '../Charts/Chart'
import CustomPieChart from '../Charts/PieChart'
import RecentOrders from './RecentOrders'
import TopProducts from './TopProducts'
import { statisticsData } from './StatisticsData'
import { Link } from 'react-router-dom'

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
                        <Link to="/products" className="cursor-pointer">
                            See all
                        </Link>
                    </div>
                    <TopProducts />
                </Card>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-7 h-80 mb-7">
                <Card className="">
                    <h3 className="font-semibold text-lg mb-4">
                        Product Status
                    </h3>
                    <CustomPieChart />
                </Card>
                <Card className="col-span-2 overflow-auto">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                        <Link to="/orders" className="cursor-pointer">
                            See all
                        </Link>
                    </div>
                    <RecentOrders />
                </Card>
            </div>
        </>
    )
}

export default Statistics
