import { NotificationContextPropsType } from '@gannochenko/ui';
import { ServiceManager } from '../lib';
import { StatePropsType } from '../mobx/context';

export type ApplicationProps = {} & NotificationContextPropsType &
    StatePropsType & {
        offline: boolean;
        serviceManager: ServiceManager;
    };
