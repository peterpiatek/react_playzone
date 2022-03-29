import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserById} from "../postsApi";

const UserPosts = () => {

    const {id} = useParams();
    const user = useSelector(state => selectUserById(state, id));



    return (
        <div>
            user post
        </div>
    );
};

export default UserPosts;
