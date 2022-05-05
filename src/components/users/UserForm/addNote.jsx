import { Button, Form, Input } from "antd";
import { useState } from "react";

export default function AddNote ({data, onSubmit, onSubmitFaliled, setModalClose}) {
    const [formFilled, setFormFill] = useState(false)

    const onChange = (changedValues, allValues) => {
        if (JSON.stringify(data) !== JSON.stringify(allValues))
            setFormFill(true)
        else
            setFormFill(false)
    }
    
    return (
        <>
        <div className="title">
            <h1>Add Note</h1>
        </div>
        <Form
            name='note'
            initialValues={data}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFaliled}
            autoComplete="off"
            onValuesChange={onChange}
        >
            
            <Form.Item name="noteID"  style={{display: 'none'}}>
                <Input hidden/>
            </Form.Item>
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
                <Button type="primary" htmlType="submit" disabled={!formFilled}>
                    Add
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}