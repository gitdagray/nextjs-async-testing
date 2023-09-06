import type { Todo } from "@/types/Todo"

export default async function updateTodo(todo: Todo): Promise<Todo> {

    const res = await fetch(`/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...todo, completed: !todo.completed
        })
    })

    if (!res.ok) throw Error('Failed to update todo')

    const updatedTodo = await res.json()

    return updatedTodo
}