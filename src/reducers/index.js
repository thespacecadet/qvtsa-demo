/**
 * Created by spacecadet on 07.09.18.
 */
//this reducer is no longer used in the program. left here in order to show basic understanding of redux
const initialState = {tag1: '', tag2: '', tag3:''};

function myReducer(state = initialState,action) {
    switch (action.type) {
        case 'ADD_TO_TAG':
            return Object.assign({},state, {
                    tag2: action.payload
            });
        default:
            return state
    }
}


export default myReducer
