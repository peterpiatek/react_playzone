import React, {useLayoutEffect} from 'react';
import {allNotfRead, fetchNotf, selectAllNotf} from "./notificationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";
import {formatDistanceToNow, parseISO} from "date-fns";

const NotificationsList = () => {

    const notifications = useSelector(selectAllNotf);
    const users = useSelector(selectAllUsers);

    const renderContent = () => {
        return notifications.map((n, i) => {
            const user = users.find(u => u.id === n.userId);
            const timeAgo = formatDistanceToNow(parseISO(n.timestamp));

            return (
                <div key={i}>
                    <h2>{user.name || 'No user'}</h2>
                    <h3> { n.title}</h3>
                    <span>{timeAgo}</span>&nbsp;
                    {n.isNew && <span>NEW</span>}
                </div>
            )
        })
    }

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(allNotfRead());
    })

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default NotificationsList;
