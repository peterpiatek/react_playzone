import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./app/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostsListRtk from "./features/posts/PostsListRtk";
import UsersList from "./features/users/UsersList";
import UserPosts from "./features/users/UserPosts";

const App = () => {


    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<PostsList/>} />
                <Route exact path="/post/new" element={<AddPostForm/>} />
                <Route exact path="/post/:id" element={<SinglePostPage/>} />
                <Route exact path="/post/edit/:id" element={<AddPostForm/>} />
                <Route exact path="/users" element={<UsersList/>} />
                <Route exact path="/users/:id" element={<UserPosts/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
