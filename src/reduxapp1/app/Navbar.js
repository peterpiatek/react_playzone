import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div style={{width: '100%', marginBottom: '10px'}}>
            <Link to="/" >Home</Link>
            <Link to="/post/new" >Add Post</Link>
        </div>
    );
};

export default Navbar;
