import './App.css'
import React from 'react'
import { Layout } from 'antd'
import Sidebar from './Sidebar'
import Workspace from './Workspace'
import AppHeader from './AppHeader'
import ListItem from './ListItem'
import db from './db'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { notes: [], selectedItem: undefined, filter: '' }
    }

    componentDidMount() {
        this.parseDbDataToState()
    }

    handleAddNote = (text) => {
        const note = {
            title: this.getTitle(text),
            text: text,
            date: new Date().toLocaleDateString(),
        }

        db.table('notes')
            .add(note)
            .then(() => {
                this.parseDbDataToState()
            })
    }

    handleUpdateNote = (id, text) => {
        db.table('notes')
            .update(parseInt(id), { text: text, title: this.getTitle(text), date: new Date().toLocaleDateString() })
            .then(() => {
                this.parseDbDataToState()
            })
    }

    handleDeleteNote = () => {
        db.table('notes')
            .delete(parseInt(this.state.selectedItem))
            .then(() => {
                const newList = this.state.notes.filter((note) => note.id !== parseInt(this.state.selectedItem))
                this.setState({ notes: newList })
            })
    }

    getTitle = (text) => {
        return text.split('\n')[0]
    }

    getFilteredNotes() {
        if (this.state.filter.length > 0) {
            return this.state.notes.filter((i) => i.title.includes(this.state.filter) || i.text.includes(this.state.filter))
        } else {
            return this.state.notes
        }
    }

    parseLocalStData() {
        const arr = []
        arr.push(new ListItem({ id: 0, text: 'New Note +' }))
        for (let i = 1; i <= localStorage.length; i++) {
            arr.push(new ListItem({ id: i, text: localStorage.getItem(i) }))
        }

        return arr
    }

    parseDbDataToState() {
        db.table('notes')
            .toArray()
            .then((notes) => {
                this.setState({ notes: notes.map((i) => new ListItem(i)) })
            })
    }

    onMenuItemSelect = (key) => {
        if (parseInt(key) === -1) {
            this.handleAddNote('New Note')
            const added = this.state.notes[this.state.notes.length - 1]
            this.setState({ selectedItem: added.id })
        } else {
            this.setState({ selectedItem: key })
        }
    }

    onTextChanged = (text) => {
        this.handleUpdateNote(this.state.selectedItem, text)
    }

    onFilterChanged = (text) => {
        this.setState({ filter: text })
    }

    render() {
        const itemId = this.state.selectedItem
        const itemText = this.state.notes.find((i) => parseInt(i.id) === parseInt(itemId))?.text
        return (
            <>
                <Layout style={{ height: '100vh' }}>
                    <AppHeader onFilterChanged={this.onFilterChanged} selectedItem={itemId} onDelete={this.handleDeleteNote} />
                    <Layout>
                        <Sidebar items={this.getFilteredNotes()} selectedItem={itemId} onSelect={this.onMenuItemSelect} />
                        <Workspace id={itemId} text={itemText} onTextChanged={this.onTextChanged} />
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default App
