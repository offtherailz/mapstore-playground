/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const CONTROL_NAME = "OnlineMonitor_dialog";
import { connect } from 'react-redux';

import createSampleDialog from './utils/createSampleDialog';
const Dialog = createSampleDialog(CONTROL_NAME);
import { createPlugin } from '@mapstore/utils/PluginsUtils';
import { toggleActivation } from '../actions/monitor';

// HERE YOUR ROOT PLUGIN COMPONENT
const OnlineMonitor = ({ active, status, toggle = () => {} }) => (<Dialog floating title="Online Monitor">
    <div><b>Monitor: </b>{active ? "active" : "not active"}</div>
    <div><b>Status: </b>{status}</div>
    <button onClick={() => toggle()}>{active ? "deactivate" : "activate"}</button>
</Dialog>);

import { Glyphicon } from 'react-bootstrap';

// this is the empty reducer file to work with.
import reducer from '../reducers/monitor';

import {checkOnline} from '../epics/monitor';

// SAMPLE CONNECTIONS TO THE STATE
const ConnectedPlugin = connect(state => ({
    active: state.monitor.active,
    status: state.monitor.status
}), {
    toggle: toggleActivation
})(OnlineMonitor);


// control actions/reducer
// it's useful to store simple setting like open closed dialogs and so on here, in order
// to be reset on map load
import { toggleControl } from '@mapstore/actions/controls';

/**
 * OnlineMonitorPlugin. A dialog window that can be opened from the burger menu.
 * - Add epics...
 */
export default createPlugin("OnlineMonitor", {
    component: ConnectedPlugin,
    containers: {
        BurgerMenu: {
            name: 'about',
            position: 1500,
            text: "OnlineMonitor plugin",
            icon: <Glyphicon glyph="magnet" />,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1,
            doNotHide: true
        }
    },
    epics: {
        checkOnline
    },
    reducers: {
        monitor: reducer // REDUCER will be used to create the `OnlineMonitor` part of global redux state (keys of the "reducers" are pieces of state)
    }
});
