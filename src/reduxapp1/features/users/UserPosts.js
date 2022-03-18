import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserById} from "../postsApi";
import {selectAllPosts, selectPostsByUser} from "../postsSlice";

const UserPosts = () => {

    const {id} = useParams();
    const user = useSelector(state => selectUserById(state, id));
    const userPosts = useSelector(state => selectPostsByUser(state, id));

    // const allPosts = useSelector(state => selectAllPosts(state));

    console.log(userPosts);
    const renderUserPosts = userPosts.map(p => <li key={p.id}><Link to={`/post/${p.id}`}>{p.title}</Link></li>)

    return (
        <ul>
            {renderUserPosts}
        </ul>
    );
};

export default UserPosts;
