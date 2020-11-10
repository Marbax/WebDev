import React from 'react'
import { Layout } from 'antd'
import { Row, Col, Space } from 'antd'
import DeleteBtn from './DeleteBtn'
import SearchBox from './SearchBox'

const { Header } = Layout

class AppHeader extends React.Component {
    render() {
        return (
            <Header className='site-layout-header' style={{ padding: 0 }}>
                <Row>
                    <Col span={12} offset={11} align={'right'}>
                        <Space size={10}>
                            <SearchBox onFilterChanged={this.props.onFilterChanged}></SearchBox>
                            <DeleteBtn selectedItem={this.props.selectedItem} onDelete={this.props.onDelete}></DeleteBtn>
                        </Space>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default AppHeader
