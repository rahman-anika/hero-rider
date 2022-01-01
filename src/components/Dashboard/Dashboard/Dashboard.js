import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";


import useAuth from "../../../hooks/useAuth";
import Courses from "../Courses/Courses";
// import AddReviews from "../AddReviews/AddReviews";
import DashboardHome from "../DashboardHome/DashboardHome";
import ManageAllUsers from "../ManageAllUsers/ManageAllUsers";
import MyProfile from "../MyProfile/MyProfile";
// import Pay from "../Pay/Pay";
// import MyCourses from '../MyCourses/MyCourses';
import AdminRoute from './../../Login/AdminRoute/AdminRoute';
// import MakeAdmin from "../MakeAdmin/MakeAdmin";
import "./Dashboard.css";
// import MyRecipes from "../MyRecipes/MyRecipes";
// import ManageAllCourses from "../ManageAllCourses/ManageAllCourses";
// import ManageRecipes from "../ManageRecipes/ManageRecipes";
// import AddCourse from "../AddCourse/AddCourse";

const Dashboard = () => {

    let { path, url } = useRouteMatch();
    const { admin, logout, user } = useAuth();
    const email = user.email;
    // state declaration 
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/myProfile/${email}`)
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, [email]);



    return (
        <div>
            <div className="dashboard-container ">
                <div className="row">
                    <div className="col-md-3 ">
                        <div className="dashboard">
                            <Link to={`${url}`}>
                                <h4 className="dashboard-menu pt-5">Dashboard</h4>
                            </Link>



                            {!admin && <Link to={`${url}/myProfile`}>
                                <li className="dashboard-menu mt-5">My Profile</li>
                            </Link>}


                            {!admin && <Link to={`${url}/myCourses`}>
                                <li className="dashboard-menu mt-5">Available Course(s)</li>
                            </Link>}











                            {admin && (
                                <Link to={`${url}/manageAllUsers`}>
                                    <li className="dashboard-menu mt-5">Manage All User(s)</li>
                                </Link>
                            )}


                            {admin && (
                                <Link to={`${url}/addCourses`}>
                                    <li className="dashboard-menu mt-5">Add Course</li>
                                </Link>
                            )}






                            <br />
                            <br />

                            <Link to="/">
                                <Button variant="light">Back To HomePage</Button>
                            </Link>

                            <br />
                            <br />

                            <Button onClick={logout} variant="light">Logout</Button>


                        </div>
                    </div>
                    <div className="col-md-9">
                        <Switch>

                            <Route exact path={path}>
                                <DashboardHome></DashboardHome>
                            </Route>



                            <Route exact path={`${path}/myProfile`}>
                                <MyProfile></MyProfile>
                            </Route>

                            <Route exact path={`${path}/myCourses`}>
                                <Courses></Courses>
                            </Route>




                            <AdminRoute exact path={`${path}/manageAllUsers`}>
                                <ManageAllUsers></ManageAllUsers>
                            </AdminRoute>



                            <AdminRoute exact path={`${path}/addCourses`}>
                                {/* <AddCourse></AddCourse> */}
                            </AdminRoute>



                        </Switch>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;