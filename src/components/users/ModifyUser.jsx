import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../UserForm";
import { userActions } from "./userSlice";

export default function ModifyUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const { data, setModalClose } = props;
    const [user] = useState(users.data.find(x => x.username === data.username));

    const handleSubmit = (data) => {
        dispatch(userActions.modify(data))
        setModalClose(false)
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <UserForm title='User Modify' type='modify' initUser={user} onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
        </>
    )
}