import AdvancedStepForm from './advanced-step-form'

import Vuelidate from 'vuelidate'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import accountModule from '@/vuex/account.module'
import { vuexTypes } from '@/vuex/types'

const localVue = createLocalVue()
localVue.use(Vuelidate)

describe('Advanced step form', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // TODO: test validation rules

  describe('created hook', () => {
    it('calls populateForm only if request was passed as a prop', () => {
      sandbox.stub(AdvancedStepForm.methods, 'populateForm')

      shallowMount(AdvancedStepForm, { localVue })
      expect(AdvancedStepForm.methods.populateForm)
        .to.have.not.been.called

      shallowMount(AdvancedStepForm, {
        localVue,
        propsData: {
          request: { id: '1' },
        },
      })
      expect(AdvancedStepForm.methods.populateForm)
        .to.have.been.calledOnce
    })
  })

  describe('component', () => {
    let wrapper

    beforeEach(() => {
      sandbox.stub(accountModule.getters, vuexTypes.accountId)
        .returns('SOME_ACCOUNT_ID')
      const store = new Vuex.Store({ getters: accountModule.getters })
      wrapper = shallowMount(AdvancedStepForm, { localVue, store })
    })

    describe('populateForm', () => {
      it('properly sets request prop fields to form property', () => {
        wrapper.setProps({
          request: {
            preIssuanceAssetSigner: 'SIGNER_ID',
            initialPreissuedAmount: '500.000000',
          },
        })

        wrapper.vm.populateForm()

        expect(wrapper.vm.form.isPreIssuanceEnabled).to.be.true
        expect(wrapper.vm.form.preIssuanceAssetSigner).to.equal('SIGNER_ID')
        expect(wrapper.vm.form.initialPreissuedAmount).to.equal('500.000000')
      })
    })

    describe('submit', () => {
      it('emits submit event with correct payload', () => {
        sandbox.stub(wrapper.vm, 'isFormValid').returns(true)
        wrapper.setData({
          form: { initialPreissuedAmount: '100.000000' },
        })

        wrapper.vm.submit()

        expect(wrapper.emitted('submit')).to.exist
        expect(wrapper.emitted('submit')[0]).to.deep.equal([wrapper.vm.form])
      })
    })

    describe('setConfirmationState', () => {
      it('calls showConfirmation and emitDisabledState methods', () => {
        sandbox.stub(wrapper.vm, 'showConfirmation')
        sandbox.stub(wrapper.vm, 'emitDisabledState')

        wrapper.vm.setConfirmationState()

        expect(wrapper.vm.showConfirmation).to.have.been.calledOnce
        expect(wrapper.vm.emitDisabledState).to.have.been.calledOnce
      })
    })

    describe('emitDisabledState', () => {
      it('emits update isDisabled property event with correct payload', () => {
        wrapper.vm.emitDisabledState()

        expect(wrapper.emitted('update:isDisabled')).to.exist
        expect(wrapper.emitted('update:isDisabled')[0])
          .to.deep.equal([true])
      })
    })

    describe('emitEnabledState', () => {
      it('emits update isDisabled property event with correct payload', () => {
        wrapper.vm.emitEnabledState()

        expect(wrapper.emitted('update:isDisabled')).to.exist
        expect(wrapper.emitted('update:isDisabled')[0])
          .to.deep.equal([false])
      })
    })
  })
})
