import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../state/actions';
import Cart from '../components/Cart';

const mapStateToProps = (state: any) => ({
    cart: state.cart
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);