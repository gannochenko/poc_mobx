import React, { ComponentType } from 'react';

import { State } from './state';
import { Nullable } from '../../type';

type NullableState = Nullable<State>;

export type StatePropsType = {
    state: State;
};

export const StateContext = React.createContext<NullableState>(null);

export const StateProvider = StateContext.Provider;

export const withState = <P extends {}>(Component: ComponentType<P>) => {
    const WithState = (props: P) => (
        <StateContext.Consumer>
            {(value) => <Component {...props} state={value} />}
        </StateContext.Consumer>
    );

    WithState.displayName = `withState(${
        Component.displayName || Component.name || 'Component'
    })`;

    return WithState as ComponentType<P>;
};
