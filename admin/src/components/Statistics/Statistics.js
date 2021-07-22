import React, { useEffect } from 'react'
import Card from '../utils/Card'
import Revenue from './Revenue'
import StatisticsCard from './StatisticsCard'
import Chart from '../Charts/Chart'

const Statistics = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-7">
                <StatisticsCard />
                <StatisticsCard />
                <StatisticsCard />
                <StatisticsCard />
            </div>
            <div className="mt-7 grid grid-cols-3 gap-7 h-96">
                <Card className="col-span-2">
                    <h3 className="font-semibold text-lg mb-4">Revenue</h3>
                    {/* <Chart /> */}
                </Card>
                <Card>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-semibold text-lg">Top Products</h3>
                        <p>See all</p>
                    </div>
                </Card>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-7 h-80">
                <Card className="">
                    <h3 className="font-semibold text-lg mb-4">
                        Product Status
                    </h3>
                </Card>
                <Card className="col-span-2">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                        <p>See all</p>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Statistics
