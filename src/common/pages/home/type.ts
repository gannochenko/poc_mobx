import { NotificationContextPropsType } from '@gannochenko/ui';
import { StatePropsType } from '../../mobx/context';
import { PagePropsType } from '../type';

export type HomePagePropsType = NotificationContextPropsType &
    StatePropsType &
    PagePropsType;
