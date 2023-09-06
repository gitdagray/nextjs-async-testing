import deleteTodo from "../deleteTodo"
import { server } from "@/mocks/server"
import { rest } from "msw"

const mockTodo = {
    "userId": 1,
    "title": "Wave hello! 👋",
    "completed": false,
    "id": 1
}

describe('deleteTodo lib function', () => {

    it('should return the deleted todo id', async () => {
        const deletedTodo = await deleteTodo(mockTodo)
        expect(deletedTodo).toEqual({
            id: 1
        })
    })

    it('should fail with an error', async () => {
        server.use(
            rest.delete('/todos/1', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        expect.assertions(1)
        try {
            await deleteTodo(mockTodo)
        } catch (e) {
            if (e instanceof Error) {
                expect(e.message).toEqual('Failed to delete todo')
            }
        }
    })

})