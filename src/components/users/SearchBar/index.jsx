import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";


export default function SearchBar() {
    const dispatch = useDispatch()
    const search = useSelector((state) => state.users.search)

    const onSubmit = (e) => {
        dispatch({ type: 'users/get', payload: { search: e.target.value, currPage: 1 } })
    }

    return (
        <Input placeholder="Search" onInput={onSubmit} value={search} />
    )
}
