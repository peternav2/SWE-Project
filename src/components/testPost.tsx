import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { add, DiningHall } from '../stores/DiningHall';
import { MenuItem } from '../stores/MenuItem'
import { University } from '../stores/University'
export default function testFetch() {
  async function runFetch() {
    console.log("before fetch");
    const diningHall: DiningHall = {
      name: "Peregrine Dining Hall",
    }
    add(diningHall);
    }


  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}