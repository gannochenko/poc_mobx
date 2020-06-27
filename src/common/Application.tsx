import React, { FunctionComponent } from 'react';
// import { Provider } from 'react-redux';
import { Provider } from 'mobx-react';
import { EventEmitter } from 'events';
import { NotificationContext } from '@gannochenko/ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';

import { ApplicationUI } from './components';
import {
    ServiceManager,
    ServiceManagerContext,
    createHistory,
    dismissOnReady,
} from './lib';
// import { createStore } from './store';
import { theme } from './style';
import { stores } from './mobx/state';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routing);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const { store, saga, unsubscribe } = createStore({
//     history,
//     onChange: dismissOnReady,
// });
const serviceManager = new ServiceManager();
const emitter = new EventEmitter();

// @ts-ignore
export const Application: FunctionComponent = () => {
    return (
            <BrowserRouter>
                <ApplicationUI />
            </BrowserRouter>
    );
};
