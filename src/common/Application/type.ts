import { NotificationContextPropsType } from '@gannochenko/ui';
import { ServiceManager } from '../lib';

export type ApplicationPropsOwn = {};

export type ApplicationProps = ApplicationPropsOwn &
    NotificationContextPropsType &
    {
        offline: boolean;
        serviceManager: ServiceManager;
    };
