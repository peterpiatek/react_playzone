import {useSelector} from 'react-redux';
import {selectUserById} from "../users/usersSlice";


const PostAuthor = ({id}) => {

    const user = useSelector(state => selectUserById(state, id));
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
