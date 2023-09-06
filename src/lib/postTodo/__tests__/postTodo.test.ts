import postTodo from "../postTodo"
import { server } from "@/mocks/server"
import { rest } from "msw"

describe('postTodo lib function', () => {

    it('should return the posted todo item', async () => {
        const postedTodo = await postTodo('write tests')
        expect(postedTodo).toEqual({
            userId: 1, title: 'write tests', completed: false, id: 5
        })
    })

    it('should fail with an error', async () => {
        server.use(
            rest.post('/todos', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        expect.assertions(1)
        try {
            await postTodo('write tests')
        } catch (e) {
            if (e instanceof Error) {
                expect(e.message).toEqual('Failed to post new todo')
            }
        }
    })

})