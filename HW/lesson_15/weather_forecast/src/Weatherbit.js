import React from 'react'
import './Weatherbit.css'

function Weather(props) {
    const unit = props.props
    return (
        <div className={'iconBlock'}>
            <img
                src={`https://www.weatherbit.io/static/img/icons/${unit.icon}.png`}
                alt={unit.icon}
            ></img>
            <p>
                {unit.description.charAt(0).toUpperCase() +
                    unit.description.slice(1)}
            </p>
        </div>
    )
}

function ForecastWeather(props) {
    return (
        <div className={'forecastWeather'}>
            <h4>
                {new Date(props.datetime).toLocaleString(`${props.lang}`, {
                    weekday: 'long',
                })}
            </h4>
            <p>{props.datetime}</p>
            <Weather props={props.weather} />
            <h2>{props.temp} &#8451;</h2>
        </div>
    )
}

class CurrentWeather extends React.Component {
    _unit = ''
    _timerID = ''

    constructor(props) {
        super(props)
        this._unit = props.props
        this.state = { date: new Date() }
    }

    componentDidMount() {
        this._timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timerID)
    }

    tick() {
        this.setState({ date: new Date() })
    }

    render() {
        return (
            <div>
                <div className={'curWeathTop'}>
                    <h3>
                        {this._unit.country_code}, {this._unit.city_name}{' '}
                    </h3>
                    <p>
                        <b>
                            {this.state.date.toLocaleDateString()}-
                            {this.state.date.toLocaleTimeString()}
                        </b>
                    </p>
                </div>
                <div className={'curWeathBot'}>
                    <div>
                        <Weather props={this._unit.data[0].weather} />
                    </div>
                    <div>
                        <h2>{this._unit.data[0].temp} &#8451;</h2>
                    </div>
                    <div>
                        <p>Clouds: {this._unit.data[0].clouds}%</p>
                        <p>Pressure: {this._unit.data[0].pres}</p>
                        <p>
                            Sun Rise/Set:{' '}
                            {new Date(
                                this._unit.data[0].sunrise_ts * 1000
                            ).toLocaleTimeString()}
                            -
                            {new Date(
                                this._unit.data[0].sunset_ts * 1000
                            ).toLocaleTimeString()}
                        </p>
                        <p>
                            Wind: {this._unit.data[0].wind_cdir_full}{' '}
                            {this._unit.data[0].wind_spd}m/s
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

class WeatherComponent extends React.Component {
    _days = 0
    _lang = 'en'
    _url = ''
    _test = {
        country_code: 'UA',
        city_name: 'Kiev',
        data: [
            {
                clouds: 0,
                datetime: '2020-10-28',
                weather: { icon: 't01n', description: 'hell rain' },
                pres: 1000.8,
                snow: 0,
                sunrise_ts: 1603860188,
                sunset_ts: 1603896113,
                temp: 11.7,
                wind_cdir_full: 'пі́вдень',
                wind_spd: 0.89,
            },
        ],
    }

    constructor(props) {
        super(props)
        this.state = { response: '' }
        this._url = `${props.baseUrl}forecast/daily?key=${props.apiKey}&city=${props.city}&units=${props.units}&lang=${props.language}&days=${props.days}`
        this._days = props.days
        this._lang = props.language
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {}

    async getData() {
        const resp = await fetch(this._url)
        const json = await resp.json()
        this.setState({
            response: json,
        })
    }

    render() {
        let forecast = []
        if (this.state.response) {
            for (let i = 1; i < this._days; i++) {
                // forecast.push(<ForecastWeather key={this._test.data[0].datetime.toString() + i} lang={this._lang} weather={this._test.data[0].weather} temp={this._test.data[0].temp} datetime={this._test.data[0].datetime} />)
                forecast.push(
                    <ForecastWeather
                        key={
                            this.state.response.data[i].datetime.toString() +
                            ':' +
                            this.state.response.data[i].temp.toString()
                        }
                        lang={this._lang}
                        weather={this.state.response.data[i].weather}
                        temp={this.state.response.data[i].temp}
                        datetime={this.state.response.data[i].datetime}
                    />
                )
            }
        }

        return (
            <div>
                <div className={'currentWeather'}>
                    {/* {this._test && <CurrentWeather props={this._test} />} */}
                    {this.state.response && (
                        <CurrentWeather props={this.state.response} />
                    )}
                </div>
                <div className={'fWContainer'}>{forecast}</div>
            </div>
        )
    }
}

class Weatherbit extends React.Component {
    _timerID = ''
    _apiKey = '061df336f9584733bd89f59097cce914'
    _baseUrl = 'https://api.weatherbit.io/v2.0/'
    _langs = [
        { name: 'Русский', value: 'ru' },
        { name: 'Украинска', value: 'uk' },
        { name: 'English', value: 'en' },
    ]
    _units = [
        { name: 'Celcius', value: 'M' },
        { name: 'Kelvin', value: 'S' },
        { name: 'Fahrenheit ', value: 'I' },
    ]

    constructor(props) {
        super(props)
        this.state = { city: 'Kiev', units: 'M', language: 'en', days: 6 }
    }

    render() {
        return (
            <div className={'weatherRoot'}>
                <WeatherComponent
                    baseUrl={this._baseUrl}
                    apiKey={this._apiKey}
                    city={this.state.city}
                    units={this.state.units}
                    language={this.state.language}
                    days={this.state.days}
                />
            </div>
        )
    }
}

export default Weatherbit
