import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import React from 'react'
import { Text } from '../text'
import { UpcomingEventsSkeleton } from '../skeleton/upcoming-events'
import { useList } from '@refinedev/core'
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import dayjs from 'dayjs'
import getDate from './../../utilities/date/get-date'

export const UpcomingEvents = () => {
    
    // Fetch events list using refine's useList hook
    // - Filters: only future events (startDate >= today)
    // - Sort: by startDate ascending (soonest first)
    // - Pagination: max 5 events
    // - Meta: custom GraphQL query for upcoming events
    const { 
        query: { data, isLoading, error }
    } = useList({
        resource: 'events',
        filters: [
            {
                field: 'startDate',
                operator: 'gte', //greater than or equal
                value: dayjs().startOf('day').toISOString() // today’s date at 00:00
            }
        ],
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        pagination: {
            pageSize: 5
        },
        meta: {
            gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
        }
    })

    // Debug logs (helpful for troubleshooting)
    console.log('Events data:', data)
    console.log('Events loading:', isLoading)
    console.log('Events error:', error)

    // Extract event list safely (fallback = empty array if no data)
    const events = data?.data || []

    return (
        <Card 
            style={{ height: '100%' }} 
            headStyle={{ padding: '8px 16px' }}
            bodyStyle={{ padding: '0 1rem' }}
            title={
                // Card header with calendar icon + title
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                    gap: '8px'
                }}>
                    <CalendarOutlined/>
                    <Text size="sm" style={{ marginLeft: "0.7rem" }}>
                        Upcoming Events 
                    </Text>
                </div>
            }
        >
            {/* Case 1: Still loading → show skeleton list */}
            {isLoading ? (
                <List
                    itemLayout='horizontal'
                    dataSource={Array.from({ length: 5 }).map((_, index) => ({
                        id: index,
                    }))}
                    renderItem={() => <UpcomingEventsSkeleton/>}
                />
            ) 
            
            /* Case 2: Error in fetching data → show error message */
            : error ? (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text type="secondary">Failed to load events</Text>
                </div>
            ) 
            
            /* Case 3: No events available → show empty state */
            : events.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text type="secondary">No upcoming events</Text>
                </div>
            ) 
            
            /* Case 4: Events loaded successfully → render them */
            : (
                <List
                    itemLayout='horizontal'
                    dataSource={events}
                    renderItem={(item: any) => {
                        // Format event date (using helper)
                        const renderDate = getDate(item.startDate, item.endDate)

                        return (
                            <List.Item>
                                <List.Item.Meta
                                    // Small colored badge as avatar (event category)
                                    avatar={<Badge color={item.color} />}
                                    // Event date
                                    title={<Text size="xs">{renderDate}</Text>}
                                    // Event title (ellipsis with tooltip if too long)
                                    description={
                                        <Text ellipsis={{ tooltip: true }} strong>
                                            {item.title}
                                        </Text>
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
