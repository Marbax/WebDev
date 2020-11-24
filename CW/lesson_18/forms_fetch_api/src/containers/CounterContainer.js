import {connect} from 'react-redux'
import Counter from '../Counter'



function mapStateToProps(state) {
    return {
        count: state.count
    }
}


const CounterContainer = connect(mapStateToProps)(Counter)

export default CounterContainer