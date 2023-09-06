import type { Todo } from "@/types/Todo"

export default async function fetchTodos() {
    try {
        const res = await fetch("/todos")

        const todos: Todo[] = await res.json()

        return todos
    } catch (err) {
        if (err instanceof Error) console.log(err.message)
        return []
    }
}