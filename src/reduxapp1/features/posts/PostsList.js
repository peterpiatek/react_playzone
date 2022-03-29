import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deletePost, selectAllPosts, fetchPosts} from "../postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";


const PostExcerpt = ({post, dispatch}) => {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}</p>
            <PostAuthor id={post.userId} /><br/><br/>
            {/*<TimeAgo timestamp={post.timestamp} /><br/>*/}
            <Link to={`/post/${post.id}/`}>Read more</Link>
            <Link to={`/post/edit/${post.id}/`}>Edit</Link>
            <button onClick={() => dispatch(deletePost(post.id))}>Delete</button><br/><br/>
            {/*<ReactionButtons post={post} />*/}
        </article>
    );
}

const PostsList = () => {

    const postsData = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if(postStatus === 'idle'){ // fetch only once. after first fetch status will change on reducer code
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    let content;

    if(postStatus === 'loading'){
        content = <h2>Loading</h2>
    } else if(postStatus === 'success'){
        const orderedPosts = postsData.slice().sort((a,b) => b.timestamp.localeCompare(a.timestamp));
        console.log(orderedPosts);
        content = orderedPosts.map((p, i) => <PostExcerpt key={i} post={p} />);
    } else if(postStatus === 'fail'){
        content = <h3>{error}</h3>
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default PostsList;
