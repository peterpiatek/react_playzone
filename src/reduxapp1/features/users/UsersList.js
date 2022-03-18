import React from 'react';
import {selectAllUsers} from "../postsApi";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UsersList = () => {

    const users = useSelector(state => selectAllUsers(state));
    const renderUsers = users.map(u => <li key={u.id}><Link to={`/users/${u.id}`}>{u.name}</Link></li>)

    return (
        <ul>
            {renderUsers}
        </ul>
    );
};

export default UsersList;
