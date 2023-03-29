import {getUniversity, University} from "../stores/University";
import {useLoaderData} from "react-router-dom";
import StudentDiningHallButton from "../components/studentDiningHallButton";
import {ObjectId} from "mongodb";
import {useUser} from "../App";
import {useEffect} from "react";
export async function loader({params}: any) {
  return await getUniversity(params.universityId);
}


export default function StudentUniversityHome() {
  const uni = useLoaderData() as University;
  const [user, setUser] = useUser();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, [])
  return (
      <>
        <div className={"justify-center items-center "}>
          <h1> Welcome to {uni.name} Dining Hall Home Page</h1>
          {uni.diningHalls.map((diningHall) => {
              let id = diningHall?._id?.toString();
            return (
                <div className={"flex flex-col justify-center items-center"} key={id}>
                    <h1> {diningHall.name} </h1>
                    <StudentDiningHallButton diningHallName={diningHall.name} diningHall_id={diningHall?._id}/>
                </div>
              )})}
        </div>
      </>

  )
}