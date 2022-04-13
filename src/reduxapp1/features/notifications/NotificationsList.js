import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allNotificationsRead, selectAllNot} from "./notificationsSlice";
import {selectAllUsers} from "../users/usersSlice";
import {formatDistanceToNow, parseISO} from "date-fns";

const NotificationsList = () => {

    const notf = useSelector(selectAllNot);
    console.log(notf);
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();

    const renderNot = () => {
        return notf.map((n, i) => {
            const timeAgo = formatDistanceToNow(parseISO(n.timestamp));
            const user = users.find(u => u.id.toString() === n.userId.toString());
            const notf_css = n.isNew ? {border: 'solid 2px blue'} : null;
            return (
                <div key={i} style={notf_css}>
                    <h3><small>{user.name}</small>: {n.title}</h3>
                    <span>{timeAgo} ago</span>
                </div>
            )
        })
    }

    useLayoutEffect(() => {
        dispatch(allNotificationsRead());
    })

    return (
        <div>
            {renderNot()}
        </div>
    );
};

export default NotificationsList;
