import React, { ComponentType, FunctionComponent } from 'react';
import { Subtract } from 'utility-types';

import { State } from './state';
import { Nullable } from '../../type';

type NullableState = Nullable<State>;

export type StatePropsType = {
    state: State;
};

export const StateContext = React.createContext<NullableState>(null);

export const StateProvider = StateContext.Provider;

export const withState = <P extends StatePropsType>(
    Component: ComponentType<P>,
) => {
    const WithState: FunctionComponent<Subtract<P, StatePropsType>> = (
        props,
    ) => (
        <StateContext.Consumer>
            {(value) =>
                React.createElement(Component, { ...props, state: value })
            }
        </StateContext.Consumer>
    );

    WithState.displayName = `withState(${
        Component.displayName || Component.name || 'Component'
    })`;

    return WithState;
};
