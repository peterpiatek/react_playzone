import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({timestamp}) => {

    let timeAgo = '';
    if(timestamp){
        const date = parseISO(timestamp);
        const timeDiff = formatDistanceToNow(date);
        timeAgo = `${timeDiff} ago`;
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};

export default TimeAgo;
