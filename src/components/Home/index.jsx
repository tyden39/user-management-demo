import React from 'react'
import { Link } from 'react-router-dom'
import { users } from '../../data/users'

const Home = () => {

    return (
        <>
        
            <h1>Users</h1> 
            <Link to="/add">Add</Link>
            {users.map((data, key) => {
                return (
                    <div key={key}>{`${data.username}, ${data.phone}, ${data.email}`} <span>Remove</span> <Link to='/modify'>Modify</Link></div>)
                })
            }
        
        </>
    )
}

export default Home