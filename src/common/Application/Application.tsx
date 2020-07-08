import React, { useEffect, FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import {
    withNotification,
    Notifications,
    Route,
    Switch,
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
import { StatePropsType, withState } from '../state/context';
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
    ({
        notify,
        state: { application },
    }: StatePropsType & Pick<ApplicationProps, 'notify'>) => {
        useNetworkNotification(application.offline, notify);
        useErrorNotification(application.error, notify);

        return null;
    },
);

export const ApplicationRoot: FunctionComponent<ApplicationProps> = (props) => {
    const { notificationsEventEmitter, notify, state } = props;
    const { application } = state;

    useEffect(() => {
        application.startLoading();
    }, [application]);
    useNetworkMonitor(state);

    return (
        <>
            <GlobalStyle />
            <Notifications emitter={notificationsEventEmitter}>
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

export const Application = withNotification(withState(ApplicationRoot));
