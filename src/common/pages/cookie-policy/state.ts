import { action, observable } from 'mobx';
import { Nullable } from '../../../type';
import { State } from '../../mobx/state';
import { SubState } from '../../mobx/type';

export class CookiePolicyPageState implements SubState {
    @observable ready = true;
    @observable loading = false;
    @observable error: Nullable<Error[]> = null;

    constructor(private parent: State) {}

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
        this.error = null;
    }
}
