import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Auth from './CustomAuth';
import Mailbox from './MsgBox';
import WarnB from './WarningBanner';
import CNTRL from './ControllableItems';

class Person extends React.Component {
  constructor(props) {
    super(props)

    this._person = <li>
      <b>name</b> = <p>{props.value['name']}</p>
      <br /><b>height</b> = <p>{props.value['height']}</p>
      <br /><b>mass</b> = <p>{props.value['mass']}</p>
      <br /><b>hair_color</b> = <p>{props.value['hair_color']}</p>
      <br /><b>skin_color</b> = <p>{props.value['skin_color']}</p>
      <br /><b>eye_color</b> = <p>{props.value['eye_color']}</p>
      <br /><b>birth_year</b> = <p>{props.value['birth_year']}</p>
      <br /><b>gender</b> = <p>{props.value['gender']}</p>
      <br /><b>homeworld</b> = <p>{props.value['homeworld']}</p>
      <br /><b>films</b> = <p>{props.value['films']}</p>
      <br /><b>species</b> = <p>{props.value['species']}</p>
      <br /><b>vehicles</b> = <p>{props.value['vehicles']}</p>
      <br /><b>starships</b> = <p>{props.value['starships']}</p>
      <br /><b>created</b> = <p>{props.value['created']}</p>
      <br /><b>edited</b> = <p>{props.value['edited']}</p>
      <br /><b>url</b> = <p>{props.value['url']}</p>
    </li>
  }
  render() {
    return this._person
  }

}


class StarWars extends React.Component {

  _url = ''
  _timerId = ''

  constructor(props) {
    super(props)
    this._url = 'https://swapi.dev/api/people/'
    this.state = {
      people: [],
      date: new Date()
    }
  }

  componentDidMount() {
    this._timerID = setInterval(
      () => this.tick(),
      1000
    )

    this.getData()
  }

  componentWillUnmount() {
    clearInterval(this._timerID)
  }

  async getData() {
    const resp = await fetch(this._url)
    const json = await resp.json()
    this.setState({
      people: json.results.map(i =>
        <Person key={i.name.toString()} value={i} />
      )
    })
  }

  tick() {
    this.setState({ date: new Date() })
  }

  handleClick = () => { console.log('Value of this:', this); }

  messages = ['React', 'Re: React', 'Re:Re: React', 'Ololo'];

  render() {
    return (
      <div class="sw-resp">
        <h1>Star Wars</h1>
        <h2>Now is {this.state.date.toLocaleDateString()} - {this.state.date.toLocaleTimeString()}.</h2>
        <Auth />
        <Mailbox unreadMessages={this.messages} />
        <WarnB />
        <CNTRL />
        <button onClick={this.handleClick}>Нажми на меня</button>
        <div>
          <ol>
            {this.state.people}
          </ol>
        </div>
      </div>
    )
  }
}

export default StarWars;
