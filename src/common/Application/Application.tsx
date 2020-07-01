import React, { useEffect, FunctionComponent } from 'react';
import { inject, observer } from 'mobx-react';
import {
    withNotification,
    Notifications,
    Route,
    Switch,
} from '@gannochenko/ui';

import { ApplicationProps, ApplicationPropsOwn } from './type';
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
import { withState } from '../mobx/context';

// const initialState: ApplicationState = {
//     loading: false,
//     ready: false,
//     error: null,
//     offline: null,
// };

const Name = observer((props: any) => {
    // @ts-ignore
    return <span style={{marginTop: '5rem'}}>{props.state.application.name}</span>
});

export const ApplicationRoot: FunctionComponent<ApplicationProps> = (props) => {
    // useEffect(() => {
    //     dispatchLoad(serviceManager);
    // }, [serviceManager, dispatchLoad]);
    //
    // useNetworkMonitor(dispatch, SHOW_ONLINE, SHOW_OFFLINE);
    // useErrorNotification(error, notify);
    // useNetworkNotification(offline, notify);

    const { notificationsEventEmitter } = props;
    console.log('props');
    console.log(props);

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            props.state.application.setName();
        }, 5000);
    }, []);

    console.log('render!');
    
    return (
        <>
            <GlobalStyle />
            <Notifications emitter={notificationsEventEmitter}>
                {(propss) => <NotificationUI {...propss} />}
            </Notifications>
            <Name
                // @ts-ignore
                state={props.state}
            />
            <Switch>
                <Route exact path="/" renderer={HomePageRenderer} />
                <Route renderer={NotFoundPageRenderer} />
            </Switch>
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
