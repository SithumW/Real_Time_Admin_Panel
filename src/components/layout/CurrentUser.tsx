import { Popover } from 'antd'
import React from 'react'
import CustomAvatar from '../custom-avatar'

//this should be a popover
//we use antdesign UI kit

const CurrentUser = () => {
  return (
    <>
    
    <Popover
    placement='bottomRight'
    trigger='click' //when will the popover open
    styles={{
      body: { padding: 0 } //remove padding from popover body
    }}
    style={{ zIndex: 9999 }} //ensure appears on top
    
    >
      <CustomAvatar/>
      
    </Popover>
    
    
    </>
  )
}

export default CurrentUser