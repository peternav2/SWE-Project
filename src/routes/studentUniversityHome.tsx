import {getUniversity, University} from "../stores/University";
import {useLoaderData} from "react-router-dom";
import StudentDiningHallButton from "../components/studentDiningHallButton";

export async function loader({params}: any) {
  const university = await getUniversity(params.universityId);
  return university;
}


export default function StudentUniversityHome() {
  const uni = useLoaderData() as University;
  return (
      <>
        <div className={"flex flex-col justify-center items-center "}>
          <h1> Welcome to {uni.name} Dining Hall Home Page</h1>
          {uni.diningHalls.map((diningHall) => {
            return (
                <div className={"flex flex-col justify-center items-center"}>
                    <h1> {diningHall.name} </h1>
                    <StudentDiningHallButton diningHallName={diningHall.name} diningHall_id={diningHall?._id}/>
                </div>
            )})}
        </div>
      </>

  )
}