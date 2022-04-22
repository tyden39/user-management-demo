import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

export default function UserForm(props) {

    const { onSubmit, onSubmitFaliled, initUser, type, title } = props

    // const handleClear = (e) => {
    //     e.preventDefault()
    //     localStorage.clear()
    // }

    return (
        <>
            <div className="title">
                <h1>{title}</h1>
            </div>
            <Form
                name="user"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={initUser}
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
                    style={{textAlign: 'center'}}
                >
                    <Button type="primary" htmlType="submit">
                        {type === 'add' ? 'Add' : 'Save'}
                    </Button>

                </Form.Item>
{/* 
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button onClick={handleClear}>
                        Clear Localstorage
                    </Button>

                </Form.Item> */}
            </Form>
        </>
    )
}