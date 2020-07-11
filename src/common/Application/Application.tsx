import React, { useEffect, FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import {
    Notifications,
    Route,
    Switch,
    useNotification,
    useNotificationEventEmitter,
} from '@gannochenko/ui';

import { ApplicationProps } from './type';
import {
    useNetworkMonitor,
    useErrorNotification,
    useNetworkNotification,
} from '../lib';
import { GlobalStyle } from '../style';

import {
    HomePageRenderer,
    NotFoundPageRenderer,
    ForbiddenPageRenderer,
    CookiePolicyRenderer,
} from '../pages';

import { NotificationUI, PageProgress } from '../components';
import { StatePropsType, useGlobalState } from '../state/context';
import { SplashScreen } from '../components/SplashScreen';

const Routes = observer(({ state: { application } }: StatePropsType) => {
    if (!application.ready) {
        return null;
    }

    return (
        <Switch>
            <Route exact path="/" renderer={HomePageRenderer} />
            <Route path="/cookie-policy" renderer={CookiePolicyRenderer} />
            <Route path="/403" renderer={ForbiddenPageRenderer} />
            <Route renderer={NotFoundPageRenderer} />
        </Switch>
    );
});

const Notifier = observer(
    ({ notify, state: { application } }: StatePropsType) => {
        useNetworkNotification(application.offline, notify);
        useErrorNotification(application.error, notify);

        return null;
    },
);

export const Application: FunctionComponent<ApplicationProps> = () => {
    const state = useGlobalState()!;
    const notificationEventEmitter = useNotificationEventEmitter()!;
    const notify = useNotification();
    const { application } = state;

    useEffect(() => {
        application.startLoading();
    }, [application]);
    useNetworkMonitor(state);

    return (
        <>
            <GlobalStyle />
            <Notifications emitter={notificationEventEmitter}>
                {(notificationProps) => (
                    <NotificationUI {...notificationProps} />
                )}
            </Notifications>
            <Notifier notify={notify} state={state} />
            <PageProgress state={state} />
            <SplashScreen state={state} />
            <Routes state={state} />
        </>
    );
};
