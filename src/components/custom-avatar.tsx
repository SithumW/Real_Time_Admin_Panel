import React from 'react'
import {Avatar as AntdAvatar, AvatarProps} from 'antd'
import { useGetIdentity } from '@refinedev/core';



type Props = AvatarProps & {
    name : string;

}


const CustomAvatar = ({name, style, ...rest} :  Props) => {

    const {data : user} = useGetIdentity() // Get the user data from the function specified in auth

  return (
    <AntdAvatar
    alt ={'John Doe'}
    size = "small"
    style = {{
        backgroundColor : '#87d068',
        display : 'flex',
        alignItems : 'center',
        border : 'none'
    }}
    >
        {name}
    </AntdAvatar>
  )
}

export default CustomAvatar