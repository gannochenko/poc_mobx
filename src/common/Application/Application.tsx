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

export const Routes = observer(({ state: { application } }: StatePropsType) => {
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

export const ApplicationRoot: FunctionComponent<ApplicationProps> = (props) => {
    const { serviceManager, notificationsEventEmitter, state } = props;
    const { application } = state;

    useEffect(() => {
        application.startLoading(serviceManager);
    }, [serviceManager, application]);

    // useNetworkMonitor(dispatch, SHOW_ONLINE, SHOW_OFFLINE);
    // useErrorNotification(error, notify);
    // useNetworkNotification(offline, notify);

    return (
        <>
            <GlobalStyle />
            <Notifications emitter={notificationsEventEmitter}>
                {(notificationProps) => (
                    <NotificationUI {...notificationProps} />
                )}
            </Notifications>
            <PageProgress state={state} />
            <Routes state={state} />
        </>
    );
};

// const ApplicationUIComponent: FunctionComponent<ApplicationProps> = ({
//     ready = false,
//     serviceManager,
//     history,
//     error = null,
//     notify = () => {},
//     notificationsEventEmitter,
//     offline = false,
//     dispatch = () => {},
//     dispatchLoad = () => {},
//     state,
// }) => {
//     console.log('state');
//     console.log(state);
//
//     // useEffect(() => {
//     //     dispatchLoad(serviceManager);
//     // }, [serviceManager, dispatchLoad]);
//     //
//     // useNetworkMonitor(dispatch, SHOW_ONLINE, SHOW_OFFLINE);
//     // useErrorNotification(error, notify);
//     // useNetworkNotification(offline, notify);
//
//     return (
//         <>
//             <GlobalStyle />
//             <Notifications emitter={notificationsEventEmitter}>
//                 {(props) => <NotificationUI {...props} />}
//             </Notifications>
//             <PageProgress />
//             {ready && (
//                 <Router history={history}>
//                     <Switch>
//                         <Route exact path="/" renderer={HomePageRenderer} />
//                         {/*<Route exact path="/page2" renderer={Page2Renderer} />*/}
//                         {/*<Route*/}
//                         {/*    exact*/}
//                         {/*    path="/cookie-policy"*/}
//                         {/*    renderer={CookiePolicyRenderer}*/}
//                         {/*/>*/}
//                         {/*<Route path="/403" renderer={ForbiddenPageRenderer} />*/}
//                         {/*<Route renderer={NotFoundPageRenderer} />*/}
//                     </Switch>
//                 </Router>
//             )}
//         </>
//     );
// };

export const Application = withServiceManager(
    withNotification<ApplicationProps>(withState(ApplicationRoot)),
);
