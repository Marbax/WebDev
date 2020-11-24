import Counter from './Counter';
import Currency from './Currency';
import CurrencyInfo from './CurrencyInfo';

import {Route, NavLink, BrowserRouter as Router} from 'react-router-dom'
import './App.css'


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="act" className="nav-link">Counter</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/currencies" activeClassName="act" className="nav-link">Currency</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container">
        <Route exact path="/" component={Counter}></Route>
        <Route exact path="/currencies" component={Currency}></Route>
        <Route exact path="/currency/:id" component={CurrencyInfo}></Route>
      </main>
    </Router>
  );
}

export default App;
