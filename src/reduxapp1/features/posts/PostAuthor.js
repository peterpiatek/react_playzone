import {useSelector} from 'react-redux';


const PostAuthor = ({id}) => {

    const user = useSelector(state => state.users.find(u => String(id) === String(u.id)));
    let content;
    if(user){
        content = user.name;
    } else {
        content = 'No user';
    }

    return (
        <h3>{content}</h3>
    );

}
export default PostAuthor;
