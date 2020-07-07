import { History } from 'history';
import { Store } from 'redux';
import { ServiceManager } from '../lib';
import { Nullable, ObjectLiteral } from '../../type';

type Error = {
    code: string;
    message: string;
};

export type StoreParameters = {
    history: History<any>;
    onChange: (parameters: { store: Store; unsubscribe: () => void }) => void;
};

export type PageState = {
    loading: boolean;
    ready: boolean;
    error: Nullable<Error[]>;
};

export type Action<P = ObjectLiteral> = {
    type: string;
    payload: P;
};

export type LoadAction = Action<Partial<{ serviceManager: ServiceManager }>>;

export type ControllerProperties = PageState & {
    offline: boolean;
    serviceManager: ServiceManager;
    dispatch?: (action: Action) => void;
    dispatchLoad?: DispatchLoad;
    dispatchUnload?: DispatchUnload;
};

export type Dispatch = (action: Action) => void;

export type DispatchLoad = (
    serviceManager?: ServiceManager,
    parameters?: ObjectLiteral,
) => void;

export type DispatchUnload = () => void;
