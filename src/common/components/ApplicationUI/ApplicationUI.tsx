import React, { useEffect, FunctionComponent } from 'react';
import { inject, observer } from 'mobx-react';
// import { ConnectedRouter } from 'connected-react-router';
import { Route, Router, BrowserRouter, Switch, Link } from 'react-router-dom';
// import { Link } from '../Link';
import { connect } from 'react-redux';
import {
    withNotification,
    Notifications,
    //Route,
    //Switch,
} from '@gannochenko/ui';

import { ApplicationProperties, ApplicationPropertiesAlt } from './type';
import mapDispatchToProps from './dispatch';
import {
    useNetworkMonitor,
    useErrorNotification,
    useNetworkNotification,
} from '../../lib';

import { SHOW_OFFLINE, SHOW_ONLINE } from './reducer';
import { GlobalStyle } from '../../style';

import {
    HomePageRenderer,
    NotFoundPageRenderer,
    ForbiddenPageRenderer,
    Page2Renderer,
    CookiePolicyRenderer,
} from '../../pages';
import { ObjectLiteral } from '../../../type';
import { NotificationUI } from '../NotificationUI';
import { PageProgress } from '../PageProgress';

// @inject('routing')
// @observer
export class ApplicationUI extends React.Component {
    render() {
        // // @ts-ignore
        // const { location, push, goBack } = this.props.routing;
        // console.log(location);
        //
        // return (
        //     <div>
        //         <span>Current pathname: {location.pathname}</span>
        //         <button onClick={() => push('/test')}>Change url</button>
        //         <button onClick={() => goBack()}>Go Back</button>
        //     </div>
        // );

        return (
            <Switch>
                <Route exact path="/">
                    <span>Home <Link to="/fuck">To fuck</Link></span>
                </Route>
                <Route path="/fuck">
                    <span>Fuck <Link to="/">To home</Link></span>
                </Route>
            </Switch>
        );
    }
}

// const ApplicationUIComponent: FunctionComponent<ApplicationProperties> = ({
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
//
// export const ApplicationUI = withNotification<ApplicationPropertiesAlt>(ApplicationUIComponent);
