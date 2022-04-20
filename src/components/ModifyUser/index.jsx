import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import UserForm from "../UserForm"

export default function ModifyUser() {
    // let { id } = useParams();

    const [user, setUser] = useState({});

    const handleSubmit = (data) => {
        console.log('add user:', data)
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        //get user from id 
        setUser({ username: 'username 1', password: 'asdf', phone: '0903123122', email: 'email 1', active: true, deleted: false, createdAt: '', modifiedAt: ''})
    }, [])

    return (
        <>
        
            <UserForm initUser={user} onSubmit={handleSubmit} onSubmitFailed={onSubmitFailed} />
        
        </>
    )
}