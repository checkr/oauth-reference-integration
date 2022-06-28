import React, {useState} from 'react'
import {useFetch} from '../../hooks/useFetch.js'
import {Accordion, Alert, Button, Col, Container, Row} from 'react-bootstrap'
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
        <h2 className="mt-5">Candidate Pipeline</h2>
        <h5>Position: Software Engineer</h5>
      </Row>
      <Row>
        <div className="mb-5">
          <div className="d-flex justify-content-center">
            <Funnel />
          </div>
        </div>
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

const Funnel = () => {
  return (
    <div id="funnel">
      <svg id="d3-funnel-FAieENegRbW3DV_Pum8kl" width="350" height="400">
        <g>
          <path
            fill="#1f77b4"
            d="M0,0 L350,0 L320.8333333333333,100 L29.166666666666668,100 L0,0"
          ></path>
          <text
            x="175"
            y="50"
            fill="#fff"
            fontSize="14px"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
          >
            <tspan x="175" dy="0">
              Applicants: 12,000
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="#ff7f0e"
            d="M29.166666666666668,100 L320.8333333333333,100 L291.66666666666663,200 L58.333333333333336,200 L29.166666666666668,100"
          ></path>
          <text
            x="175"
            y="150"
            fill="#fff"
            fontSize="14px"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
          >
            <tspan x="175" dy="0">
              Pre-screened: 4,000
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="#2ca02c"
            d="M58.333333333333336,200 L291.66666666666663,200 L262.49999999999994,300 L87.5,300 L58.333333333333336,200"
          ></path>
          <text
            x="175"
            y="250"
            fill="#fff"
            fontSize="14px"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
          >
            <tspan x="175" dy="0">
              Interviewed: 2,500
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="#d62728"
            d="M87.5,300 L262.49999999999994,300 L233.3333333333333,400 L116.66666666666667,400 L87.5,300"
          ></path>
          <text
            x="175"
            y="350"
            fill="#fff"
            fontSize="14px"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
          >
            <tspan x="175" dy="0">
              Hired: 1,500
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}
