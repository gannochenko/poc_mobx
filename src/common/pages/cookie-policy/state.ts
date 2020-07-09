import { action, observable } from 'mobx';
import { State } from '../../state/state';
import { SubState } from '../../state/type';

export class CookiePolicyPageState implements SubState {
    @observable ready = true;
    @observable loading = false;

    constructor(private parent: State) {}

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
    }
}
