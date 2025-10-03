import React from "react";
import { List, Skeleton } from "antd";

export const UpcomingEventsSkeleton: React.FC = () => {
    return (
   
                <List.Item>
                    <Skeleton style={{padding: '5px'}}
                        active
                        title={false}
                        paragraph={{ rows: 1, width: '80%' }}
                    />
                </List.Item>
            )}
       
    

