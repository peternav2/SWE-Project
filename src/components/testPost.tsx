import React, { Component, useEffect, useState } from 'react'
import myFetch from '../services/myFetch'
import { add, DiningHall } from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { MenuItem } from '../stores/MenuItem'
import { University, getAllUniversities } from '../stores/University'
export default function TestFetch() {
  const [ unis, setUnis ] = useState<University[]>([]);
  useEffect(() => {
    getAllUniversities().then((data) => {
      setUnis(data);
    });
  });
  async function runFetch() {
    console.log("before fetch");
    //var universities: University[] = [];
    // await getAllUniversities().then((data) => {
    //   setUnis(data);
    // })
    console.log(unis);
    
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}