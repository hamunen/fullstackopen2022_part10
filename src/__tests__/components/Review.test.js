import { ReviewFormContainer } from '../../components/Review'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit when valid values', async () => {
      const onSubmit = jest.fn()
      const error = ''
      render(<ReviewFormContainer onSubmit={onSubmit} error={error} />)

      fireEvent.changeText(
        screen.getByPlaceholderText('Repository owner name'),
        'owner'
      )
      fireEvent.changeText(
        screen.getByPlaceholderText('Repository name'),
        'name'
      )
      fireEvent.changeText(
        screen.getByPlaceholderText('Rating between 0 and 100'),
        '12'
      )

      fireEvent.press(screen.getByText('Create a review'))

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    }),
      it('doesnt call onSubmit when invalid params', async () => {
        const onSubmit = jest.fn()
        render(<ReviewFormContainer onSubmit={onSubmit} />)

        fireEvent.changeText(
          screen.getByPlaceholderText('Repository owner name'),
          'owner'
        )

        fireEvent.press(screen.getByText('Create a review'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
      })
  })
})
