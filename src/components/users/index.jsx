import { Button, Modal, Pagination, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExportCSV } from '../ExportCSV';
import SearchBar from '../SearchBar';
import AddUser from './AddUser';
import ModifyUser from './ModifyUser';
import { remove, userActions } from '../redux/userSlice';

const Home = () => {

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [modal, setModal] = useState({title: '', visible: false, type: '', data: {}})

  const handleDelete = (username) => {
    dispatch(remove(username))
  }

  const onChangePage = (page, pageSize) => {
    dispatch(userActions.get({currPage: page, pageSize: pageSize}))
  }
  
  const handleAdd = (username) => {
    setModal({...modal, title: 'Add User', type: 'add', visible: true})
  }

  const handleModify = (username) => {
    setModal({...modal, title: 'Modify User', type: 'modify', visible: true, data: {...modal.data, username: username}})
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      // sorter: (a, b) => a.username.toString().localeCompare(b.username),
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

  const getData = () => {
    return JSON.parse(localStorage.getItem('users'))
  }

  useEffect(() => {
    switch (users.status) {
      case 'success':
        dispatch(userActions.actionFinish())
        setModal({...modal, visible: false})
        break;
    
      default:
        break;
    }
  }, [users,dispatch,modal])

  return (
    <>
      <div className="title">
        <h1>Users</h1>
        <Button onClick={handleAdd} type={'primary'} style={{marginBottom: '16px'}}>Add</Button>
        <ExportCSV getData={getData} fileName={'fileName'}/>
        <SearchBar />

        <Modal
          // title={modal.title}
          destroyOnClose={true}
          visible={modal.visible}
          footer={null}
          width={700}
          zIndex={1}
          onCancel={() => {
            setModal({...modal, visible: false});
            dispatch(userActions.actionFinish())
          }}
        >
          {modal.type === 'add' && <AddUser />}
          {modal.type === 'modify' && <ModifyUser data={modal.data} setModalClose={(status) => setModal({...modal, visible: status})}/>}
        </Modal>
      </div>
      <Table columns={columns} dataSource={users.data} rowKey="username" pagination={false}/>
      <Pagination style={{textAlign: 'right', margin: '16px 0'}} current={users.currPage} total={users.count} onChange={onChangePage}/>
    </>
  )
}

export default Home
