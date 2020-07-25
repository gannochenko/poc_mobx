import { observable, computed, configure } from 'mobx';
import { Nullable, ObjectLiteral } from '../../type';
import { ServiceManager } from '../lib';
import { HomePageState } from '../pages/home';
import { SubState } from './type';
import { CookiePolicyPageState } from '../pages/cookie-policy/state';
import { ApplicationState } from '../Application/state';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

export class State {
    @observable public application = new ApplicationState(this);

    // page states
    @observable public homePage = new HomePageState(this);
    @observable public cookiePolicyPage = new CookiePolicyPageState(this);

    public serviceManager = new ServiceManager();

    private pageStatesIndex: Nullable<ObjectLiteral<SubState>> = null;

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
        if (!this.pageStatesIndex) {
            this.pageStatesIndex = {};

            Object.keys(this).forEach((key) => {
                if (key.endsWith('Page')) {
                    // @ts-ignore
                    this.pageStatesIndex![key] = (this[
                        key
                    ] as unknown) as SubState;
                }
            });
        }

        return this.pageStatesIndex;
    }
}
