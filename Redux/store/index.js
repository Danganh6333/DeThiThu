import {configureStore} from '@reduxjs/toolkit'
import XeMayReducer from '../reducers/XeMayReducer'

export default configureStore({
    reducer:{
        listXeMay:XeMayReducer
    }
})