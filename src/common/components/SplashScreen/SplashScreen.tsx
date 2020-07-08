import React, { FunctionComponent, useEffect } from 'react';
import { observer } from 'mobx-react';

import { CustomWindow, SplashScreenPropsType } from './type';

declare const window: CustomWindow;

export const SplashScreen: FunctionComponent<SplashScreenPropsType> = observer(
    ({ state }) => {
        console.log(state.ready);
        console.log(state.loading);
        useEffect(() => {
            console.log('????');
            if (
                window.splash &&
                !window.splashProgressBarUnlocked &&
                state.ready
            ) {
                window.splash.dismiss();
                window.splashProgressBarUnlocked = true;
            }
        }, [window, state.ready]);

        return null;
    },
);
