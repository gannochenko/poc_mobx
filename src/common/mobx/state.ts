import { observable, computed, configure, action } from 'mobx';

configure({ enforceActions: "observed", computedRequiresReaction: true });

class Application {
    @observable ready = false;
    @observable name = 'Foo';

    @action.bound
    setName() {
        this.name = 'Bar';
    }
}

export class State {
    @observable public application = new Application();
}
