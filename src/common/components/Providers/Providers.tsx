import React, { FunctionComponent } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { EventEmitter } from 'events';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContext } from '@gannochenko/ui';

import { State } from '../../state/state';
import { StateProvider } from '../../state/context';
import { theme } from '../../style';

const emitter = new EventEmitter();
const state = new State();

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
