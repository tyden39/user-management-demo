import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { modify } from "../../slices";
import UserForm from "../UserForm";

export default function ModifyUser() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.value)
    const { username } = useParams();
    const [user] = useState(users.find(x => x.username === username));

    const handleSubmit = (data) => {
        const dispatchUser = dispatch(modify(data))
        if (dispatchUser.type === 'users/modify')
            message.success('Save Successful!');
        else message.error('Save Error!')
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <UserForm type='modify' initUser={user} onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
        </>
    )
}