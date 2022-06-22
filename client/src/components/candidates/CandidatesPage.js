import React, {useState} from 'react'
import {useFetch} from '../../hooks/useFetch'
import {Accordion, Alert, Button, Col, Container, Row} from 'react-bootstrap'
import Candidate from './Candidate'
import CandidateModal from './Modal'

const newCandidate = {
  email: '',
  name: '',
  phone: '',
  step: '',
  notes: '',
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentCandidate, setCurrentCandidate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const showCandidatesFound = candidates && candidates.length !== 0

  useFetch('/api/candidates', data => {
    setCandidates(data)
    setIsLoading(false)
  })

  const saveChanges = async id => {
    const updatedCandidates = candidates.slice()
    const url = id ? `api/candidates/${id}` : 'api/candidates/'
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({...currentCandidate}),
    }

    try {
      const response = await fetch(url, options)
      id
        ? (updatedCandidates[currentCandidate.index] = await response.json())
        : updatedCandidates.push(await response.json())
      setCandidates(updatedCandidates)
      setShowModal(false)
    } catch (e) {
      console.log(e)
    }
  }

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
        aria-busy={isLoading}
        aria-live="polite"
        data-testid="loading"
      ></span>
      <Row>
        <h2 className="my-5">Candidate Pipeline</h2>
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
            {candidates.map(
              ({id, email, name, phone, notes, step, createdAt}, index) => (
                <Candidate
                  key={id}
                  id={id}
                  email={email}
                  name={name}
                  phone={phone}
                  notes={notes}
                  step={step}
                  createdAt={createdAt}
                  handleEdit={() => {
                    setCurrentCandidate({...candidates[index], ...{index}})
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
        candidate={currentCandidate || newCandidate}
        isOpen={showModal}
        handleSave={saveChanges}
        handleClose={() => setShowModal(false)}
        onChange={onChangeHandler}
      />
    </Container>
  )
}
