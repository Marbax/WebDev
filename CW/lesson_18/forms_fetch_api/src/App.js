import './App.css';
import Counter from './Counter';
import Info from './Info';
import SomeComp from './SomeComp';
import {createStore} from 'redux'
import counterReducer from './reducers/counterReducer';
import {Provider} from 'react-redux'
import CounterContainer from './containers/CounterContainer';
import SomeCompContainer from './containers/SomeCompContainer';
import FormsExample from './FormsExample'
import Products from './Products';



let store = createStore(counterReducer)


function App() {
  return (
    <Products></Products>
  );
}

export default App;
