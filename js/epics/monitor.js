import { TOGGLE_ACTIVATION, setStatus } from "../actions/monitor"
const Rx = require('rxjs');

import axios from 'axios';

export const checkOnline = (action$, store) => {
    return action$
        .ofType(TOGGLE_ACTIVATION)
        .switchMap( () => {
            return Rx.Observable.interval(2000)
                .filter(() => store.getState().monitor.active === true)
                .switchMap( () => Rx.Observable.defer(() => axios.get('version.txt'))
                    .map(() => "online")
                    .catch(() => Rx.Observable.of("offline"))
                    .map( status => setStatus(status) )

                );
        });
};
