import { observable, computed, configure, action } from 'mobx';
import { Nullable, ObjectLiteral } from '../../type';
import { ServiceManager } from '../lib';
import { HomePageState } from '../pages/home';
import { SubState } from './type';
import { CookiePolicyPageState } from '../pages/cookie-policy/state';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

class ApplicationState implements SubState {
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

export class State {
    @observable public application = new ApplicationState(this);
    @observable public homePage = new HomePageState(this);
    @observable public cookiePolicyPage = new CookiePolicyPageState(this);

    public serviceManager = new ServiceManager();

    private pageStates: Nullable<ObjectLiteral<SubState>> = null;

    @computed get loading(): boolean {
        if (this.application.loading) {
            return true;
        }

        return !!Object.values(this.getPageStates()).find(
            (state) => state.loading,
        );
    }

    @computed get ready(): boolean {
        if (!this.application.ready || !this.application.pageName) {
            return false;
        }

        const stateName = `${this.application.pageName}Page`;
        if (!(stateName in this)) {
            return true;
        }

        // @ts-ignore
        return (this[stateName] as State).ready;
    }

    private getPageStates() {
        if (!this.pageStates) {
            this.pageStates = {};

            Object.keys(this).forEach((key) => {
                if (key.endsWith('Page')) {
                    // @ts-ignore
                    this.pageStates![key] = (this[key] as unknown) as SubState;
                }
            });
        }

        return this.pageStates;
    }
}
