import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'
import { server } from '@/mocks/server'
import { rest } from 'msw'

describe('Home', () => {

    it('should add a new todo', async () => {
        render(<Home />) // ARRANGE

        // ACT
        const input = screen.getByPlaceholderText('New Todo')
        await userEvent.type(input, 'My new todo')
        expect(input).toHaveValue('My new todo') // ASSERT

        // ACT
        const button = screen.getByRole('button', {
            name: 'Submit'
        })
        await userEvent.click(button)
        waitFor(() => {
            expect(input).toHaveValue("") // ASSERT 
        })

        const data = await screen.findByText('My new todo')
        expect(data).toHaveTextContent('My new todo')
    })

    it('should not add a new todo if the request fails', async () => {
        server.use(
            rest.post('/todos', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        render(<Home />) // ARRANGE

        // ACT
        const input = screen.getByPlaceholderText('New Todo')
        await userEvent.type(input, 'My new todo')
        expect(input).toHaveValue('My new todo') // ASSERT

        // ACT
        const button = screen.getByRole('button', {
            name: 'Submit'
        })
        await userEvent.click(button)
        waitFor(() => {
            expect(input).toHaveValue("") // ASSERT 
        })

        const data = await screen.queryByText('My new todo')
        expect(data).not.toBeInTheDocument()
    })

    it('should update a todo', async () => {
        render(<Home />) // ARRANGE

        // ACT
        const checkboxArray = await screen.findAllByRole('checkbox') as HTMLInputElement[]
        const checkbox = checkboxArray[0]
        expect(checkbox.checked).toBeFalsy()
        await userEvent.click(checkbox)
        waitFor(() => {
            expect(checkbox.checked).toBeTruthy() // ASSERT 
        })
    })

    it('should not update a todo if the request fails', async () => {
        server.use(
            rest.put('/todos/:id', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        render(<Home />) // ARRANGE

        // ACT
        const checkboxArray = await screen.findAllByRole('checkbox') as HTMLInputElement[]
        const checkbox = checkboxArray[0]
        expect(checkbox.checked).toBeFalsy() // ASSERT 

        await userEvent.click(checkbox) // ACT

        expect(checkbox.checked).toBeFalsy() // ASSERT 

    })

    it('should delete a todo', async () => {
        render(<Home />) // ARRANGE

        const todoText = await screen.findByText('Write Code 💻')
        expect(todoText).toBeInTheDocument() // ASSERT 

        // ACT
        const buttons = await screen.findAllByTestId('delete-button')
        const button = buttons[0]
        await userEvent.click(button)

        expect(todoText).not.toBeInTheDocument() // ASSERT 

    })

    it('should not delete a todo if the request fails', async () => {
        server.use(
            rest.delete('/todos/:id', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        render(<Home />) // ARRANGE

        // ACT
        const buttons = await screen.findAllByTestId('delete-button')
        const button = buttons[0]
        await userEvent.click(button)

        const todoText = screen.queryByText('Write Code 💻')
        expect(todoText).toBeInTheDocument() // ASSERT 

    })

})