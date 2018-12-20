import { formatDate } from './formatDate'
import { i18nOptions } from '@/i18n'
import i18next from 'i18next'

describe('formatDate filter test', () => {
  beforeEach(() => {
    i18next.init(i18nOptions)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('formats the date', () => {
    const spy = sinon.spy(i18next, 't')

    formatDate('2017-11-20T10:23:45Z')

    expect(spy
      .withArgs(
        'formats.date', {
          value: '2017-11-20T10:23:45Z'
        })
      .calledOnce
    ).to.equal(true)
  })
})
