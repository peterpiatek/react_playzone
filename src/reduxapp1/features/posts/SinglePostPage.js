import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostById} from "../postsSlice";

const SinglePostPage = () => {

    const {id} = useParams();
    const p = useSelector(state => selectPostById(state, id));
    return (
        <article key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.content}</p>
            <Link to={`/`}>Go back</Link>
        </article>
    );
};

export default SinglePostPage;
