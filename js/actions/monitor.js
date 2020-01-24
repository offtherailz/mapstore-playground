export const TOGGLE_ACTIVATION = "ONLINE_MONITOR:TOGGLE_ACTIVATION";
export const toggleActivation = () => ({type: TOGGLE_ACTIVATION});

export const SET_STATUS = "ONLINE_MONITOR:SET_STATUS";
export const setStatus = (status) => ({ type: SET_STATUS, status });
