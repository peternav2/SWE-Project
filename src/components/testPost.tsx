import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import {
  addDiningHallToUniversity,
  deleteDiningHallFromUniversity,
  DiningHall,
  getDiningHall
} from '../stores/DiningHall';
import { addUniversity } from '../stores/University';
import { Dish } from '../stores/Dish'
import { University, getAllUniversities } from '../stores/University'
import { ObjectId } from 'mongodb';
import mongodb from 'mongodb';
import { User, addUser, getUserByUsernamePassword, getUserById, deleteUser } from '../stores/User';
import { addMenuItem, getMenuItemsBasedByDate, MenuItem, getMenuItemsBasedByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById } from '../stores/MenuItem';
import { addReviewToMenuItem, deleteReviewFromMenuItem, getReviewsByMenuItem, Review } from '../stores/Review';
import DiningHallHome from "../routes/diningHallHome";


export default function TestFetch() {

  
  async function runFetch() {
    let unis: University[] = [];
    await getAllUniversities().then((res) => {
      console.log(res)
      unis = res;
      // console.log(res);
      // console.log("--------------------");
      // console.log(unis);
    })

    // var testUser: User = {
    //   username: "Peters Test User",
    //   password: "Test Password",
    //   isStudent: true,
    //   universityId: unis[1]._id,
    // }
    // var testDining: DiningHall = {
    //   name: "Test Dining Hall",
    // }
    //
    // if (unis[1]._id){ // if statement to prevent 'error cannot use type undefined | ObjectId'
    //   await addDiningHallToUniversity(testDining, unis[1]._id).then((res) => {
    //     console.log("DINING HALL ADDED TO UNI");
    //
    //     console.log(res);
    //     testDining._id = res._id;
    //   })
    // }
    //
    // await deleteDiningHallFromUniversity(testDining._id, unis[1]._id).then((res) => {
    //   console.log("DINING HALL DELETED FROM UNI");
    //   console.log(res);
    //
    // });
    // await addUser(testUser).then((res) => {
    //   testUser._id = res._id;
    // })
    // console.log("LOOK HEREERERER");
    //
    // console.log(testDining._id);
    //
    //
    //
    // var testDish: Dish = {
    //   name: "Test Dish",
    //   cal: 100,
    //   description: "Test Description",
    //   allergens:  ["Test Allergen",
    //               "Test Allergen 2"],
    //   ingredients: ["Test Ingredient",
    //                 "Test Ingredient 2",
    //                 "Test Ingredient 3"],
    //   reviews: [],
    //   diningHallId: unis[1].diningHalls[0]._id,
    // }
    // console.log("hello");
    //
    // var testMenuItem: MenuItem = {
    //   mealType: "Breakfast",
    //   dish: testDish,
    //   date: {year: 2023, month: 1, day: 1}
    // }
    //
    // await addMenuItem(testMenuItem).then((res) => {
    //   testMenuItem._id = res._id;
    // })
    //
    // await getMenuItemById(testMenuItem._id).then((res) => {
    //   console.log("GET MENU ITEM WITH ID HERE");
    //   console.log(res);
    // })
    // console.log("LOOK HERE TEST MENU ITEM IS BELOW");
    //
    // console.log(testMenuItem);
    //
    // await getUserByUsernamePassword(testUser.username, testUser.password).then((res) => {
    //   console.log("USER IS GOTTEN BELOW BY PASSWORD");
    //   console.log(res);
    // })
    //
    // await getUserById(testUser._id).then((res) => {
    //   console.log("USER IS GOTTEN BELOW BY ID");
    //   console.log(res);
    // })
    //
    //
    // var review: Review = {
    //   username: "Test User",
    //   user_Id: testUser._id,
    //   rating: 5,
    //   comment: "Test Comment",
    // }
    //
    // // await deleteUser(testUser.username, testUser.password).then((res) => {
    // //   console.log("USER IS DELETED BELOW");
    // //   console.log(res);
    // // })
    //
    // await getMenuItemsBasedByDate(testMenuItem.date, testMenuItem.dish.diningHallId).then((res) => {
    //   console.log("MENU ITEMS FROM DATE ARE GOTTEN BELOW");
    //   console.log(res);
    // })
    //
    // await getMenuItemsBasedByDiningHall(unis[1].diningHalls[0]._id).then((res) => {
    //   console.log("MENU ITEMS FROM DINING HALL ARE GOTTEN BELOW");
    //   console.log(res);
    // })
    //
    // await getMenuItemsByMealTypeByDate(testMenuItem.date, "Breakfast", unis[1].diningHalls[0]._id).then((res) => {
    //   console.log("MENU ITEMS FROM DATE AND MEAL TYPE ARE GOTTEN BELOW");
    //   console.log(res);
    // })
    //
    //
    // console.log(testDining);
    //
    // await addReviewToMenuItem(review, testMenuItem._id).then((res) => {
    //   console.log("REVIEW IS ADDED BELOW");
    //   console.log(res);
    // });
    //
    // await getReviewsByMenuItem(testMenuItem._id).then((res) => {
    //   console.log("REVIEWS ARE GOTTEN BELOW");
    //   console.log(res);
    // })
    //
    // await deleteReviewFromMenuItem(review, testMenuItem._id).then((res) => {
    //   console.log("REVIEW IS DELETED BELOW");
    //   console.log(res);
    // });
    // await deleteMenuItem(testMenuItem._id).then((res) => {
    //   console.log("MENU ITEM IS DELETED BELOW");
    //   console.log(res);
    // });
    await getDiningHall(unis[1]._id, unis[1].diningHalls[0]._id).then((res) => {
      console.log("DINING HALL IS GOTTEN BELOW");
      console.log(res);
    })
  }


  return (
    <div>
        <button onClick={runFetch} >Test Fetch</button>
    </div>
  )}