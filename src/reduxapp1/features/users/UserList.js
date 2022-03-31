import React from 'react';
import {selectUserById, selectUserIds} from "./usersSlice";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserRecord = ({id}) => {

    const udata = useSelector(state => selectUserById(state, id));
    console.log(udata);

    return <li><Link to={`/users/${id}`}>{udata.name}</Link></li>;

}

const UserList = () => {

    const users = useSelector(selectUserIds);

    const renderUsers = users.map(id => <UserRecord key={id} id={id} />)

    return (
        <ul>
            {renderUsers}
        </ul>
    );
};

export default UserList;
