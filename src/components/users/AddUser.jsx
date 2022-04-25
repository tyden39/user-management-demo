import { message } from "antd";
import { useDispatch } from "react-redux";
import UserForm from "../UserForm";
import { add } from "./userSlice";

export default function AddUser(props) {
    const { setStatus } = props
    const dispatch = useDispatch()

    const handleSubmit = (data) => {
        const dispatchUser = dispatch(add(data))
        if (dispatchUser.type === 'users/add') {
            message.success('Add Successful!')
            setStatus(false)
        }
        else message.error('Add Error!')
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <UserForm title='User Add'  type='add' onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
    )
}