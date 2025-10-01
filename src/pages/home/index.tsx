import React from 'react'

export const Home = () => {
  console.log("Home component rendering...");
  
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ color: '#1890ff' }}>Welcome to Real Time Admin Panel</h1>
      <p style={{ fontSize: '18px' }}>This is your home page!</p>
      <p style={{ color: '#666' }}>If you can see this, the routing is working!</p>
    </div>
  )
}
