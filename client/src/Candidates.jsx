import React from 'react'

function Candidate({candidate}) {
  return (
    <div className="accordion-item">
      <div className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#candidate-detail-${candidate.id}`}
        >
          <span className="w-25">{candidate.name}</span>
          <span className="w-25">
            <span className="badge bg-secondary">{candidate.step}</span>
          </span>
          <span className="text-muted small w-25 text-end">
            <span className="me-3">
              {new Date(candidate.createdAt).toLocaleDateString('en-US')}
            </span>
          </span>
        </button>
      </div>
      <div
        id={`candidate-detail-${candidate.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-candidates"
      >
        <div className="accordion-body">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target={`#candidate-tab-content-${candidate.id}-profile`}
                type="button"
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target={`#candidate-tab-content-${candidate.id}-background-checks `}
                type="button"
              >
                Background Checks TODO
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active p-3"
              id={`#candidate-tab-content-${candidate.id}-profile`}
            >
              <dl>
                <dt>Email</dt>
                <dd>{candidate.email}</dd>
                <dt>Phone</dt>
                <dd>{candidate.phone}</dd>
                <dt>Notes</dt>
                <dd>{candidate.notes}</dd>
              </dl>
              <button
                type="button"
                className="btn btn-primary"
                hx-get={` /candidates/${candidate.id}/edit `}
                hx-target="#modal-container"
              >
                Edit
              </button>
            </div>
            <div
              className="tab-pane p-3"
              id={`#candidate-tab-content-${candidate.id}-background-checks`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              animi maxime exercitationem perferendis quae? Laudantium dolorem
              debitis earum quidem assumenda, quibusdam perspiciatis mollitia
              facere aut impedit rem quas animi cum.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListCandidates({candidates}) {
  return (
    <div className="accordion accordion-flush" id="accordion-candidates">
      {candidates.map(candidate => {
        return (
          <div key={`${candidate.id}`}>
            <Candidate candidate={candidate} />
          </div>
        )
      })}
    </div>
  )
}

function NoCandidates() {
  return (
    <div className="alert alert-light mt-4 p-4 text-center">
      <div>No candidates found</div>
    </div>
  )
}

const fetchCandidates = async () => {
  return fetch('/api/candidates').then(async response => {
    const json = await response.json()
    return json
  }, console.error)
}

function CandidatesInfo() {
  const [candidates, setCandidates] = React.useState([])
  React.useEffect(() => {
    fetchCandidates().then(candidates => {
      setCandidates(candidates)
    })
  }, [])

  if (candidates.length === 0) {
    return <NoCandidates />
  } else {
    return <ListCandidates candidates={candidates} />
  }
}

function Candidates() {
  return (
    <div className="Candidates">
      <div className="container-fluid">
        <div className="my-5">
          <h2>Candidate Pipeline</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="clearfix">
              <button
                type="button"
                className="btn btn-primary mb-3 float-end"
                hx-get="/candidates/new"
                hx-target="#modal-container"
              >
                Add Candidate
              </button>
            </div>
            <CandidatesInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Candidates
