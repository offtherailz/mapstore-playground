import { TOGGLE_ACTIVATION, setStatus } from "../actions/monitor"
const Rx = require('rxjs');

import axios from 'axios';

export const checkOnline = (action$, store) => {
    return action$
        .ofType(TOGGLE_ACTIVATION)
        .filter(() => store.getState().monitor.active === true)
        .switchMap( () => {
            return Rx.Observable.timer(5000)
                .switchMap( () => Rx.Observable.defer(() => axios.get('version.txt')))
                .map(() => "online")
                .catch(() => Rx.Observable.of("offline"))
                .map( status => setStatus(status) );
        }).takeUntil( action$.ofType(TOGGLE_ACTIVATION));
};
