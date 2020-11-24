import { connect } from 'react-redux'
import SomeComp from '../SomeComp'


function mapStateToProps(state) {
    return {count: state.count}
}

const SomeCompContainer = connect(mapStateToProps)(SomeComp)

export default SomeCompContainer