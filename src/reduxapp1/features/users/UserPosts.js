import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserById} from "./usersSlice";
import {selectPostsByUser} from "../postsSlice";

const UserPosts = () => {

    const {id} = useParams();
    const user = useSelector(state => selectUserById(state, id))
    const postsPerUser = useSelector(state => selectPostsByUser(state, id))

    const renderPosts = () => {
        return postsPerUser.map(p => (
            <div>
                <h2><Link to={`/posts/${p.id}`}>{p.title}</Link></h2>
                <span>{ p.body.substring(0, 100)} ... </span>
            </div>
        ))
    }


    return (
        <div>
            {user && <h1>{user.name}'s posts</h1>}
            {renderPosts()}
        </div>
    );
};

export default UserPosts;
