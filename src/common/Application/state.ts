import { action, observable } from 'mobx';
import { SubState } from '../state/type';
import { Nullable } from '../../type';
import { State } from '../state/state';

export class ApplicationState implements SubState {
    @observable ready = false;
    @observable loading = false;
    @observable error: Nullable<Error[]> = null;
    @observable offline: Nullable<boolean> = null;
    @observable pageName: Nullable<string> = null;

    constructor(private parent: State) {}

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
        this.error = null;
        this.offline = false;
    }

    @action.bound
    async startLoading() {
        this.loading = true;
        this.error = null;
        this.ready = false;

        // console.log(this.parent.serviceManager);

        // await new Promise((resolve) => {
        //    setTimeout(resolve,1000);
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

    @action.bound
    setOfflineStatus(offline: boolean) {
        this.offline = offline;
    }

    @action.bound
    setPageName(pageName: string) {
        this.pageName = pageName;
    }
}
