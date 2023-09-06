import { rest } from 'msw'

export const handlers = [
    rest.get('/todos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "userId": 1,
                    "title": "Wave hello! 👋",
                    "completed": false,
                    "id": 1
                },
                {
                    "userId": 1,
                    "title": "Get Coffee ☕☕☕",
                    "completed": false,
                    "id": 2
                },
                {
                    "userId": 1,
                    "title": "Go to Work ⚒",
                    "completed": false,
                    "id": 3
                },
                {
                    "userId": 1,
                    "title": "Write Code 💻",
                    "completed": false,
                    "id": 4,
                }
            ]),
        )
    }),
    rest.post('/todos', async (req, res, ctx) => {
        const { title } = await req.json()

        return res(
            ctx.status(201),
            ctx.json(
                {
                    "userId": 1,
                    "title": title,
                    "completed": false,
                    "id": 5
                }),
        )
    }),
    rest.put('/todos/:id', async (req, res, ctx) => {
        const { id, userId, title, completed } = await req.json()

        return res(
            ctx.status(200),
            ctx.json(
                {
                    userId,
                    title,
                    completed,
                    id
                }),
        )
    }),
    rest.delete('/todos/:id', (req, res, ctx) => {
        const { id } = req.params

        return res(
            ctx.status(200),
            ctx.json(
                {
                    id: Number(id)
                }),
        )
    }),
]