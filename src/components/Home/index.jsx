import { Button, Space, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove } from '../../slices';

const Home = () => {

  const users = useSelector((state) => state.users.value)
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
    },
    {
      title: 'Password',
      key: 'password',
      render: () => <p>********</p>,
      width: '30%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
    },
    {
      title: 'Action',
      dataIndex: 'username',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Space>
          <Link to={`/modify/${text}`}><Button type="primary">Modify</Button></Link>
          <Button onClick={() => dispatch(remove(text))} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="title">
        <h1>Users</h1>
        <Link to="/add">Add</Link>
      </div>
      <Table columns={columns} dataSource={users} rowKey="username" />
    </>
  )
}

export default Home