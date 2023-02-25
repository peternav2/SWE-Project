import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'

export default function testFetch() {



  async function runFetch() {
    console.log("before fetch");
    
    await myFetch<any>('/menuitems', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: {msg: "yeah", int: 32}}).then((res) => {
      console.log(res);
  });
    console.log("after fetch");
    
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}