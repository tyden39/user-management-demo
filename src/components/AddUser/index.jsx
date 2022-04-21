import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../slices";
import UserForm from "../UserForm"

export default function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (data) => {
        const dispatchUser = dispatch(add(data))
        if (dispatchUser.type === 'users/add') {
            message.success('Add Successful!')
            navigate("/", { replace: true });
        }
        else message.error('Add Error!')
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <UserForm type='add' onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
    )
}