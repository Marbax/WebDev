import './App.css';
import Counter from './Counter';
import Info from './Info';
import SomeComp from './SomeComp';
import {createStore} from 'redux'
import counterReducer from './reducers/counterReducer';
import {Provider} from 'react-redux'
import CounterContainer from './containers/CounterContainer';
import SomeCompContainer from './containers/SomeCompContainer';



let store = createStore(counterReducer)


function App() {
  return (
    <>
      <Provider store={store}>
          <h1>Hello world</h1>
          <Info></Info>
          <CounterContainer></CounterContainer>
          <SomeCompContainer></SomeCompContainer>
      </Provider>
    </>
  );
}

export default App;
