import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div style={{width: '100%', marginBottom: '10px'}}>
            <Link to="/" >Home</Link>&nbsp;&nbsp;
            <Link to="/post/new" >Add Post</Link>&nbsp;&nbsp;
            <Link to="/users" >Users</Link>&nbsp;&nbsp;
        </div>
    );
};

export default Navbar;
