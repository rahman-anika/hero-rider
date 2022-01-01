import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const MyProfile = () => {

    // state declaration 
    const [profile, setProfile] = useState([]);

    // for getting logged in user 
    const { user } = useAuth();
    const email = user.email;


    // load all orders by email query from database/server

    useEffect(() => {
        fetch(`https://evening-harbor-12084.herokuapp.com/myProfile/${email}`)
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, [email]);

    console.log(profile);


    return (
        <div>




            {/* My courses section starts  */}
            <h1 className="title animate__animated animate__rotateIn mt-5">My Profile</h1>
            <br />

            <div className="all-products">
                <div className="row container text-center mx-auto">

                    {/* showing my courses  */}
                    {profile?.map((order) => (
                        <div className="col-md-12">


                            <div>
                                <img src={order?.profilePicture} alt="" />
                            </div>
                            <h4>Name: {order?.displayName}</h4>
                            <p className="fw-bold">Email: {order?.email}</p>
                            <h5>Type: {order?.type}</h5>
                            <h6>Contact No: {order?.phone}</h6>
                            <h6>Age: {order?.age}</h6>
                            <h6>Address: {order?.address}</h6>
                            <h6>Area: {order?.area}</h6>
                            <h6>Vehicle Type: {order?.category}</h6>
                            <h6>Status: {order?.status}</h6>
                            <h6>{order?.carInformation}</h6>
                            <div>
                                <img src={order?.license} width="50%" alt="" />
                            </div>

                        </div>





                    ))}
                </div>
            </div>

            {/* My orders section ends  */}






        </div>
    );
};

export default MyProfile;