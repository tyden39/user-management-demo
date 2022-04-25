import { useDispatch } from "react-redux";
import UserForm from "../UserForm";
import { userActions } from "./userSlice";

export default function AddUser(props) {
    const { setModalClose } = props
    const dispatch = useDispatch()

    const handleSubmit = (data) => {
        for(let i = 0; i < 200; i++ ) {

            dispatch(userActions.add({...data, username: i}))
        }
        setModalClose(false)
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <UserForm title='User Add' type='add' onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
    )
}