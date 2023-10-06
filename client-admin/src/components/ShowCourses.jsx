import "../styles.css";
import CourseCard from "./CourseCard";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

export const coursesState = atom({
    key: "coursesState",
    default: [],
});

export default function ShowCourses() {
    const [courses, setCourses] = useRecoilState(coursesState);

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/courses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourses(res.data.courses);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: 80 }}>Listed Medical Items</h1>
            <div className="courses-main-container">
                {courses.length > 0
                    ? courses.map((course) => (
                          <CourseCard key={course._id} course={course} />
                      ))
                    : "You have not listed any medical items, kindly list the same so that the users in the nearby area can able to claim medical facilities"}
            </div>
        </>
    );
}
