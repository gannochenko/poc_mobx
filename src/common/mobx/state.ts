import { observable, computed } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

class Application {
    @observable ready = false;
}

class HomeState {

}

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

export const stores = {
    application: new Application(),
    home: new HomeState(),
    state: new State(),
};
