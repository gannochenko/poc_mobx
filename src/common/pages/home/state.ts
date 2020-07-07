// import { HomePageState } from '../home-old';
//
// export const initialState: HomePageState = {
//     loading: false,
//     ready: false,
//     error: null,
// };

import { action, observable } from 'mobx';
import { Nullable } from '../../../type';
import { ServiceManager } from '../../lib';

export class HomePageState {
    @observable ready = false;
    @observable loading = false;
    @observable error: Nullable<Error[]> = null;

    @action.bound
    reset() {
        this.ready = false;
        this.loading = false;
        this.error = null;
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
