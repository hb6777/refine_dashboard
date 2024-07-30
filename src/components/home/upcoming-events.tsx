import { Badge, Card, List } from 'antd'
import React, { useState } from 'react'
import { Text } from '../text'
import { CalendarOutlined } from '@ant-design/icons'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { getDate } from '@/utilities/helpers'
import { useList } from '@refinedev/core'
import gql from 'graphql-tag'
import {DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY} from "@/graphql/queries"
import dayjs from 'dayjs'

const UpcomingEvents = () => {
 
    const {data, isLoading} = useList({
        resource: 'events',
        pagination: {pageSize: 5},
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        // filters:[
        //     {
        //         field:'startDate',
        //         operator:'gte',
        //         value: dayjs().format('YYYY-MM-DD')
        //     }
        // ],
        meta: {
            gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY 
        }
    });

  // alert(JSON.stringify(data?.total));


    return (
        <Card
            style={{ height: '100%' }}
            bodyStyle={{ padding: '0 1rem' }}
            headStyle={{ padding: '8px 16px' }}
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <CalendarOutlined />
                    <Text size="sm" style={{ marginLeft: "0.7rem" }}>
                        Upcoming Events
                    </Text>
                </div>
            }
        >

            {isLoading ? (
                <List
                    itemLayout='horizontal'
                    renderItem={() => <UpcomingEventsSkeleton />}
                    dataSource={Array.from({ length: 5 }).map((_, index) => ({
                        id: index,
                    }))}
                />

            ) : (
                <List
                    itemLayout='horizontal'
                    dataSource={data?.data || []}
                    renderItem={ (item) => { 
                        const renderDate = getDate(item.startDate, item.endDate); 
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={<Text size="sm">{renderDate}</Text>} 
                                    description={<Text ellipsis={{tooltip:true}} strong>{item.title}</Text>} 
                                > 
                                </List.Item.Meta>
                            </List.Item>
                        )
                    } }
                    >
                    {!isLoading && data?.data.length === 0 && (
                        <span style={{
                            display:'flex',
                            height: '220px',
                            justifyContent:'center', 
                            alignItems:'center' 
                        }}>
                            No Upcoming Events
                        </span>

                    )}
           

                </List>
            )

            }

        </Card>
    )
}

export default UpcomingEvents
