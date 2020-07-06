import { HTMLAttributes } from 'react';
import { StatePropsType } from '../../mobx/context';

export type PageProgressPropsType = {} & StatePropsType &
    HTMLAttributes<HTMLElement>;
