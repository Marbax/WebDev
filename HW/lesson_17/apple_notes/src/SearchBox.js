import React from 'react'
import { Input } from 'antd'

const { Search } = Input

class SearchBox extends React.Component {
    onSearch = (value) => this.props.onFilterChanged(value)

    render() {
        return <Search placeholder='search note' onSearch={this.onSearch} style={{ width: 200, margin: '16px 0 0 0' }} />
    }
}

export default SearchBox
