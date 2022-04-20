import { Button, Form, Input } from 'antd';

export default function UserForm(props) {

    const { onSubmit, onSubmitFaliled, initUser } = props

    const handleClear = (e) => {
        e.preventDefault()
        localStorage.clear()
    }

    return (
        <>
            <h1 className='title'>Add User</h1>
            <Form
                name="user"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFaliled}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={initUser?.username} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="phone"
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
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>

                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button onClick={handleClear}>
                        Clear Localstorage
                    </Button>

                </Form.Item>
            </Form>
        </>
    )
}