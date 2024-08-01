import { DollarCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Card, List, Space } from 'antd'
import React from 'react'
import { Text } from '../text'
import { useList } from '@refinedev/core'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY, DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import dayjs from 'dayjs'
import CustomAvatar from '../custom-avatar'

const LatestActivities = () => {

    const { data: audit, isLoading: isLoadingAudit, isError: error } = useList({
        resource: 'audits',
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        },
        pagination: { pageSize: 7 },
    });

    //   console.log(audit);

    const dealIds = audit?.data?.map((deal) => deal.targetId);

    const { data: deals, isLoading: isLoadingDeals } = useList({
        resource: 'deals',
        queryOptions: { enabled: !!dealIds?.length },
        pagination: { mode: 'off' },
        filters: [{
            field: 'id', value: dealIds, operator: 'in'
        }],
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
        }
    })


    if (error) {
        console.log(error);
        return null;
    }

    const isLoading = isLoadingAudit || isLoadingDeals;

    return (
        <Card
            style={{ height: '100%' }}
            bodyStyle={{ padding: '0 1rem' }}
            headStyle={{ padding: '16px' }}
            title={
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <UnorderedListOutlined />
                    <Text size="sm" style={{ marginLeft: '0.5rem' }}>
                        Latest Activities
                    </Text>
                </div>
            }
        >
            {isLoading ? (
                <List
                    itemLayout='horizontal'
                    dataSource={Array.from({ length: 5 }).map((_, index) => ({
                        id: index,
                    }))}
                    renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
                />
            )
                : (
                    <List
                        itemLayout='horizontal'
                        dataSource={audit?.data}
                        renderItem={(item) => {

                            const deal = deals?.data?.find((deal) => deal.id == String(item.targetId)) || undefined;
                            console.log(deal);
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:MM')}
                                        avatar={
                                            <CustomAvatar
                                                shape='square'
                                                size={24}
                                                name={deal?.company.name}
                                                src={deal?.company.avatarUrl}
                                            />
                                        }
                                        description={
                                            <Space size={4}>
                                                <Text strong>{item?.user?.name}</Text>
                                                <Text>
                                                    {item.action === 'CREATE' ? 'created' : 'moved'}
                                                </Text>
                                                <Text strong>{deal?.title}</Text>
                                                <Text> deal </Text>
                                                <Text>
                                                    {item.action === 'CREATE' ? 'in' : 'to'}
                                                </Text>
                                                <Text strong>{deal?.stage?.title}</Text>
                                            </Space>
                                        }


                                    />
                                </List.Item>
                            )
                        }}
                    />
                )}


        </Card>
    )
}

export default LatestActivities
