import React, {useState} from 'react'
import {Accordion, Alert, Button, Col, Container, Row} from 'react-bootstrap'
import {useCandidates} from '../../hooks/useCandidates.js'
import Candidate from './Candidate.js'
import CandidateModal from './Modal.js'

export default function CandidatesPage() {
  const [currentCandidate, setCurrentCandidate] = useState({})
  const [showModal, setShowModal] = useState(false)
  const {candidates, create, update} = useCandidates()
  const showCandidatesFound = candidates.data && candidates.data.length !== 0

  const onChangeHandler = ({name, value}) => {
    setCurrentCandidate({
      ...currentCandidate,
      ...{[name]: value},
    })
  }

  return (
    <Container className="Candidates" fluid>
      <span
        role="alert"
        aria-busy={candidates.isLoading}
        aria-live="polite"
        data-testid="loading"
      ></span>
      {candidates.isError && <p>Something went wrong...</p>}
      {candidates.isSuccess && (
        <>
          <Row>
            <h2 className="mt-5">Candidate Pipeline</h2>
            <h5>Position: Software Engineer</h5>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button
                className="float-end"
                onClick={() => {
                  setCurrentCandidate(null)
                  setShowModal(true)
                }}
                data-testid="add"
              >
                Add Candidate
              </Button>
            </Col>
          </Row>
          <Row>
            {showCandidatesFound ? (
              <Accordion flush>
                {candidates.data.map(
                  ({id, email, name, phone, notes, step, createdAt}, index) => (
                    <Candidate
                      key={index}
                      id={id}
                      email={email}
                      name={name}
                      phone={phone}
                      notes={notes}
                      step={step}
                      createdAt={createdAt}
                      handleEdit={() => {
                        setCurrentCandidate({
                          ...candidates.data[index],
                          ...{index},
                        })
                        setShowModal(true)
                      }}
                    />
                  ),
                )}
              </Accordion>
            ) : (
              <Alert className="mt-4 p-4 text-center" variant="light">
                No candidates found
              </Alert>
            )}
          </Row>
          <CandidateModal
            candidate={
              currentCandidate || {
                email: '',
                name: '',
                phone: '',
                step: '',
                notes: '',
              }
            }
            isOpen={showModal}
            handleSave={() => {
              if (currentCandidate.id) update.mutate(currentCandidate)
              else create.mutate(currentCandidate)
              setShowModal(false)
            }}
            handleClose={() => setShowModal(false)}
            onChange={onChangeHandler}
          />
        </>
      )}
    </Container>
  )
}
