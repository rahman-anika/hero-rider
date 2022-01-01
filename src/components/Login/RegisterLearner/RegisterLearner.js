import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from "./../../../hooks/useAuth";
import Header from './../../Shared/Header/Header';
import Footer from './../../Shared/Footer/Footer';
import { Alert, Spinner } from 'react-bootstrap';

const RegisterLearner = () => {

    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const { user, registerLearner, isLoading, authError } = useAuth();
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }


        // if password is less than 6 characters then it shows error 
        if (loginData.password.length < 6) {
            alert('Password must be at least 6 characters');
            return;

        }

        // // if password does not contain two uppercase it shows error using regex

        // if (!/(?=.*[A-Z].*[A-Z])/.test(loginData.password)) {
        //     alert('Password must contain two uppercase');
        //     return;

        // }


        registerLearner(loginData.email, loginData.password, loginData.name, loginData.type, loginData.age, loginData.phone, loginData.address, loginData.area, loginData.profilePicture, loginData.nidPicture, loginData.category, loginData.status, history);
        e.preventDefault();
    }

    if (isLoading) {
        return <Spinner animation="border" variant="danger" />
    }

    return (
        <>

            {/* header section starts  */}
            <Header></Header>
            {/* header section ends  */}


            {/* Registration section starts  */}

            <div className="text-center login-form py-5">

                <div className="mx-5 my-cart">
                    <br />

                    <form onSubmit={handleLoginSubmit}>
                        <h3 style={{ color: 'orange', fontWeight: 'bold' }} >Please Register</h3>
                        <br />


                        <input type="text" name="name" onBlur={handleOnBlur} placeholder="name" required />
                        <br />
                        <input type="email" name="email" onBlur={handleOnBlur} placeholder="email" required />
                        <br />
                        <select placeholder="Type" name="type" onBlur={handleOnBlur} required
                            className="p-2 m-2 w-50"
                        >
                            <option value="Learner">Learner</option>


                        </select>
                        <br />

                        <input type="number" name="age" onBlur={handleOnBlur} placeholder="age" required />
                        <br />
                        <input type="text" name="address" onBlur={handleOnBlur} placeholder="address" required />
                        <br />
                        <input type="number" name="phone" onBlur={handleOnBlur} placeholder="phone" required />
                        <br />
                        {/* <input type="text" name="license" onBlur={handleOnBlur} placeholder="Driving License Picture" required />
                        <br /> */}
                        <input type="text" name="area" onBlur={handleOnBlur} placeholder="area" required />
                        <br />
                        <input type="text" name="profilePicture" onBlur={handleOnBlur} placeholder="profile picture link" required />
                        <br />
                        <input type="text" name="nidPicture" onBlur={handleOnBlur} placeholder="nid picture link" required />
                        <br />
                        {/* <input type="text" name="carInformation" onBlur={handleOnBlur} placeholder="car name, model, name plate" required />
                        <br /> */}

                        <select placeholder="Category" name="category" onBlur={handleOnBlur} required
                            className="p-2 m-2 w-50"
                        >
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>



                        </select>
                        <br />

                        <select placeholder="Status" name="status" onBlur={handleOnBlur} required
                            className="p-2 m-2 w-50"
                        >

                            <option value="Active">Active</option>




                        </select>
                        <br />


                        <input type="password" name="password" onBlur={handleOnBlur} placeholder="password" required />
                        <br />
                        <input type="password" name="password2" onBlur={handleOnBlur} placeholder="confirm password" required />
                        <br />

                        <p style={{ color: 'red' }}>
                            {/* {error} */}
                        </p>
                        <br />


                        <input style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }} type="submit" placeholder="create" value="Sign Up" />
                        <br />
                    </form>



                    {user?.email && <Alert variant="success">User Created successfully!</Alert>}


                    {authError && <Alert variant="danger">{authError}</Alert>}

                    <br />
                    <br />

                    {/* <button onClick={handleGoogleLogin}>Google Sign In</button> */}

                    {/* Go to login page  */}
                    <p style={{ color: 'orange', fontWeight: 'bold' }}> Already Signed Up ?<Link to="/login"> <span style={{ color: 'white', fontWeight: 'bold' }}>Please Login</span> </Link ></p>



                </div>
            </div>

            {/* Registration section ends  */}


            {/* footer section starts  */}
            <Footer></Footer>
            {/* footer section ends  */}

        </>
    );
};

export default RegisterLearner;