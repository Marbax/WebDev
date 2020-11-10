import React from 'react'
import { Layout, Menu } from 'antd'
const { Sider } = Layout

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedItem: this.props.selectedItem }
    }

    onSelect = (args) => {
        this.setState({ selectedItem: args.key })
        this.props.onSelect(args.key)
    }

    render() {
        return (
            <Sider className={('scrollable', 'sidebar')}>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={[this.state.selectedItem]} onSelect={this.onSelect}>
                    <Menu.Item key='-1'>New Note +</Menu.Item>
                    {this.props.items.map((i) => (
                        <Menu.Item key={i.id}>{i.title}</Menu.Item>
                    ))}
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
