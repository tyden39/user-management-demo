import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { modify } from "../../slices";
import UserForm from "../UserForm";

export default function ModifyUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.value)
    const { data, setStatus } = props;
    const [user] = useState(users.find(x => x.username === data.username));

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