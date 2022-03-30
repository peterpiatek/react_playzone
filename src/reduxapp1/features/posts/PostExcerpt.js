import PostAuthor from "./PostAuthor";
import {Link} from "react-router-dom";
import {deletePost} from "../postsSlice";
import ReactionButtons from "./ReactionButtons";
import React from "react";

let PostExcerpt = ({post, dispatch}) => {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}</p>
            <PostAuthor id={post.userId} /><br/><br/>
            {/*<TimeAgo timestamp={post.timestamp} /><br/>*/}
            <Link to={`/post/${post.id}/`}>Read more</Link>
            <Link to={`/post/edit/${post.id}/`}>Edit</Link>
            <button onClick={() => dispatch(deletePost(post.id))}>Delete</button><br/><br/>
            <ReactionButtons post={post} />
        </article>
    );
}

PostExcerpt = React.memo(PostExcerpt);

export default PostExcerpt;
