import React from 'react'

const Home: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <title>Hello World</title>
      <meta name="description" content="A simple hello world page" />

      <main>
        <h1 style={{
          fontSize: '3rem',
          color: '#333',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Hello World!
        </h1>
      </main>
    </div>
  )
}

export default Home
