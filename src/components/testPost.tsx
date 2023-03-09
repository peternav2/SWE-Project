import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import { addDiningHallToUniversity, DiningHall } from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { Dish } from '../stores/Dish'
import { University, getAllUniversities } from '../stores/University'
import { ObjectId } from 'mongodb';
import mongodb from 'mongodb';
import { User, addUser, getUser } from '../stores/User';
import { addMenuItem, MenuItem } from '../stores/MenuItem';


export default function TestFetch() {

  
 // const objId = new ObjectId("5f9f1b9b9b9b9b9b9b9b9b9b");
  async function runFetch() {
    var unis: University[] = [];
    await getAllUniversities().then((res) => {
      unis = res;
      // console.log(res);
      // console.log("--------------------");
      // console.log(unis);
    })

    var testUser: User = {
      username: "Test User",
      password: "Test Password",
      isStudent: true,
      university: unis[1],
    }
    var testDining: DiningHall = {
      name: "Test Dining Hall",
    }
    
    if (unis[1]._id){ // if statement to prevent 'error cannot use type undefined | ObjectId'
      await addDiningHallToUniversity(testDining, unis[1]._id).then((res) => {
        console.log("LOOK HEREERERER FIRST");
        
        console.log(res);
        testDining._id = res._id;
      })
    }
    addUser(testUser).then((res) => {
      testUser._id = res._id;
    })
    console.log("LOOK HEREERERER");
    
    console.log(testDining._id);


      var testDish: Dish = {
        name: "Test Dish",
        cal: 100,
        description: "Test Description",
        allergens:  ["Test Allergen",
                    "Test Allergen 2"],
        ingredients: ["Test Ingredient",
                      "Test Ingredient 2",
                      "Test Ingredient 3"],
        reviews: [],
        diningHallId: testDining._id
      }
    
    var testMenuItem: MenuItem = {
      mealType: "Breakfast",
      dish: testDish,
      date: {year: 2023, month: 1, day: 1}
    }

    await addMenuItem(testMenuItem).then((res) => {
      testMenuItem._id = res._id;
    })
    console.log(testMenuItem);
    
    await getUser(testUser.username, testUser.password).then((res) => {
      console.log("USER IS GOTTEN BELOW");
      
      console.log(res);
    })



    console.log(testDining);
    
  }




  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )}