import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { addDiningHallToUniversity, DiningHall } from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { MenuItem } from '../stores/MenuItem'
import { University, getAllUniversities } from '../stores/University'

import { ObjectId } from 'mongodb';

export default function TestFetch() {
  async function runFetch() {
    console.log("before fetch");
    var universities: University[] = [];
    await getAllUniversities().then((university) => {
      universities = university;
    })
    console.log(universities);
    console.log(universities[0].name);
    
    const testDining: DiningHall = {
      name: "testDiningHall",
    }
    await addDiningHallToUniversity(testDining, universities[0].name).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}