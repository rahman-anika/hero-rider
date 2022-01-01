import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./ManageAllUsers.css";


const ManageAllUsers = () => {

    // state declaration 
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);
    const size = 10;

    // const [isDelete, setIsDelete] = useState(null);


    // all users load from database/server
    // useEffect(() => {
    //     fetch("http://localhost:5000/allRegisteredUsers")
    //         .then((response) => response.json())
    //         .then((data) => setOrders(data));
    // }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/allRegisteredUsers?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setDisplayProducts(data);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            });
    }, [page]);


    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = orders.filter(user => user.email.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }


    return (
        <div>

            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search User" />
            </div>


            {/* My courses section starts  */}
            <h1 className="title animate__animated animate__rotateIn mt-5"> Registered Users(s): {orders.length - 1}   Admin: 1</h1>
            <br />

            <div className="all-products">
                <div className="row container text-center mx-auto">

                    {/* showing my courses  */}
                    {orders?.map((order) => (
                        <div className="col-md-6 col-lg-4">
                            <div className="cart border border p-2 m-2">

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




                                {/* button for updating user status  */}
                                <Link to={`/update/${order._id}`}>
                                    <button style={{ backgroundColor: "orange", color: "black", borderRadius: "8px", border: "2px solid orange" }}>Block User</button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="pagination">
                    {
                        [...Array(pageCount).keys()]
                            .map(number => <button
                                className={number === page ? 'selected' : ''}
                                key={number}
                                onClick={() => setPage(number)}
                            >{number + 1}</button>)
                    }
                </div> */}

            </div>


            {/* My orders section ends  */}



        </div>
    );
};

export default ManageAllUsers;