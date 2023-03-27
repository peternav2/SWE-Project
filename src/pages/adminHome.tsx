import React, { Component } from 'react'
import { getUserByUsernamePassword, type User } from '../stores/User';
import {useUser} from '../App';

export default function adminHome() {

    const [user] = useUser();

    return (
      <div>{ user.username }</div>
    )
  
}
