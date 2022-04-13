import React from 'react';
import {useSelector} from "react-redux";
import {selectAllUsers} from "./usersSlice";
import {Link} from "react-router-dom";

const UserList = () => {

    const users = useSelector(selectAllUsers);
    const renderUsers = () => {
        return users.map(u => <li><Link to={`/users/${u.id}`}>{u.name}</Link></li>)
    }

    return (
        <ul>
            {renderUsers()}
        </ul>
    );
};

export default UserList;
