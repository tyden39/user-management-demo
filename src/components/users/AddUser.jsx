import { useDispatch, useSelector } from "react-redux";
import UserForm from "../UserForm";
import { userActions } from "../redux/userSlice";
import { useEffect, useState } from "react";

export default function AddUser(props) {
    const { setModalClose } = props
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    const [formValidate, setFormValidate] = useState({}) // error, validating. success

    const handleSubmit = (data) => {
        // for(let i = 0; i < 200; i++ ) {
        //     dispatch(userActions.add({...data, username: i.toString(), createdAt: Date.now(), updatedAt: Date.now()}))
        // }

        dispatch(userActions.add(data))
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const errors = {}
        users.errors.forEach((item) => {
            errors[item.field] = item.message
        })
        setFormValidate(errors)

        if(users.success) setModalClose(false)
        
    }, [users,setModalClose])
    
    return (
        <UserForm title='User Add' type='add' onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} formValidate={formValidate}/>
    )
}
