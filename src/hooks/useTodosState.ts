import { useState } from "react";
import { FilterValue, Todo } from "../types.ts";

export const useTodosState = (initialTodos?: Array<Todo>): {
    activeCount: number
    completedCount: number
    todos: Array<Todo>
    filterSelected: FilterValue
    handleClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
    handleDeleteTodo: (id: Todo["id"]) => void
    handleSave: (title: Todo["title"]) => void
    handleTodoCompleted: (id: Todo["id"], completed: Todo["completed"]) => void
    handleChangeTodoTitle: (id: Todo["id"], title: Todo["title"]) => void
} => {
    const [todos, setTodos] = useState(initialTodos ?? []);
    const [filterSelected, setFilterSelected] = useState<FilterValue>("all");

    let activeCount = todos.filter(todo => !todo.completed).length;
    let completedCount = todos.length - activeCount;

    return {
        activeCount: activeCount,
        completedCount: completedCount,
        todos: todos,
        filterSelected: filterSelected,
        handleClearCompleted: () => {
            setTodos(todos.filter(todo => !todo.completed));
        },
        handleFilterChange: filter => {
            setFilterSelected(filter);
        },
        handleDeleteTodo: id => {
            setTodos(todos.filter(todo => todo.id !== id));
        },
        handleSave: title => {
            setTodos([...todos, {id: crypto.randomUUID(), title, completed: false}]);
        },
        handleTodoCompleted: (id, completed) => {
            setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, completed}));
        },
        handleChangeTodoTitle: (id, title) => {
            setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, title}));
        },
    };
};
