import React, { Component } from 'react'
import { getUserByUsernamePassword, type User } from '../stores/User';

export default function adminHome() {

    let currentUser: User = getUserByUsernamePassword("RodoJML", "1234");

    return (
      <div>{ currentUser.isStudent }</div>
    )
  
}
