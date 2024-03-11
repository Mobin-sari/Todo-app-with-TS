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
  protected static self: any;
  protected static latestID: number;

  constructor() {
    this.Todos = [];
  }
  public createTodo(todo: createTodoDTO): void {}
  public delete(id: number): void {}
  public getList(): void {}
  public getById(id: number): void {}
}

class TodoController extends TodoRepository {
  protected static self: any;
  protected _latestID: number = 0;
  constructor() {
    super();
    TodoController.self = this;
    this._latestID = this.Todos.length;
  }
  public createTodo(todo: createTodoDTO): ResponseMethod {
    const id = this.Todos.length + 1;
    const newTodo: Todo = {
      id,
      title: todo.title,
      state: todo.state,
    };
    this.Todos.push(newTodo);
    this._latestID = id;
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
  get lastestID(): number {
    if (this._latestID) return this._latestID;
    else return 0;
  }
  set lastestID(value: number) {
    if (typeof value === "number" && value > this.Todos.length)
      this._latestID = value;
    else console.log("the value is invalid");
  }
  public static countOfTodos(): number {
    return TodoController.self.Todos.length;
  }
}

const todo = new TodoController();
console.log(todo.createTodo({ title: "Todo 1", state: State.DONE }));
console.log(todo.createTodo({ title: "Todo 2", state: State.START }));
console.log(todo.createTodo({ title: "Todo 3", state: State.START }));
// console.log(todo.getList());
// console.log(todo.getById(1));
console.log(todo.delete(1));
// console.log(todo.getList());
console.log(todo.lastestID);
