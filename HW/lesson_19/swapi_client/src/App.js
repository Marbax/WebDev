import 'antd/dist/antd.css'
import './App.css'
import React, { useState } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Layout, PageHeader, Input, Select, Menu } from 'antd'
import PersonDetails from './PersonDetails'
import MovieDetails from './MovieDetails'
import PlanetDetails from './PlanetDetails'
import StarshipDetails from './StarshipDetails'
import VehicleDetails from './VehicleDetails'
import SwapiData from './SwapiData'

const { Sider, Content } = Layout
const { Option } = Select
const { Search } = Input

//  Сайт: https://swapi.dev/
//
//  Написать React приложение, которое позволяет просматривать пользователю с   вышеуказанного ресурса информацию про персонажей и объекты фильмов StarWars.
//  Должны быть вкладки, которые позволяют просмотреть подробную информацию про:
//   - персонажей
//   - фильмы
//   - планеты
//   - космические корабли
//   - транспорт.
//  При нажатии на конкретную ссылку, отображается соответствующий компонент.
//  Стилизируйте все элементы веб-страницы.

function App(props) {
    const queryCats = [
        { key: 'people', value: 'Characters' },
        { key: 'films', value: 'Movies' },
        { key: 'planets', value: 'Planets' },
        { key: 'starships', value: 'Ships' },
        { key: 'vehicles', value: 'Vehicles' },
    ]
    const baseUrl = 'https://swapi.dev/api/'
    const strFormat = new RegExp(/[ /-]/g)
    let [swapiData, setSwapiData] = useState()
    let [selectedCat, setSelectedCat] = useState(queryCats[0].key)
    let [filter, setFilter] = useState('')
    let [selectedItem, setSelectedItem] = useState()
    let [lasQuery, setLastQuery] = useState('')

    const get = async () => {
        const query = `${baseUrl}${selectedCat}/`
        if (query !== lasQuery) {
            const resp = await fetch(query)
            const data = await resp.json()
            let swapiDataTemp = new SwapiData(data)
            while (swapiDataTemp.nextPage !== null) {
                const nextResp = await fetch(swapiDataTemp.nextPage)
                const nextData = await nextResp.json()
                swapiDataTemp.items.push(...nextData.results)
                swapiDataTemp.nextPage = nextData.next
            }
            setSwapiData(swapiDataTemp)
            setLastQuery(query)
        }
    }

    const changeSelectedCat = (value) => {
        setSelectedCat(value)
    }

    const onSearchQuery = async (text) => {
        setFilter(text)
        await get()
    }

    const itemClickHandler = (e) => {
        const itemFromList = swapiData.items.find((i) => i.name === e.key || i.title === e.key)
        if (itemFromList !== selectedItem) {
            setSelectedItem(itemFromList)
        }
    }

    const selectBefore = (
        <Select value={selectedCat} className='select-before' onChange={changeSelectedCat}>
            {queryCats.map((i) => {
                return (
                    <Option key={i.key} value={i.key}>
                        {i.value}
                    </Option>
                )
            })}
        </Select>
    )
    return (
        <Layout className='main-layout'>
            <PageHeader
                className='site-page-header'
                onBack={() => props.history.goBack()}
                title='SWAPI'
                subTitle='By Marbax'
                extra={[<Search key='datafilter' className='search-box' addonBefore={selectBefore} onSearch={onSearchQuery} placeholder='filter by name(empty to get all)' />]}
            />
            <Layout className='content-layout'>
                <Sider className='site-layout-background scrollable sider'>
                    <Menu theme='dark' mode='inline' className='sider-menu'>
                        {swapiData !== undefined
                            ? swapiData.items.map((i) => {
                                  if (i.name?.toLowerCase().includes(filter.toLowerCase()) || i.title?.toLowerCase().includes(filter.toLowerCase())) {
                                      return (
                                          <Menu.Item key={i['name'] || i['title']} onClick={itemClickHandler}>
                                              <NavLink key={i['name'] || i['title']} to={`/${selectedCat}/${i.name?.replace(strFormat, '') || i.title?.replace(strFormat, '')}`} className='menu-item'>
                                                  {i['name'] || i['title']}
                                              </NavLink>
                                          </Menu.Item>
                                      )
                                  } else {
                                      return null
                                  }
                              })
                            : null}
                    </Menu>
                </Sider>
                <Content>
                    {selectedItem !== undefined ? (
                        <>
                            <Route exact path={`/${queryCats[0].key}/:name`}>
                                <PersonDetails data={selectedItem}></PersonDetails>
                            </Route>
                            <Route exact path={`/${queryCats[1].key}/:name`}>
                                <MovieDetails data={selectedItem}></MovieDetails>
                            </Route>
                            <Route exact path={`/${queryCats[2].key}/:name`}>
                                <PlanetDetails data={selectedItem}></PlanetDetails>
                            </Route>
                            <Route exact path={`/${queryCats[3].key}/:name`}>
                                <StarshipDetails data={selectedItem}></StarshipDetails>
                            </Route>
                            <Route exact path={`/${queryCats[4].key}/:name`}>
                                <VehicleDetails data={selectedItem}></VehicleDetails>
                            </Route>
                        </>
                    ) : null}
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
