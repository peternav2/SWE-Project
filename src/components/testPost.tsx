import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { MenuItem } from '../stores/MenuItem'
import { University } from '../stores/University'
export default function testFetch() {



  async function runFetch() {
    console.log("before fetch");
    const menuItem: MenuItem = {
      name: "University of Toronto",
      cal: 100,
      university: {
        name: "University of Toronto",
        diningHalls: [
          {name: "St. George"},
        ]
      },

    }
    await myFetch('menuitems', { menuItem }).then((res) => {
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