import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'

export default function testFetch() {



  async function runFetch() {
    console.log("before fetch");
    
    await myFetch('menuitems', { msg: "message", int: 5 }).then((res) => {
      console.log("res", res);
    }).catch((err) => {
      console.log("err", err);
  });
    console.log("after fetch");
    
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}