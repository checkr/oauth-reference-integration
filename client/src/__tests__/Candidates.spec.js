import React from 'react'
import mockBackend from './testSupport/helpers/mockBackend.js'
import {rest} from 'msw'
import {render, screen, waitFor} from '@testing-library/react'
import {candidates as candidates_fixture} from './testSupport/fixtures/candidates.json'
import queryClient from '../QueryClient.js'
import {QueryClientProvider} from 'react-query'
import CandidatesPageObject from './testSupport/page_objects/Candidates.js'
import Candidates from '../components/candidates/Candidates.js'

const Page = () => (
  <QueryClientProvider client={queryClient}>
    <Candidates />
  </QueryClientProvider>
)

describe('Candidates page', () => {
  let editCandidateRequestPayload = {}
  let createCandidateRequestPayload = {}
  const page = new CandidatesPageObject(screen)
  const backend = new mockBackend()

  beforeAll(() => backend.server.listen())
  afterAll(() => backend.server.close())

  it('displays an error when no candidates are found', async () => {
    backend.stubHttpGet('/api/candidates', [])
    render(<Page />)

    await page.initialLoad()
    await page.pageErrors('No candidates found')
  })

  it('displays a list of candidates when available', async () => {
    backend.stubHttpGet('/api/candidates', candidates_fixture)
    render(<Page />)

    await page.initialLoad()
    await waitFor(() => {
      page.validateElementLength('candidate-item', candidates_fixture.length)
    })
  })

  it('updates an existing candidate', async () => {
    const testCandidate = candidates_fixture[0]
    const expectedEditCandidateRequestPayload = {
      email: 'test-email@example.com',
      name: 'Bart Simpson',
      notes: 'Hello World',
      phone: '393281929',
      step: 'Rejected',
    }

    backend.server.use(
      rest.put(`/api/candidates/${testCandidate.id}`, async (req, res, ctx) => {
        editCandidateRequestPayload = req.body
        return res(ctx.json({}))
      }),
    )

    render(<Page />)

    await page.initialLoad()

    page.clickCandidate(testCandidate.name)
    page.clickEdit(testCandidate.id)
    page.inputEmail('test-email@example.com')
    page.inputName('Bart Simpson')
    page.inputNotes('Hello World')
    page.inputPhoneNumber('393281929')
    page.inputStep('Rejected')
    page.clickSaveChanges()

    await waitFor(() => {
      expect(editCandidateRequestPayload).toMatchObject(
        expectedEditCandidateRequestPayload,
      )
    })
  })

  it('creates a new candidate', async () => {
    const expectedCreateCandidateRequestPayload = {
      email: 'test-email@example.com',
      name: 'Bart Simpson',
      notes: 'Hello World',
      phone: '393281929',
      step: 'Rejected',
    }

    backend.server.use(
      rest.post('/api/candidates/', async (req, res, ctx) => {
        createCandidateRequestPayload = req.body
        return res(ctx.json({}))
      }),
    )

    render(<Page />)

    await page.initialLoad()

    page.clickAdd()
    page.inputEmail('test-email@example.com')
    page.inputName('Bart Simpson')
    page.inputNotes('Hello World')
    page.inputPhoneNumber('393281929')
    page.inputStep('Rejected')
    page.clickSubmit()

    await waitFor(() => {
      expect(createCandidateRequestPayload).toMatchObject(
        expectedCreateCandidateRequestPayload,
      )
    })
  })
})
