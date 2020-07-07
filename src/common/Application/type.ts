import { NotificationContextPropsType } from '@gannochenko/ui';
import { StatePropsType } from '../mobx/context';

export type ApplicationProps = NotificationContextPropsType &
    StatePropsType & {
        offline: boolean;
    };
