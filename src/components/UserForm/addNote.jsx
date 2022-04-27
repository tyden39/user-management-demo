import { Button, Form, Input } from "antd";

export default function AddNote ({initValue, onSubmit, onSubmitFaliled, setModalClose}) {
    
    return (
        <>
        <div className="title">
            <h1>Add Note</h1>
        </div>
        <Form
            name='note'
            // labelCol={{span:4}}
            // wrapperCol={{span: 16}}
            initialValues={initValue}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFaliled}
            autoComplete="off"
            >
            <Form.Item name="noteContent">
                <Input.TextArea rows={6}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
                style={{textAlign: 'center'}}
            >
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}