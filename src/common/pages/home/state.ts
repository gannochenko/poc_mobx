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
    reset(): void {
        this.ready = false;
        this.loading = false;
        this.error = null;
    }

    @action.bound
    async startLoading(...args: unknown[]): Promise<void> {
        this.loading = true;
        this.error = null;
        this.ready = false;

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });

        this.finishLoading();
    }

    @action.bound
    finishLoading(error?: Error[] | Error): void {
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
