import React from 'react'
import SimpleMDEReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

class MarkEditor extends React.Component {
    handleChange = (value) => {
        this.props.onTextChanged(value)
    }

    render() {
        return (
            <>
                <SimpleMDEReact
                    className={'scrollable'}
                    id={this.props.id}
                    onChange={this.handleChange}
                    value={this.props.value}
                    options={{
                        autofocus: true,
                        spellChecker: false,
                        hideIcons: ['guide', 'image', 'side-by-side'],
                        showIcons: ['code'],
                        previewImagesInEditor: true,
                    }}
                />
            </>
        )
    }
}

export default MarkEditor
