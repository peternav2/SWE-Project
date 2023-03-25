export default function NotLoggedIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/*someone flesh this out to redirect to the log in screen and look nicer */}
      {/*will be used in cases when user is not in local storage*/}
      {/* eg
      if (!user) {
        return <NotLoggedIn />
      }
      else {
        return <Component />
      }
      */}
      <h1> You are not logged in </h1>
    </div>
  )
}