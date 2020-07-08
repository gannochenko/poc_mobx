import { NotificationContextPropsType } from '@gannochenko/ui';
import { StatePropsType } from '../../state/context';
import { PagePropsType } from '../type';

export type HomePagePropsType = NotificationContextPropsType &
    StatePropsType &
    PagePropsType;
