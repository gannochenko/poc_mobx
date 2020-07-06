import { observable, computed, configure, action } from 'mobx';
import { Nullable } from '../../type';
import { ServiceManager } from '../lib';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

class Application {
    @observable ready = false;
    @observable loading = false;
    @observable error: Nullable<Error> = null;
    @observable offline = false;

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
        this.error = null;
        this.offline = false;
    }

    @action.bound
    async startLoading(serviceManager: ServiceManager) {
        this.loading = true;
        this.error = null;
        this.ready = false;

        // await new Promise((resolve) => {
        //    setTimeout(resolve,1000);
        // });

        // do stuff here
        this.finishLoading();
    }

    @action.bound
    finishLoading(error?: Error) {
        this.loading = false;

        if (error) {
            this.error = error;
        }

        this.ready = true;
    }
}

export class State {
    @observable public application = new Application();

    @computed get loading() {
        return this.application.loading;
    }
}
