import React, { FunctionComponent } from 'react';
import { Provider as StoreProvider } from 'mobx-react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { EventEmitter } from 'events';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContext } from '@gannochenko/ui';

import { stores } from '../../mobx/state';
import { ServiceManager, ServiceManagerContext } from '../../lib';
import { theme } from '../../style';

const serviceManager = new ServiceManager();
const emitter = new EventEmitter();

export const Providers: FunctionComponent = ({ children }) => (
    <ServiceManagerContext.Provider value={serviceManager}>
        <StoreProvider {...stores}>
            <NotificationContext.Provider value={emitter}>
                <MUIThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </ThemeProvider>
                </MUIThemeProvider>
            </NotificationContext.Provider>
        </StoreProvider>
    </ServiceManagerContext.Provider>
);
