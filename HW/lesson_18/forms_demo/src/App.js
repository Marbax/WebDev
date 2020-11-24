import React, { Component } from 'react'
import './App.css'
import { Button, Container, Row, Col, Form, FormLabel } from 'react-bootstrap'

class App extends Component {
    _genders = ['male', 'female', 'another']
    _destinations = ['Taiti', 'Kyprus', 'Bangladesh', 'Norway']
    _diets = [
        "Don't eat any meat(fish is meat too).",
        'Eat much more vegetables.',
        'Drink holy water on evenings.',
        'Praise the God Emperor 3 times every day.',
        'Stop drinking.',
        'Make yogga.',
        'Stop smoking.',
        'Stop walking.',
    ]
    _badDiets = ['Stop drinking.']

    constructor() {
        super()
        this.state = { fName: '', lName: '', age: '', gender: '', dest: '', diets: [] }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget
        form.preventDefault()
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    handleFNameChange = (event) => {
        this.setState({ fName: event.target.value })
    }
    handleLNameChange = (event) => {
        this.setState({ lName: event.target.value })
    }
    handleAgeChange = (event) => {
        this.setState({ age: event.target.value })
    }
    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value })
    }
    handleDestChange = (event) => {
        this.setState({ dest: event.target.value })
    }
    handleDietChange = (event) => {
        if (event.target.checked === false) {
            this.setState({ diets: this.state.diets.filter((i) => i !== event.target.value) })
        } else if (event.target.checked === true) {
            const newDiets = this.state.diets
            newDiets.push(event.target.value)
            this.setState({ diets: newDiets })
        }
    }

    render() {
        return (
            <main className={'p-2'}>
                <Container>
                    <Row className={'justify-content-center'}>
                        <Col md={6}>
                            <Form noValidate validated='true' onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='First Name' required pattern='[A-Za-zА-Яа-яЁё]{3,20}' value={this.state.fName} onInput={this.handleFNameChange} />
                                    <Form.Control.Feedback>Looks good.</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>Please enter your name , only latters.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type='text' placeholder='Last Name' required pattern='[A-Za-zА-Яа-яЁё]{3,20}' value={this.state.lName} onInput={this.handleLNameChange} />
                                    <Form.Control.Feedback>Looks good.</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>Please enter your Last Name , only latters.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type='number' placeholder='Age' required min='16' max='70' value={this.state.age} onInput={this.handleAgeChange} />
                                    <Form.Control.Feedback>Looks good.</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>Please enter your age. Between 16 and 70.</Form.Control.Feedback>
                                </Form.Group>

                                <fieldset>
                                    <Form.Group as={Row}>
                                        <FormLabel className='m-2 mx-4'>Gender:</FormLabel>
                                        {this._genders.map((i) => (
                                            <Form.Check
                                                key={i.toString()}
                                                className='m-2 mx-4'
                                                type='radio'
                                                value={i.toString()}
                                                label={i.toString()}
                                                name='formGender'
                                                required
                                                isInvalid='true'
                                                onChange={this.handleGenderChange}
                                            />
                                        ))}
                                    </Form.Group>
                                </fieldset>

                                <Form.Group>
                                    <Form.Control as='select' custom required onChange={this.handleDestChange} value={this.state.dest}>
                                        <option value='' hidden disabled>
                                            Destination...
                                        </option>
                                        {this._destinations.map((i) => (
                                            <option key={i.toString()}>{i.toString()}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback>Looks good.</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>Please choose some destination.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Row} className={'justify-content-center'}>
                                    <Col md='6'>
                                        {this._diets.slice(0, Math.floor(this._diets.length / 2)).map((i) => (
                                            <Form.Check
                                                disabled={this._badDiets.includes(i.toString())}
                                                key={i.toString()}
                                                value={i.toString()}
                                                className='m-2'
                                                label={i.toString()}
                                                onChange={this.handleDietChange}
                                            />
                                        ))}
                                    </Col>
                                    <Col md='6'>
                                        {this._diets.slice(Math.floor(this._diets.length / 2)).map((i) => (
                                            <Form.Check
                                                disabled={this._badDiets.includes(i.toString())}
                                                key={i.toString()}
                                                value={i.toString()}
                                                className='m-2'
                                                label={i.toString()}
                                                onChange={this.handleDietChange}
                                            />
                                        ))}
                                    </Col>
                                </Form.Group>

                                <Button className='m-2' variant='outline-success' type='submit' size='lg' block>
                                    Submit
                                </Button>
                            </Form>

                            <hr />
                            <h2>
                                <font className='text-info'>Entered information:</font>
                            </h2>
                            <p>
                                <b>Your name: </b> {this.state.fName + ' ' + this.state.lName}
                            </p>
                            <p>
                                <b>Your age: </b> {this.state.age}
                            </p>
                            <p>
                                <b>Your gender: </b> {this.state.gender}
                            </p>
                            <p>
                                <b>Your destination: </b> {this.state.dest}
                            </p>
                            <p>
                                <b>Your dietary restrictions: </b>
                                {this.state.diets.join(' ')}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </main>
        )
    }
}

export default App
