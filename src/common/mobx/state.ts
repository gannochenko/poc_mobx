import { observable, computed } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

class Todo {
    id = Math.random()
    @observable title = ""
    @observable finished = false
}

class State {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        // @ts-ignore
        return this.todos.filter(todo => !todo.finished).length
    }
};

const routingStore = new RouterStore();

export const stores = {
    state: new State(),
    routing: routingStore,
};
