import { useDispatch } from "react-redux";
import { add } from "../../slices";
import UserForm from "../UserForm"

export default function AddUser() {
    const dispatch = useDispatch()

    const handleSubmit = (data) => {
        dispatch(add(data))
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        
            <UserForm onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
        
        </>
    )
}