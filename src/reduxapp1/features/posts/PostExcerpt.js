import React from 'react';
import PostAuthor from "./PostAuthor";
import {Link} from "react-router-dom";
import {deletePost, selectPostById} from "../postsSlice";
import ReactionButtons from "./ReactionButtons";
import {useSelector} from "react-redux";

let PostExcerpt = ({id, dispatch}) => {

    const post = useSelector(state => selectPostById(state, id));

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}</p>
            <PostAuthor id={post.userId}/><br/><br/>
            {/*<TimeAgo timestamp={post.timestamp} /><br/>*/}
            <Link to={`/post/${post.id}/`}>Read more</Link>
            <Link to={`/post/edit/${post.id}/`}>Edit</Link>
            <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
            <br/><br/>
            <ReactionButtons post={post}/>
        </article>

    );
};

//memoization of the excerpt component to limit re-renders when posts lists parent component gets new array of posts
PostExcerpt = React.memo(PostExcerpt);

export default PostExcerpt;
