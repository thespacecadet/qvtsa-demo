/**
 * Created by spacecadet on 07.09.18.
 */
import { createStore} from 'redux'

import initialState from './reducers/index.js'
import {combineForms,createForms} from 'react-redux-form'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(combineForms({
    tags: initialState,
    ...createForms({
        tags: initialState,
    }),
}),composeWithDevTools());


export default store;
