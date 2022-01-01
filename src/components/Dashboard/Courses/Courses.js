import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Courses.css";

const Courses = () => {
    return (
        <div>




            {/* My courses section starts  */}
            <h1 className="title animate__animated animate__rotateIn mt-5"> Available Course(s): 2</h1>
            <br />

            <div className="all-products">
                <div className="row container text-center mx-auto">

                    {/* showing my courses  */}

                    <div className="col-md-6 col-lg-4">
                        <div className="cart border border p-2 m-2">

                            <h4>Car Driving Lessons</h4>
                            <h5>Price: $200</h5>



                            {/* button for deleting order  */}
                            <button
                                // onClick={() => handleEnrollCourse(order._id)}
                                style={{ backgroundColor: "orange", color: "black", borderRadius: "8px", border: "2px solid orange" }}>Enroll </button>



                        </div>

                        <div className="cart border border p-2 m-2">

                            <h4>Bike Driving Lessons</h4>
                            <h5>Price: $100</h5>



                            {/* button for deleting order  */}
                            <button
                                // onClick={() => handleEnrollCourse(order._id)}
                                style={{ backgroundColor: "orange", color: "black", borderRadius: "8px", border: "2px solid orange" }}>Enroll </button>



                        </div>

                    </div>

                </div>
            </div>

            {/* My orders section ends  */}



        </div>


    );
};

export default Courses;