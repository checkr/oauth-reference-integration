import React from 'react'
import {Button, Form, Modal} from 'react-bootstrap'

const formFields = {
  email: 'Email Address',
  name: 'Name',
  phone: 'Phone Number',
  notes: 'Notes',
  step: 'Step',
}

export default function CandidateModal({
  candidate,
  isOpen,
  handleClose,
  handleSave,
  onChange,
}) {
  return (
    <Modal
      show={isOpen}
      onHide={() => handleClose()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {candidate.id ? 'Edit Candidate' : 'Add Candidate'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(formFields).map(formType => (
            <Form.Group
              className="mb-3"
              controlId={`formBasic-${formType}`}
              key={formType}
            >
              <Form.Label>{formFields[formType]}</Form.Label>
              <Form.Control
                name={formType}
                placeholder={`Enter ${formType}`}
                onChange={({target}) => onChange(target)}
                defaultValue={candidate[formType]}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
        <Button
          className="relative"
          variant="primary"
          onClick={() => {
            handleSave(candidate.id || null)
          }}
        >
          {candidate.id ? 'Save Changes' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
