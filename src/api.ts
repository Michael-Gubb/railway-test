import useSWR, { mutate } from "swr";
import { Todo } from "./types";

const todoPath = "/api/todos";
const fetcher = url => fetch(url).then(r => r.json())
export const useTodos = () => useSWR<Todo[]>(todoPath,fetcher);

export const createTodo = async (text: string) => {
  mutate(
    todoPath,
    (todos:Todo[]) => [{ text,completed: false, id: "new-todo" }, ...todos],
    false,
  );
  await fetch(todoPath, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  mutate(todoPath);
};

export const toggleTodo = async (todo: Todo) => {
  mutate(
    todoPath,
    (todos:Todo[]) =>
      todos.map((t: Todo) =>
        t.id === todo.id ? { ...todo, completed: !t.completed } : t,
      ),
    false,
  );
  await fetch(`${todoPath}?todoId=${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !todo.completed }),
  });
  mutate(todoPath);
};

export const deleteTodo = async (id: string) => {
  mutate(todoPath, todos => todos.filter(t => t.id !== id), false);
  await fetch(`${todoPath}?todoId=${id}`, { method: "DELETE" });
  mutate(todoPath);
};
