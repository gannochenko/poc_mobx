import { observable, computed, configure, action } from 'mobx';
import { Nullable } from '../../type';
import { ServiceManager } from '../lib';
import { HomePageState } from '../pages/home';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

class ApplicationState {
    @observable ready = false;
    @observable loading = false;
    @observable error: Nullable<Error[]> = null;
    @observable offline: Nullable<boolean> = null;

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

        console.log(this.parent.serviceManager);

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
}

export class State {
    @observable public application = new ApplicationState(this);
    @observable public homePage = new HomePageState(this);

    constructor(public serviceManager: ServiceManager) {}

    @computed get loading() {
        return this.application.loading;
    }
}
