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
    withServiceManager,
    useNetworkMonitor,
    useErrorNotification,
    useNetworkNotification,
} from '../lib';
import { GlobalStyle } from '../style';

import {
    // HomePageRenderer,
    NotFoundPageRenderer,
    ForbiddenPageRenderer,
    Page2Renderer,
    CookiePolicyRenderer,
} from '../pages';

import { HomePageRenderer } from '../pages/home/Home';

import { NotificationUI, PageProgress } from '../components';
import { StatePropsType, withState } from '../mobx/context';

const Routes = observer(({ state: { application } }: StatePropsType) => {
    if (!application.ready) {
        return null;
    }

    return (
        <Switch>
            <Route exact path="/" renderer={HomePageRenderer} />
            {/*<Route exact path="/page2" renderer={Page2Renderer} />*/}
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/cookie-policy"*/}
            {/*    renderer={CookiePolicyRenderer}*/}
            {/*/>*/}
            {/*<Route path="/403" renderer={ForbiddenPageRenderer} />*/}
            <Route renderer={NotFoundPageRenderer} />
        </Switch>
    );
});

const OfflineNotifier = observer(
    ({
        notify,
        state: { application },
    }: StatePropsType & Pick<ApplicationProps, 'notify'>) => {
        useNetworkNotification(application.offline, notify);

        return null;
    },
);

export const ApplicationRoot: FunctionComponent<ApplicationProps> = (props) => {
    const { serviceManager, notificationsEventEmitter, notify, state } = props;
    const { application } = state;

    useEffect(() => {
        application.startLoading(serviceManager);
    }, [serviceManager, application]);

    useNetworkMonitor(state);
    // useErrorNotification(error, notify);

    return (
        <>
            <GlobalStyle />
            <Notifications emitter={notificationsEventEmitter}>
                {(notificationProps) => (
                    <NotificationUI {...notificationProps} />
                )}
            </Notifications>
            <OfflineNotifier notify={notify} state={state} />
            <PageProgress state={state} />
            <Routes state={state} />
        </>
    );
};

export const Application = withServiceManager(
    withNotification<ApplicationProps>(withState(ApplicationRoot)),
);
