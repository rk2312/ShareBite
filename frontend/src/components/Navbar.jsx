import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/navbar.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Navbar() {
    const navigate = useNavigate(); // Initialize navigate
    const [name, setName] = useState([]);
    const [address, setAddress] = useState([]);
    const [elementVisible, setElementVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleDisplay = () => {
        setElementVisible(!elementVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/auth/user-details`, {
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setName(data.user.name);
                setAddress(data.user.address);
                setProfilePicture(data.user.profilePicture);
                setIsLoggedIn(true); // Set user as logged in
            } catch (error) {
                console.error("Error in fetching: ", error);
                setIsLoggedIn(false); // Set user as not logged in
            }
        };
        fetchData();
    }, [profilePicture]);

    if (
        location.pathname === "/" ||
        location.pathname === "/Annamitra" ||
        location.pathname === "/Signup" ||
        location.pathname === "/Login"
    ) {
        return (
            <div>
                <div className="navbar1">
                    <img
                        src="/assets/images/logo.png"
                        onClick={() => {
                            navigate("/Annamitra"); // Use navigate
                        }}
                        alt="Logo"
                    />
                    <hr className="linebreak" />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="navbar2">
                    <div className="logo">
                        <img
                            src="/assets/images/logo.png"
                            onClick={() => {
                                navigate("/dashboard"); // Use navigate
                            }}
                            alt="Logo"
                        />
                    </div>
                    
                    <div className="details">
                        <div className="name">
                            Hi {name} !! <br />
                        </div>
                        <div className="address">
                            {address.street}, {address.city}, {address.state}
                        </div>
                    </div>
                    <div className="profile">
                        <img
                            src={`${BASE_URL}${profilePicture}`}
                            alt="profile"
                            onError={(e) => {
                                e.target.src =
                                    "../public/assets/images/profilepic.jpeg";
                            }}
                            onClick={toggleDisplay}
                        />
                    </div>
                    <div
                        className="sidebar"
                        style={{ display: elementVisible ? "flex" : "none" }}
                    >
                        <div
                            className="sidebar-link"
                            onClick={() => {
                                navigate("/Dashboard"); // Use navigate
                            }}
                        >
                            <img src="../assets/images/home.png" alt="" />
                            <div>Home</div>
                        </div>
                        <div
                            className="sidebar-link"
                            onClick={() => {
                                navigate("/AboutUs"); // Use navigate
                            }}
                        >
                            <img src="../assets/images/aboutus.png" alt="" />
                            <div>About Us</div>
                        </div>
                        <div
                            className="sidebar-link"
                            onClick={() => {
                                navigate("/community"); // Use navigate
                            }}
                        >
                            <img src="../assets/images/community.png" alt="" />
                            <div>Community</div>
                        </div>
                        <div
                            className="sidebar-link"
                            onClick={() => {
                                navigate("/edit-profile"); // Use navigate
                            }}
                        >
                            <img src="../assets/images/profile.png" alt="" />
                            <div>Profile</div>
                        </div>

                        {isLoggedIn && (
                            <>
                                <div
                                    className="sidebar-link"
                                    onClick={() => {
                                        navigate("/my-request"); // Use navigate
                                    }}
                                >
                                    <img src="../assets/images/myrequests.png" alt="" />
                                    <div>My Requests</div>
                                </div>
                                <div
                                    className="sidebar-link"
                                    onClick={() => {
                                        navigate("/my-donation"); // Use navigate
                                    }}
                                >
                                    <img src="../assets/images/mydonations.png" alt="" />
                                    <div>My Donations</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <hr className="linebreak" />
            </div>
        );
    }
}

export default Navbar;
