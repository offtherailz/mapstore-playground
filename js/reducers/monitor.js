import { TOGGLE_ACTIVATION, SET_STATUS} from '../actions/monitor';

export default (state = { active: false, status: undefined }, action) => {
    switch (action.type) {
    case TOGGLE_ACTIVATION:
        return {
            ...state,
            active: !state.active
        };
    case SET_STATUS:
        return {
            ...state,
            status: action.status
        };

    default:
        break;
    }
    return state;
};
