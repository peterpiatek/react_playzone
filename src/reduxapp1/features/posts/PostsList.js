import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectAllPosts, fetchPosts, selectPostIds} from "../postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {

    const postsData = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const orderedPostsIds = useSelector(selectPostIds);

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
        // getting now ordered list from postsAdapter
        // const orderedPosts = postsData.slice().sort((a,b) => b.timestamp.localeCompare(a.timestamp));
        content = orderedPostsIds.map(id => <PostExcerpt key={id} id={id} />);
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
