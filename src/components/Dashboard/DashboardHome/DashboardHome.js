import React from 'react';
import useAuth from '../../../hooks/useAuth';

const DashboardHome = () => {
    const { user } = useAuth();


    return (
        <div>
            <h2 style={{ color: "orange" }} className="mt-5">Welcome To Hero Rider, {user.displayName}</h2>


        </div>

    );
};

export default DashboardHome;