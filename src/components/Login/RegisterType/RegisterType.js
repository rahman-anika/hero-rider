import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from "./../../../hooks/useAuth";
import Header from './../../Shared/Header/Header';
import Footer from './../../Shared/Footer/Footer';

import { Alert, Spinner } from 'react-bootstrap';

const RegisterType = () => {

    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const { user, registerUser, isLoading, authError } = useAuth();

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




        registerUser(loginData.email, loginData.password, loginData.name, history);
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


                    <h3 style={{ color: 'orange', fontWeight: 'bold' }} >Sign Up</h3>
                    <br />

                    <button style={{ color: 'orange', fontWeight: 'bold' }}> <Link to="/register"> <span style={{ color: 'orange', fontWeight: 'bold' }}>As Rider</span> </Link ></button>
                    <br />
                    <br />

                    <button style={{ color: 'orange', fontWeight: 'bold' }}> <Link to="/registerlearner"> <span style={{ color: 'orange', fontWeight: 'bold' }}>As Driving Lesson Learner</span> </Link ></button>
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

export default RegisterType;