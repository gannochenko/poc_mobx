import { action, observable } from 'mobx';
import { Nullable } from '../../../type';
import { State } from '../../state/state';
import { SubState } from '../../state/type';

export class HomePageState implements SubState {
    @observable ready = false;
    @observable loading = false;
    @observable error: Nullable<Error[]> = null;

    constructor(private parent: State) {}

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
        this.error = null;
    }

    @action.bound
    async startLoading() {
        this.loading = true;
        this.error = null;
        this.ready = false;

        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // });

        this.finishLoading();
    }

    @action.bound
    finishLoading(error?: Error[] | Error) {
        this.loading = false;

        if (error) {
            if (!Array.isArray(error)) {
                this.error = [error];
            } else {
                this.error = error;
            }
        }

        this.ready = true;
    }
}
