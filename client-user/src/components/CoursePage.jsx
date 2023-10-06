import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CourseContent from "./CourseContent";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { purCoursesState } from "../store/atoms/user";

export default function CoursePage() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const { courseId } = useParams();
    const [purCourses, setPurCourses] = useRecoilState(purCoursesState);
    const [isPurchased, setIsPurchased] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/courses/" + courseId, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourse(res.data.course);
            })
            .catch((err) => console.log(err));

        axios
            .get("http://localhost:3000/user/purchasedcourses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setPurCourses(res.data.purchasedCourses);
                setIsPurchased(
                    purCourses.some((item) => item._id === courseId)
                );
            })
            .catch((err) => console.log(err));
    }, [courseId]);

    function purchaseCourse() {
        axios
            .post(
                "http://localhost:3000/user/purchasedcourses/" + courseId,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                alert("Medical Item Claimed Successfully");
                setIsPurchased(true);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="course-page">
            <div className="course-page-container">
                <div className="course-details">
                    <h1 className="course-page-title">{course.title}</h1>
                    <h2 className="course-page-description">
                        {course.description}
                    </h2>
                </div>
                <div className="course-page-card">
                    <div className="course-card-inner">
                        <img
                            className="course-page-image"
                            src={course.imageLink}
                            alt=""
                        />
                        <div className="course-card-content">
                            {!isPurchased ? (
                                <>
                                    <h1 className="course-price">
                                    ₹{course.price}
                                    </h1>
                                    <Button
                                        onClick={purchaseCourse}
                                        variant="contained"
                                        className="buy-button"
                                    >
                                        Claim Medical Items
                                    </Button>{" "}
                                </>
                            ) : (
                                <>
                                    <h1 className="course-price">
                                        Already Claimed Medical Items!
                                    </h1>
                                    <Button
                                        onClick={() =>
                                            navigate("/purchasedcourses")
                                        }
                                        variant="contained"
                                        className="buy-button"
                                    >
                                        View Claimed Medical Items
                                    </Button>{" "}
                                </>
                            )}

                            <CourseContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
