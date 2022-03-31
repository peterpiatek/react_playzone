import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserById} from "./usersSlice";
import {selectAllPosts, selectPostsByUser} from "../postsSlice";


const UserPosts = () => {

    const {id} = useParams();
    const user = useSelector(state => selectUserById(state, id));

    const userPosts = useSelector(state => {
        return selectPostsByUser(state, id);
    });
    console.log(userPosts);
    const renderPosts = userPosts.map(p => {
        return (
            <article key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
            </article>
        )
    })

    return (
        <div>
            {renderPosts}
        </div>
    );

};

export default UserPosts;
