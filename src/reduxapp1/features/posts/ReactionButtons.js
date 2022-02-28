import React from 'react';
import {useDispatch} from "react-redux";
import {reactionUpdate} from "../postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButtons = ({post}) => {

    const dispatch = useDispatch();

    const renderButtons = Object.entries(reactionEmoji).map(([name, ico]) => {
        return (
            <button onClick={() => {
                dispatch(reactionUpdate({id: post.id, name}));
            }} key={name}>
                {ico} {post.reactions[name]}
            </button>
        );
    });

    return (
        <div>
            {renderButtons}
        </div>
    );
};

export default ReactionButtons;
