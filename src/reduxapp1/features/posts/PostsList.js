import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deletePost, selectAllPosts} from "../postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {

    const postsData = useSelector(selectAllPosts);
    const orderedPosts = postsData.posts.slice().sort((a,b) => b.timestamp.localeCompare(a.date));
    const dispatch = useDispatch();

    const renderPosts = () => {
        return orderedPosts.map(p => (
            <article key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.content.substring(0, 100)}</p>
                <PostAuthor id={p.user} /><br/><br/>
                <TimeAgo timestamp={p.timestamp} /><br/>
                <Link to={`/post/${p.id}/`}>Read more</Link>
                <Link to={`/post/edit/${p.id}/`}>Edit</Link>
                <button onClick={() => dispatch(deletePost(p.id))}>Delete</button><br/><br/>
                <ReactionButtons post={p} />
            </article>
        ))
    }

    return (
        <div>
            {renderPosts()}
        </div>
    );
};

export default PostsList;
