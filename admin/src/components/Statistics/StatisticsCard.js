import React from 'react'
import Card from '../utils/Card'
import Trend from '../utils/Trend'

const StatisticsCard = (props) => {
    return (
        <Card className={`${props.className}`}>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-light-secondary text-xs font-bold">
                        Total Revenue
                    </h3>
                    <p className="text-2xl font-bold mt-3 mb-6">$8,521</p>
                </div>
                <div className="bg-primary-light ml-5 p-3 h-14 w-14 rounded-2xl flex justify-center items-center">
                    <i className="ri-group-fill text-2xl"></i>
                </div>
            </div>
            <p className="text-xs flex items-center">
                <Trend />
                &nbsp;8.5% Up from yesterday
            </p>
        </Card>
    )
}

export default StatisticsCard
