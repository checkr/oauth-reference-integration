import {waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

class CandidatesPageObject {
  constructor(screen) {
    this.screen = screen
  }

  // Page state ******************************************************

  async pageErrors(error) {
    await waitFor(() => {
      expect(this.screen.getByText(error)).toBeInTheDocument()
    })
  }

  async initialLoad() {
    await waitFor(() => {
      expect(this.screen.getByTestId('loading')).toHaveAttribute(
        'aria-busy',
        'false',
      )
    })
  }

  // Validators ******************************************************

  validateElementLength(queryString, expectedLength) {
    expect(this.screen.getAllByTestId(queryString).length).toBe(expectedLength)
  }

  validateElementText(queryString, expectedText) {
    expect(this.screen.getByTestId(queryString)).toHaveTextContent(expectedText)
  }

  // Inputs **********************************************************

  inputEmail(email) {
    const emailField = this.screen.getByPlaceholderText('Enter email')
    userEvent.clear(emailField)
    userEvent.type(emailField, email)
  }

  inputName(name) {
    const nameField = this.screen.getByPlaceholderText('Enter name')
    userEvent.clear(nameField)
    userEvent.type(nameField, name)
  }

  inputPhoneNumber(phoneNumber) {
    const phoneField = this.screen.getByPlaceholderText('Enter phone')
    userEvent.clear(phoneField)
    userEvent.type(phoneField, phoneNumber)
  }

  inputNotes(notes) {
    const noteField = this.screen.getByPlaceholderText('Enter notes')
    userEvent.clear(noteField)
    userEvent.type(noteField, notes)
  }

  inputStep(step) {
    const stepField = this.screen.getByPlaceholderText('Enter step')
    userEvent.clear(stepField)
    userEvent.type(stepField, step)
  }

  // Button Interactions *********************************************

  clickCandidate(name) {
    // eslint-disable-next-line testing-library/no-node-access
    userEvent.click(this.screen.getByText(name).closest('button'))
  }

  clickEdit(id) {
    userEvent.click(this.screen.getByTestId(`edit-${id}`))
  }

  clickAdd() {
    userEvent.click(this.screen.getByTestId('add'))
  }

  clickSaveChanges() {
    userEvent.click(this.screen.getByText('Save Changes'))
  }

  clickSubmit() {
    userEvent.click(this.screen.getByText('Submit'))
  }
}

module.exports = {
  CandidatesPageObject,
}
