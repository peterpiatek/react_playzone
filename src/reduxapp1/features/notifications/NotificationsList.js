import React, {useEffect} from 'react';
import {fetchNotf, selectAllNotf} from "./notificationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";
import {findAllByDisplayValue} from "@testing-library/react";
import {formatDistanceToNow, parseISO} from "date-fns";

const NotificationsList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotf());
    }, []);

    const notifications = useSelector(selectAllNotf);
    console.log(notifications);
    const users = useSelector(selectAllUsers);

    const renderContent = () => {
        return notifications.map(n => {
            const user = users.find(u => u.id === n.userId);
            const timeAgo = formatDistanceToNow(parseISO(n.timestamp));
            return (
                <div>
                    <h2>{user.name || 'No user'}</h2>
                    <h3> { n.title}</h3>
                    <span>{timeAgo}</span>
                </div>
            )
        })
    }

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default NotificationsList;
