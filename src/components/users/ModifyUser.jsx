import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./UserForm";

export default function ModifyUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const { data, setModalClose } = props;
    const [user] = useState(users.data.find(x => x.username.toString() === data.username.toString()));

    const handleSubmit = (data) => {
        // console.log(data)
        dispatch({type: 'users/modify', payload: data})
        setModalClose(false)
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <UserForm title='User Modify' type='modify' initUser={user} onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
    )
}