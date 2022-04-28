import { Button, Form, Input, List, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import AddNote from './addNote';

export default function UserForm(props) {

    const { onSubmit, onSubmitFaliled, initUser = {username: '', password: '', email: '', notes: []}, type, title } = props
    const [modal, setModal] = useState({title: '', visible: false, type: '', data: {}})
    const [notes, setNotes] = useState([...initUser.notes])
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [form] = Form.useForm()
    
    const showNoteForm = () => {
        setModal({...modal, visible: true})
    }

    const handleAddNote = (data) => {
        let newNotes = [...notes]
        if(notes[data.noteID])
            newNotes[data.noteID] = data.noteContent
        else 
            newNotes.push(data.noteContent)

        setNotes(newNotes)
        setModal({...modal, visible: false, data: {}})
        form.setFieldsValue({notes: newNotes})
        setDisableSubmit(false)
    }

    const onChange = (changedValues, allValues) => {
        if (JSON.stringify(initUser) !== JSON.stringify(allValues))
            setDisableSubmit(false)
        else
            setDisableSubmit(true)
    }

    const handleEditNote = (item) => {
        const itemID = notes.findIndex(x => x === item)
        setModal({...modal, visible: true, data: {noteID: itemID,noteContent: item}})
    }
    
    const handleDeleteNote = (item) => {
        const newNotes = [...notes.filter(x => x !== item)]
        form.setFieldsValue({notes: [...notes.filter(x => x !== item)]})
        setDisableSubmit(false)
        setNotes(newNotes)
    }

    return (
        <>
            <div className="title">
                <h1>{title}</h1>
            </div>
            <Form
                form={form}
                name="user"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={initUser}
                onValuesChange={onChange}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFaliled}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    disabled
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={initUser?.username} disabled={type === 'modify' ? true : false}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={showNoteForm}>
                            Add Notes
                        </Button>

                        <Button type="primary" htmlType="submit" disabled={disableSubmit}>
                            {type === 'add' ? 'Add' : 'Save'}
                        </Button>
                    </div>
                </Form.Item>
                
                <Form.Item 
                    name="notes"
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    {notes && 
                        <List
                        header={<h1>Notes</h1>}
                        bordered
                        dataSource={notes}
                        pagination={{
                            pageSize: 4
                        }}
                        renderItem={item => (
                            <List.Item 
                                extra={
                                    <div>
                                        <Button onClick={() => handleEditNote(item)}>Edit</Button>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Are you sure to delete this note?"
                                            onConfirm={() => handleDeleteNote(item)}
                                            okText="Ok"
                                            cancelText="Cancel"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                    </div>
                                }>
                                {item}
                            </List.Item>
                        )}
                    />}
                </Form.Item>
            </Form>

            <Modal
                destroyOnClose={true}
                visible={modal.visible}
                footer={null}
                width={700}
                zIndex={1}
                onCancel={() => setModal({...modal, visible: false, data: {}})}
            >
                <AddNote data={modal.data} onSubmit={handleAddNote} onSubmitFaliled={() => {}}/>
            </Modal>
        </>
    )
}