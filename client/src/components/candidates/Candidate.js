import React from 'react'
import {Accordion, Button, Tabs, Tab} from 'react-bootstrap'

export default function Candidate({
  id,
  email,
  name,
  phone,
  notes,
  step,
  createdAt,
  handleEdit,
}) {
  return (
    <Accordion.Item eventKey={id} data-testid="candidate-item">
      <Accordion.Header>
        <span className="w-25">{name}</span>
        <span className="w-25">
          <span className="badge bg-secondary">{step}</span>
        </span>
        <span className="text-muted small w-25 text-end">
          <span className="me-3">
            {new Date(createdAt).toLocaleDateString('en-US')}
          </span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <div className="p-3">
              <dl>
                <dt>Email</dt>
                <dd>{email}</dd>
                <dt>Phone</dt>
                <dd>{phone}</dd>
                <dt>Notes</dt>
                <dd>{notes}</dd>
              </dl>
              <Button
                onClick={() => handleEdit(true)}
                data-testid={`edit-${id}`}
              >
                Edit
              </Button>
            </div>
          </Tab>
          <Tab eventKey="background-checks" title="Background Checks">
            <div
              className="tab-pane p-3"
              id={`candidate-tab-content-${id}-background-checks`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              animi maxime exercitationem perferendis quae? Laudantium dolorem
              debitis earum quidem assumenda, quibusdam perspiciatis mollitia
              facere aut impedit rem quas animi cum.
            </div>
          </Tab>
        </Tabs>
      </Accordion.Body>
    </Accordion.Item>
  )
}
