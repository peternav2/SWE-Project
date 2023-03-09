import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { addDiningHallToUniversity, DiningHall } from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { Dish } from '../stores/Dish'
import { University, getAllUniversities } from '../stores/University'
import { ObjectId } from 'mongodb';

export default function TestFetch() {

  
 // const objId = new ObjectId("5f9f1b9b9b9b9b9b9b9b9b9b");
  async function runFetch() {
    fetch('http://localhost:3000/');
  
  }

  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )
}