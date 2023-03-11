import { SignInContainer } from '../../components/SignIn'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit', async () => {
      const onSubmit = jest.fn()
      render(<SignInContainer onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'user')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'pw')
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    }),
      it('calls onSubmit with correct parameters', async () => {
        const onSubmit = jest.fn()
        render(<SignInContainer onSubmit={onSubmit} />)

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'user')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'pw')
        fireEvent.press(screen.getByText('Sign in'))

        await waitFor(() =>
          expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'user',
            password: 'pw',
          })
        )
      })
  })
})
