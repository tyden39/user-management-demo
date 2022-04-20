import { Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'UserName',
    dataIndex: 'username',
    key: 'username',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];

const Home = () => {

  const users = useSelector((state) => state.users.users)

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