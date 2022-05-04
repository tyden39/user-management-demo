import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/userSlice";


export default function SearchBar() {
    const dispatch = useDispatch()
    const search = useSelector((state) => state.users.search)

    const onSubmit = (e) => {
        dispatch(userActions.get({search: e.target.value, currPage: 1}))
    }

    return (
        <Input placeholder="Search" onInput={onSubmit} value={search}/>
    )
}
