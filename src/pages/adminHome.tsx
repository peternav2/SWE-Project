import React, { Component } from 'react'
import { getUserByUsernamePassword, type User } from '../stores/User';
import { useUser } from '../App';
import { getAllUniversities } from '../stores/University';

export default function AdminHome() {

  const [user] = useUser();
  const universities = getAllUniversities();

  return (
    <>
      <div>{user.password}</div>
    </>

  )

}
