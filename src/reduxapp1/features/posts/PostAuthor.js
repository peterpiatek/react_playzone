import React from 'react';
import {useSelector} from "react-redux";

const PostAuthor = ({id}) => {

    const user = useSelector(state => state.users.find(s => String(s.id) === String(id)));
    const renderUser = () => {
        if(user) {
            return <h3>{user.name}</h3>
        } else {
            return 'No user';
        }
    }

    return (
        <div>
            {renderUser()}
        </div>
    );
};

export default PostAuthor;
