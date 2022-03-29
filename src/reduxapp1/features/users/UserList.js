import React from 'react';
import {selectAllUsers} from "./usersSlice";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserList = () => {

    const users = useSelector(selectAllUsers);
    const renderUsers = users.map(u => (
        <li><Link to={`/users/${u.id}`}>{u.name}</Link></li>
    ))

    return (
        <ul>
            {renderUsers}
        </ul>
    );
};

export default UserList;
