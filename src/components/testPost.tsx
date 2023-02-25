import React, { Component, useEffect } from 'react'

type Props = {}

type State = {}

export default function testFetch() {

  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/menuItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'test',
        age: 20
      })
    }).then(res => res.json())
    
    console.log('test');
    
  });

  return (
    <div>
        <h1>Test Fetch</h1>
    </div>
  )
}