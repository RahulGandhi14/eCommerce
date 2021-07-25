import React from 'react'
import Card from '../utils/Card'
import Trend from '../utils/Trend'

const StatisticsCard = (props) => {
    return (
        <Card className={`${props.className}`}>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-light-secondary text-xs font-bold">
                        {props.title}
                    </h3>
                    <p className="text-2xl font-bold mt-3 mb-6">{props.data}</p>
                </div>
                <div
                    className="ml-5 p-3 h-14 w-14 rounded-2xl flex justify-center items-center"
                    style={{ backgroundColor: props.bgColor }}
                >
                    {props.icon}
                </div>
            </div>
            <p className="text-xs flex items-center font-semibold">
                <Trend className={props.difference < 0 && 'rotateX180'} />
                &nbsp;{Math.abs(props.difference)} %{' '}
                {props.difference < 0 ? 'Down' : 'Up'} from yesterday
            </p>
        </Card>
    )
}

export default StatisticsCard
