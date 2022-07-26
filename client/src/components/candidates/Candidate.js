import React from 'react'
import ReactDOM from 'react-dom'
import {Embeds} from '@checkr/web-sdk'
import {Accordion, Button, Card, Tabs, Tab} from 'react-bootstrap'

const ReportsOverview = Embeds.ReportsOverview.useReact(React, ReactDOM)

const styles = {
  '.btn-primary': {
    background: '#527a00',
  },
  '.btn-loading::after': {
    border: '2px solid #527a00',
  },
  '.loading-bar': {
    'background-color': '#527a00',
  },
  '.header': {
    'font-size': '150%',
    'font-weight': 'normal',
    color: '#527a00',
  },
  '.form-label': {
    'font-weight': 'bold',
  },
  '.form-control': {
    padding: '0.5rem',
  },
  '.link': {
    'text-decoration': 'none',
  },
}

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
  const defaultProps = {
    externalCandidateId: id,
    sessionTokenPath: '/api/session-tokens',
    sessionTokenRequestHeaders: () => ({
      Authorization: `Bearer ${localStorage.getItem(
        'reference-integration-session-token',
      )}`,
    }),
    styles,
  }

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
          <Tab eventKey="activity" title="Activity">
            <div
              className="tab-pane p-3"
              id={`candidate-tab-content-${id}-activity`}
            ></div>
            <Card>
              <Card.Header>Background Checks</Card.Header>
              <Card.Body>
                <Button
                  onClick={() => {
                    const embed = new Embeds.NewInvitation({
                      ...defaultProps,
                      ...{defaultEmail: email},
                    })
                    embed.modal()
                  }}
                  data-testid={`new-invitation-${id}`}
                >
                  New Background Check
                </Button>
                <Card.Text className="mt-3" as={'div'}>
                  <ReportsOverview {...defaultProps} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Accordion.Body>
    </Accordion.Item>
  )
}
