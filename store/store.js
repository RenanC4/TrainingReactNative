import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {NavigationMiddleware} from '../actions/navigator';

import reducers from './../reducers'

export default createStore(reducers, applyMiddleware(NavigationMiddleware, thunk));