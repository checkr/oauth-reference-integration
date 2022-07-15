import React, {useState} from 'react'
import {Accordion, Alert, Button, Col, Container, Row} from 'react-bootstrap'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {fetchCandidates, editOrAddCandidate} from '../../api/index.js'
import Candidate from './Candidate.js'
import CandidateModal from './Modal.js'

const newCandidate = {
  email: '',
  name: '',
  phone: '',
  step: '',
  notes: '',
}

export default function CandidatesPage() {
  const [currentCandidate, setCurrentCandidate] = useState({})
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()

  const {isLoading, isError, isSuccess, data} = useQuery(
    'candidates',
    fetchCandidates,
  )

  const mutation = useMutation(editOrAddCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries('candidates')
    },
  })

  const onChangeHandler = ({name, value}) => {
    setCurrentCandidate({
      ...currentCandidate,
      ...{[name]: value},
    })
  }

  const showCandidatesFound = data && data.length !== 0

  return (
    <Container className="Candidates" fluid>
      <span
        role="alert"
        aria-busy={isLoading}
        aria-live="polite"
        data-testid="loading"
      ></span>
      {isError && <p>Something went wrong...</p>}
      {isSuccess && (
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
                {data.map(
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
                        setCurrentCandidate({...data[index], ...{index}})
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
            handleSave={() => {
              mutation.mutate(currentCandidate)
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
