enum State {
  START = "start",
  DONE = "done",
  CANSEL = "cansel",
  TOP_LIST = "toplist",
}

type Todo = {
  id: number;
  title: string;
  state: State;
};

type createTodoDTO = {
  title: string;
  state: State;
};

type ResponseMethod = {
  message: string;
};

interface ITodo {
  createTodo(todo: createTodoDTO): void;
  delete(id: number): void;
  getList(): void;
  getById(id: number): void;
}

abstract class TodoRepository implements ITodo {
  protected Todos: Todo[];
  constructor() {
    this.Todos = [];
  }
  public createTodo(todo: createTodoDTO): void {}
  public delete(id: number): void {}
  public getList(): void {}
  public getById(id: number): void {}
}

class TodoController extends TodoRepository {
  constructor() {
    super();
  }
  public createTodo(todo: createTodoDTO): ResponseMethod {
    const id = this.Todos.length + 1;
    const newTodo: Todo = {
      id,
      title: todo.title,
      state: todo.state,
    };
    this.Todos.push(newTodo);
    return { message: "created" };
  }
  public getList(): Todo[] {
    return this.Todos;
  }
  public getById(id: number): Todo | undefined | ResponseMethod {
    const todo = this.Todos.find((todo) => todo.id == id);
    if (todo) return todo;
    return { message: "not found todo!" };
  }
  public delete(id: number): void | ResponseMethod {
    const Todos = this.Todos.filter((todos) => todos.id !== id);
    this.Todos = Todos;
    return { message: `todo deleted id:${id}` };
  }
}

const todo = new TodoController();
console.log(todo.createTodo({ title: "Todo 1", state: State.DONE }));
console.log(todo.createTodo({ title: "Todo 2", state: State.START }));
console.log(todo.getList());
console.log(todo.getById(1));
console.log(todo.delete(1));
console.log(todo.getList());
