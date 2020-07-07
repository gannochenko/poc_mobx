import React, { FunctionComponent } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { EventEmitter } from 'events';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContext } from '@gannochenko/ui';

import { State } from '../../mobx/state';
import { StateProvider } from '../../mobx/context';
import { ServiceManager } from '../../lib';
import { theme } from '../../style';

const serviceManager = new ServiceManager();
const emitter = new EventEmitter();
const state = new State(serviceManager);

export const Providers: FunctionComponent = ({ children }) => (
    <StateProvider value={state}>
        <NotificationContext.Provider value={emitter}>
            <MUIThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>{children}</BrowserRouter>
                </ThemeProvider>
            </MUIThemeProvider>
        </NotificationContext.Provider>
    </StateProvider>
);
