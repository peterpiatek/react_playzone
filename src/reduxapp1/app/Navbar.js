import React from 'react';
import {Link} from "react-router-dom";
import {fetchNotifications, selectAllNot} from "../features/notifications/notificationsSlice";
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {

    const dispatch = useDispatch();

    const notf = useSelector(state => {
        return selectAllNot(state).filter(n => n.isNew);
    });

    return (
        <div style={{width: '100%', marginBottom: '10px'}}>
            <Link to="/" >Home</Link>&nbsp;&nbsp;
            <Link to="/post/new" >Add Post</Link>&nbsp;&nbsp;
            <Link to="/users" >Users</Link>&nbsp;&nbsp;
            <Link to="/notifications" >Notifications</Link>({notf.length})&nbsp;&nbsp;
            <button onClick={() => dispatch(fetchNotifications())}>Fetch notifications</button>
        </div>
    );
};

export default Navbar;
