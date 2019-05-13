import UploadDocumentsMixin from './upload-documents.mixin'

import Vue from 'vue'
import VueResource from 'vue-resource'
import { mount, createLocalVue } from '@vue/test-utils'

import { DocumentContainer } from '@/js/helpers/DocumentContainer'
import { DOCUMENT_TYPES } from '@/js/const/document-types.const'
import { DOCUMENT_POLICIES } from '@/js/const/document-policies.const'

import { api } from '@/api'
import * as Config from '../_config'

const localVue = createLocalVue()

Vue.use(VueResource)

const Component = {
  template: '<div></div>',
}

describe('Upload documents mixin', () => {
  let sandbox
  let wrapper

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    wrapper = mount(Component, {
      mixins: [UploadDocumentsMixin],
      localVue,
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('uploadDocuments', () => {
      it('calls uploadDocument method for every passed document without key property',
        async () => {
          sandbox.stub(wrapper.vm, 'uploadDocument')
          const documents = [
            { id: 'doc' },
            undefined,
            { key: 'doc-key' },
            null,
            {},
          ]

          await wrapper.vm.uploadDocuments(documents, 'SOME_ACCOUNT_ID')

          expect(wrapper.vm.uploadDocument)
            .calledWithExactly({ id: 'doc' }, 'SOME_ACCOUNT_ID')
          expect(wrapper.vm.uploadDocument)
            .calledWithExactly({}, 'SOME_ACCOUNT_ID')
          expect(wrapper.vm.uploadDocument).callCount(2)
        }
      )
    })

    describe('uploadDocument', () => {
      it('loads document config, calls uploadFile method, and sets document key',
        async () => {
          const document = new DocumentContainer({
            type: DOCUMENT_TYPES.assetLogo,
            mimeType: 'mime-type',
            file: { id: 'file' },
          })

          sandbox.stub(wrapper.vm, 'createDocumentAnchorConfig').resolves({
            id: 'id',
            url: 'https://storage.com',
            type: 'type',
            key: 'doc-key',
            policy: 'value',
          })
          sandbox.stub(wrapper.vm, 'uploadFile').resolves()
          sandbox.stub(document, 'setKey')

          await wrapper.vm.uploadDocument(document, 'SOME_ACCOUNT_ID')

          expect(wrapper.vm.createDocumentAnchorConfig)
            .calledOnceWithExactly(
              DOCUMENT_POLICIES[DOCUMENT_TYPES.assetLogo],
              'mime-type',
              'SOME_ACCOUNT_ID'
            )
          expect(wrapper.vm.uploadFile)
            .calledOnceWithExactly(
              { id: 'file' },
              { key: 'doc-key', policy: 'value' },
              'mime-type'
            )
          expect(document.setKey).calledOnceWithExactly('doc-key')
        }
      )
    })

    describe('createDocumentAnchorConfig', () => {
      it('calls api.postWithSignature method with provided params', async () => {
        sandbox.stub(api, 'postWithSignature')
          .resolves({ data: { key: 'doc-key' } })

        const result = await wrapper.vm.createDocumentAnchorConfig(
          'doc-type', 'mime-type', 'SOME_ACCOUNT_ID'
        )
        expect(api.postWithSignature)
          .to.have.been.calledOnceWithExactly(
            '/documents',
            {
              data: {
                type: 'doc-type',
                attributes: { content_type: 'mime-type' },
                relationships: {
                  owner: {
                    data: { id: 'SOME_ACCOUNT_ID' },
                  },
                },
              },
            },
          )
        expect(result).to.deep.equal({ key: 'doc-key' })
      })
    })

    describe('uploadFile', () => {
      it('creates and posts file form data', async () => {
        Config.initConfig('https://storage.com')
        sandbox.stub(wrapper.vm, 'createFileFormData')
          .returns({ 'some-policy': 'Some policy' })
        sandbox.stub(Vue.http, 'post')

        await wrapper.vm.uploadFile(
          { id: 'file' },
          { somePolicy: 'Some policy' },
          'mime-type'
        )

        expect(wrapper.vm.createFileFormData).calledOnceWithExactly(
          { id: 'file' },
          { somePolicy: 'Some policy' },
          'mime-type'
        )
        expect(Vue.http.post).calledOnceWithExactly(
          'https://storage.com',
          { 'some-policy': 'Some policy' },
        )
      })
    })

    describe('createFileFormData', () => {
      it('creates file form data and converts policies to kebab-case',
        async () => {
          sandbox.stub(Blob, 'constructor')

          const result = await wrapper.vm.createFileFormData(
            { id: 'file' },
            { somePolicy: 'Some policy', otherPolicy: 'Other policy' },
            'mime-type'
          )

          expect(result.get('some-policy')).to.equal('Some policy')
          expect(result.get('other-policy')).to.equal('Other policy')
          expect(result.get('file')).to.be.instanceOf(Blob)
        }
      )
    })
  })
})
