import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../UserForm";
import { modify } from "./userSlice";

export default function ModifyUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const { data, setStatus } = props;
    const [user] = useState(users.data.find(x => x.username === data.username));

    const handleSubmit = (data) => {
        const dispatchUser = dispatch(modify(data))
        if (dispatchUser.type === 'users/modify'){
            message.success('Save Successful!');
            setStatus(false)
        }
        else message.error('Save Error!')
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