import React from 'react'
import { Layout } from 'antd'
import MarkEditor from './MarkEditor'

const { Content } = Layout

class Workspace extends React.Component {
    render() {
        let res = null
        if (this.props.id != null) {
            res = <MarkEditor id={this.props.id} value={this.props.text} onTextChanged={this.props.onTextChanged} />
        }
        return <Content className={('scrollable', 'content')}>{res}</Content>
    }
}

export default Workspace
