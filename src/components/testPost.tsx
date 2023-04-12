import React, { Component, useEffect } from 'react'
import myFetch from '../services/myFetch'
import {
  addDiningHallToUniversity,
  deleteDiningHallFromUniversity,
  DiningHall,
  getDiningHall
} from '../stores/DiningHall';
import {addUniversity, updateUniversity} from '../stores/University';
import { Dish } from '../stores/Dish'
import { University, getAllUniversities } from '../stores/University'
import { ObjectId } from 'mongodb';
import mongodb from 'mongodb';
import { User, addUser, getUserByUsernamePassword, getUserById, deleteUser } from '../stores/User';
import { addMenuItem, getMenuItemsBasedByDate, MenuItem, getMenuItemsBasedByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById } from '../stores/MenuItem';
import {
  addReviewToMenuItem,
  deleteReviewFromMenuItem,
  getReviewsByMenuItem,
  Review,
  updateReview
} from '../stores/Review';
import DiningHallHome from "../routes/student/studentDiningHallHome";
import {
  addEventItem, deleteEventItem,
  EventItem,
  getEventItemsByDate,
  getEventItemsByDiningHall,
  updateEventItem
} from "../stores/EventItem";
import {useUser} from "../App";


export default function TestFetch() {
  const [user] = useUser();


  async function runFetch() {

    let unis: University[] = [];

    await getAllUniversities().then((res) => {
      
      console.log(res)
      unis = res;
      //console.log(res);
      // console.log("--------------------");
      // console.log(unis);
      
    })
    unis[2].name = "updated university test"
    await updateUniversity(unis[2]);

    var testUser: User = {
       username: "RodoJML",
       password: "1234",
       isStudent: false,
       universityId: unis[1]._id,
    }

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

    await addUser(testUser).then((res) => {
       testUser._id = res._id;
    })

    // console.log("LOOK HEREERERER");
    //
    // console.log(testDining._id);
    //
    //

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
      diningHallId: unis[1].diningHalls[0]._id,
    }
    // console.log("hello");
    //
    const testMenuItem: MenuItem = {
      mealType: "Dinner",
      dish: testDish,
      date: {year: 2023, month: 1, day: 1}
    };

    await addMenuItem(testMenuItem).then((res) => {
      testMenuItem._id = res._id;
    })
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
    var review: Review = {
      username: "Test User",
      user_Id: user._id,
      rating: 5,
      comment: "Test Comment",
    }
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
    await addReviewToMenuItem(review, testMenuItem._id).then((res) => {
      console.log("REVIEW IS ADDED BELOW");
      console.log(res);
    });

    const newReview:Review = {
      ...review,
      comment: "updated comment yeah"
    }


    // await updateReview(newReview, testMenuItem._id).then((res) => {
    //   console.log("REVIEW IS UPDATED BELOW");
    //   console.log(res);
    // });

    //await deleteReviewFromMenuItem(review, testMenuItem._id)



    //
    await getReviewsByMenuItem(testMenuItem._id).then((res) => {
      console.log("REVIEWS ARE GOTTEN BELOW");
      console.log(res);
    })
    //
    // await deleteReviewFromMenuItem(review, testMenuItem._id).then((res) => {
    //   console.log("REVIEW IS DELETED BELOW");
    //   console.log(res);
    // });
    // await deleteMenuItem(testMenuItem._id).then((res) => {
    //   console.log("MENU ITEM IS DELETED BELOW");
    //   console.log(res);
    // });
    // await getDiningHall(unis[1]._id, unis[1].diningHalls[0]._id).then((res) => {
    //   console.log("DINING HALL IS GOTTEN BELOW");
    //   console.log(res);
    // })
    const eventItem: EventItem = {
      name: "Test Event",
      description: "Test Description",
      date: {year: 2023, month: 1, day: 1},
      diningHallId: unis[1].diningHalls[0]._id,
    }
    // console.log(eventItem.diningHallId);
    await addEventItem(eventItem).then((res) => {
      console.log("EVENT ITEM IS ADDED BELOW");
      console.log("look at two ids below see if same")
      console.log(eventItem.diningHallId);
      console.log(unis[1].diningHalls[0]._id);
      eventItem._id = res._id;
      console.log(res);
    })
    await getEventItemsByDate(eventItem.date, unis[1].diningHalls[0]._id  ).then((res) => {
        console.log("EVENT ITEM IS GOTTEN BELOW");
        console.log(res);
    })
    // await getEventItemsByDiningHall(unis[1].diningHalls[0]._id).then((res) => {
    //   console.log("EVENT ITEM IS GOTTEN BELOW");
    //   console.log(res);
    // })
    //
    // const updatedEventItem: EventItem = {
    //   ...eventItem,
    //   name: "Updated Test Event"
    // }
    //
    // await updateEventItem(updatedEventItem).then((res) => {
    //   console.log("EVENT ITEM IS UPDATED BELOW");
    //   console.log(res);
    // })

    // await deleteEventItem(eventItem._id).then((res) => {
    //   console.log("EVENT ITEM IS DELETED BELOW");
    //   console.log(res);
    // })
  }


  return (
    <div>
        <button onClick={runFetch} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Test Fetch</button>
    </div>
  )}