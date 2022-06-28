import React from 'react'
import {rest} from 'msw'
import {render, screen, waitFor} from '@testing-library/react'
import {CandidatesPageObject} from '../../test/page_objects/Candidates.js'
import CandidatesPage from '../components/candidates/CandidatesPage.js'
import {candidates as candidates_fixture} from '../../test/fixtures/candidates.json'
import {httpSetup} from '../../test/helpers/httpSetup.js'

describe('Candidates page', () => {
  let editCandidateRequestPayload = {}
  let createCandidateRequestPayload = {}
  const page = new CandidatesPageObject(screen)
  const serverMock = new httpSetup()

  beforeAll(() => serverMock.listen())
  afterAll(() => serverMock.close())

  it('displays an error when no candidates are found', async () => {
    serverMock.httpMockGet('candidates', [])
    render(<CandidatesPage />)

    await page.initialLoad()
    await page.pageErrors('No candidates found')
  })

  it('displays a list of candidates when available', async () => {
    serverMock.httpMockGet('candidates', candidates_fixture)
    render(<CandidatesPage />)

    await page.initialLoad()
    page.validateElementLength('candidate-item', candidates_fixture.length)
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

    serverMock.server.use(
      rest.put(`/api/candidates/${testCandidate.id}`, async (req, res, ctx) => {
        editCandidateRequestPayload = req.body
        return res(ctx.json({id: 'f'}))
      }),
    )

    render(<CandidatesPage />)

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

    serverMock.server.use(
      rest.post('/api/candidates/', async (req, res, ctx) => {
        createCandidateRequestPayload = req.body
        return res(ctx.json({id: 'f'}))
      }),
    )

    render(<CandidatesPage />)

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
