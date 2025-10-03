import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/charts'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { BaseRecord, useList } from '@refinedev/core'


export const DealsChart = () => {
    const { query: { data, isLoading, error } } = useList({
        resource: 'dealStages',
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY 
        }
    })

    const dealData = React.useMemo(() => {
        return transformDealData(data?.data || []);
    }, [data?.data])

    const config: AreaConfig = {
        data: dealData,
        xField: 'timeText',
        yField: 'value',
        stack : false,
        seriesField : 'state',
        legend : {
            offsetY : -6
        },

        style: {
            fill: 'l(270) 0:#ffffff 0.5:#87d068 1:#52c41a',
        },
        line: {
            color: '#52c41a',
        },
        point: {
            size: 4,
            shape: 'circle',
            style: {
                fill: '#52c41a',
                stroke: '#ffffff',
                lineWidth: 2,
            },
        },
        axis: {
            y: {
                tickCount : 6,
                label: {
                    formatter: (v: string) => `$${(Number(v) / 1000)}k`,
                },
            },
        },
        tooltip: {
            formatter: (datum: any) => {
                return {
                    name: 'Deals',
                    value: `$${datum.value.toLocaleString()}`,
                }
            },
        },
    }

    return (
        <Card
        style={{
            height : "100%"
        }}
        styles={{
            header: { padding: "8px 16px" },
            body: { padding: "24px 24px 0 24px" }
        }}
        title ={
            <div
            style={{
                display : "flex",
                alignItems :"center",
                gap : "8px"
            }}>
                <DollarOutlined/>

                    <Text size="sm" style = {{marginLeft : "0.5rem"}}> 
                        Deals
                    </Text>
        
            </div>
        }
        >
            {isLoading ? (
                <div style={{ 
                    height: 325, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <Text>Loading deals data...</Text>
                </div>
            ) : error ? (
                <div style={{ 
                    height: 325, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <Text type="secondary">Failed to load deals data</Text>
                </div>
            ) : (
                <Area
                    {...config}
                    height={325}
                />
            )}
        </Card>
    )
}

// Transform deal data into chart format
function transformDealData(data: BaseRecord[]): any[] {
    if (!data || data.length === 0) {
        // Return sample data if no data is available
        return [
            { timeText: 'Jan', value: 3000 },
            { timeText: 'Feb', value: 4000 },
            { timeText: 'Mar', value: 3500 },
            { timeText: 'Apr', value: 5000 },
            { timeText: 'May', value: 4900 },
            { timeText: 'Jun', value: 6000 },
            { timeText: 'Jul', value: 7000 },
            { timeText: 'Aug', value: 9000 },
            { timeText: 'Sep', value: 13000 },
            { timeText: 'Oct', value: 8000 },
            { timeText: 'Nov', value: 12000 },
            { timeText: 'Dec', value: 15000 },
        ]
    }
    
    // Transform actual data (adapt this based on your data structure)
    return data.map((item: any, index: number) => ({
        timeText: item.title || `Stage ${index + 1}`,
        value: item.dealsAggregate?.sum?.value || Math.random() * 10000 + 1000
    }))
}

