import React from 'react'
import totalUserIcon from '../../assets/icons/group.svg'
import totalOrderIcon from '../../assets/icons/order.svg'
import totalSalesIcon from '../../assets/icons/line_chart.svg'
import totalPendingIcon from '../../assets/icons/history.svg'

export const statisticsData = [
    {
        title: 'Total User',
        data: '40,689',
        difference: 8.5,
        icon: <img src={totalUserIcon} alt="statics icon" />,
        bgColor: '#e4e4ff',
    },
    {
        title: 'Total Order',
        data: '10293',
        difference: 1.3,
        icon: <img src={totalOrderIcon} alt="statics icon" />,
        bgColor: '#fcf2d6',
    },
    {
        title: 'Total Sales',
        data: '$ 89,000',
        difference: -4.3,
        icon: <img src={totalSalesIcon} alt="statics icon" />,
        bgColor: '#d8f7e7',
    },
    {
        title: 'Total Pending',
        data: '2040',
        difference: 1.8,
        icon: <img src={totalPendingIcon} alt="statics icon" />,
        bgColor: '#ffddd1',
    },
]
