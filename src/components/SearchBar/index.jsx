import { Input } from "antd";
import { useDispatch } from "react-redux";
import { userActions } from "../../slices";


export default function SearchBar() {
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        dispatch(userActions.search(e.target.value))
    }

    return (
        <Input placeholder="Search" onInput={onSubmit}/>
    )
}
