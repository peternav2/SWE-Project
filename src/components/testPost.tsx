import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { add, DiningHall } from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { MenuItem } from '../stores/MenuItem'
import { University, getAllUniversities } from '../stores/University'
export default function TestFetch() {
  async function runFetch() {
    console.log("before fetch");
    var universities: University[] = [];
    await getAllUniversities().then((university) => {
      universities = university;
    })
    console.log(universities);
  
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}