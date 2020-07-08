import { NotificationContextPropsType } from '@gannochenko/ui';
import { StatePropsType } from '../state/context';

export type ApplicationProps = NotificationContextPropsType &
    StatePropsType & {
        offline: boolean;
    };
