import React from 'react'
import { Modal, Button } from 'antd'

class DeleteBtn extends React.Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = (e) => {
        this.props.onDelete()
        this.setState({
            visible: false,
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        })
    }

    render() {
        const disabled = this.props.selectedItem === undefined || this.props.selectedItem === -1

        return (
            <>
                <Button disabled={disabled} type='primary' onClick={this.showModal}>
                    Delete
                </Button>
                <Modal title='Are you sure?' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>Note will be deleted permanently.</p>
                </Modal>
            </>
        )
    }
}

export default DeleteBtn
