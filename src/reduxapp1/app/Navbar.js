import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchNotf, selectAllNotf} from "../features/notifications/notificationsSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const allNotf = useSelector(selectAllNotf);
    const notfNum = allNotf.filter(n => n.isNew).length;

    const showUnreadBadge = () => {
        if(notfNum > 0){
            return <span>({notfNum})</span>
        }
    }

    return (
        <div style={{width: '100%', marginBottom: '10px'}}>
            <Link to="/" >Home</Link>&nbsp;&nbsp;
            <Link to="/post/new" >Add Post</Link>&nbsp;&nbsp;
            <Link to="/users" >Users</Link>&nbsp;&nbsp;
            <Link to="/notifications" >Notifications</Link>&nbsp;&nbsp; {showUnreadBadge()} &nbsp;&nbsp;
            <button onClick={() => {dispatch(fetchNotf())}}>Refresh Notifications</button>
        </div>
    );
};

export default Navbar;
