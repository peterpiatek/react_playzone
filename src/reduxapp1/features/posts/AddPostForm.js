import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {savePost, selectPostById, updatePost} from "../postsSlice";

import {useNavigate, useParams} from "react-router-dom";

const AddPostForm = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');

    const {id} = useParams();
    const post = useSelector(state => selectPostById(state, id));
    const users = useSelector(state => state.users);

    useEffect(()=>{
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, []);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const pickUser = (e) => {
        setUser(e.target.value);
    }

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const onSavePost = () => {
        if (title && content) {
            if(!post){
                dispatch(savePost(title, content, user));
            } else {
                dispatch(updatePost({id: post.id, title, content, user}))
            }

            setTitle('');
            setContent('');
            setUser('');
            navigate("/", {replace: true});
        }
    }

    const canSave = !!title && !!content && !! user;

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <br/><br/>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <br/><br/>
                <label htmlFor="postAuthor">Post Author:</label>
                <select id="postAuthor" onChange={pickUser}>
                    <option value="">Choose user</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select><br/><br/>
                <button onClick={onSavePost} type="button" disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
};

export default AddPostForm;
