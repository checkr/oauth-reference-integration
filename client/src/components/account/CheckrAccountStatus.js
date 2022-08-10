import {Container} from 'react-bootstrap'

export default function AccountStatus({headerContent, textContent, children}) {
  return (
    <Container fluid>
      <div className="my-5">
        <div className="p-5 mb-4 bg-light rounded-3">
          <Container className="py-5" fluid>
            <h1 className="display-5 mb-4 fw-bold">{headerContent}</h1>
            <p className="col-md-8 fs-4 mb-5">{textContent}</p>
            {children}
          </Container>
        </div>
      </div>
    </Container>
  )
}
