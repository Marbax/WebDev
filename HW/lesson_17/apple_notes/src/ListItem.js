import db from './db'

class ListItem {
    id = 0
    title = ''
    text = ''
    date = new Date()

    constructor(props) {
        this.id = props.id
        this.title = props.title
        this.text = props.text
        this.date = props.date
    }
}

db.notes.mapToClass(ListItem)

export default ListItem
