import { Button, message, Modal, notification, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove, userActions } from '../../slices';
import AddUser from '../AddUser';
import ModifyUser from '../ModifyUser';
import SearchBar from '../SearchBar';

const Home = () => {

  const users = useSelector((state) => state.users.value)
  const dispatch = useDispatch()
  const [modal, setModal] = useState({title: '', visible: false, type: '', data: {}})

  const handleDelete = (username) => {
    const userDispatch = dispatch(remove(username))
    if (userDispatch.type === userActions.remove.type)
      notification.success({
        message: 'deleted',
        placement: 'bottomRight'
      });
  }
  
  const handleAdd = (username) => {
    setModal({...modal, title: 'Add User', type: 'add', visible: true})
  }

  const handleModify = (username) => {
    setModal({...modal, title: 'Modify User', type: 'modify', visible: true, data: {...modal.data, username: username}})
  }

  const columns = [
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      // sorter: true,
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
      render: (username, record) => (
        <Space>
          <Button onClick={() => handleModify(username)} type="primary">Modify</Button>
      
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(username)}
            okText="Ok"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="title">
        <h1>Users</h1>
        <Button onClick={handleAdd} type={'primary'} style={{marginBottom: '16px'}}>Add</Button>
        <SearchBar />

        <Modal
          // title={modal.title}
          destroyOnClose={true}
          visible={modal.visible}
          footer={null}
          width={700}
          onCancel={() => setModal({...modal, visible: false})}
        >
          {modal.type === 'add' && <AddUser setStatus={(status) => setModal({...modal, visible: status})}/>}
          {modal.type === 'modify' && <ModifyUser data={modal.data} setStatus={(status) => setModal({...modal, visible: status})}/>}
        </Modal>
      </div>
      <Table columns={columns} dataSource={users} rowKey="username" />
    </>
  )
}

export default Home
