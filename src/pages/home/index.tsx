import { DealsChart, UpcomingEvents } from '@/components'
import { Row, Col } from 'antd'
import React from 'react'

export const Home = () => {  
  return (
    <div>

      <Row
      gutter = {[32,32]}
      style = {{
        marginTop : '32px'
      }}
      >
        <Col
        xs ={24}//in xtra small devices (fullscreen)
        sm ={24}//in small devices
        xl = {8} // in large devices (1/3 of screen)
        style = {{
          height : '460px'
        }}
        >
        <UpcomingEvents/>
        
        </Col>

   <Col 
        xs ={24}//in xtra small devices (fullscreen)
        sm ={24}//in small devices
        xl = {8} // in large devices (1/3 of screen)
        //Work like mediaqueries but easier 
        
        style = {{
          height : '460px'
        }}
        >
        <DealsChart/>
        
        </Col>


      </Row>
      
    </div>
  )
}
