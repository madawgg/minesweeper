import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom'

import '@testing-library/jest-dom'
import { test, expect } from '@jest/globals'

function getInfo() {
  const div = document.createElement('div')
  div.innerHTML = `
    <label for="username">Username</label>
    <input id="username" />
    <button>Print Username</button>
  `
  const button = div.querySelector('button')
  const input = div.querySelector('input')
  button.addEventListener('click', () => {
    setTimeout(() => {
      const printedUsernameContainer = document.createElement('div')
      printedUsernameContainer.innerHTML = `
        <div data-testid="printed-username">${input.value}</div>
      `
      div.appendChild(printedUsernameContainer)
    }, Math.floor(Math.random() * 200))
  })
  return div
}

test('examples of some things', async () => {
  const famousProgrammerInHistory = 'Ada Lovelace'
  const container = getInfo()

  const input = getByLabelText(container, 'Username')
  input.value = famousProgrammerInHistory

  getByText(container, 'Print Username').click()

  await waitFor(() =>
    expect(queryByTestId(container, 'printed-username')).toBeTruthy(),
  )

  expect(getByTestId(container, 'printed-username')).toHaveTextContent(
    famousProgrammerInHistory,
  )
  expect(container).toMatchSnapshot()
})