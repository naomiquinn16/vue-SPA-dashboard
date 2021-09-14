import { shallowMount, createLocalVue  } from '@vue/test-utils'
import Join from '../../src/views/Join.vue'
import SignIn from '../../src/views/SignIn.vue'
import Vuex from 'vuex';
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Auth', () => {
  describe('Join', () => {
    let actions
    let store
    let vuetify
  
    beforeEach(() => {
      vuetify = new Vuetify(),
      actions = {
        userJoin: jest.fn(),
      }
      store = new Vuex.Store({
        actions
      })
    })
  
    it('dispatches "userJoin" login button is clicked', () => {
      const joinStub = {
        render: () => {},
        methods: {
          validate: () => true,
        }
      };
      const wrapper = shallowMount(Join, { vuetify, store, localVue, stubs: {'v-form': joinStub}})
      const button = wrapper.find('v-btn')
      button.trigger('submit')
      expect(actions.userJoin).toHaveBeenCalled()
    })
  })
  
  describe('SignIn', () => {
    let actions
    let store
    let vuetify
  
    beforeEach(() => {
      vuetify = new Vuetify(),
      actions = {
        userLogin: jest.fn(),
      }
      store = new Vuex.Store({
        actions
      })
    })
  
    it('dispatches "userLogin" login button is clicked', () => {
      const signinStub = {
        render: () => {},
        methods: {
          validate: () => true,
        }
      };
      const wrapper = shallowMount(SignIn, { vuetify, store, localVue, stubs: {'v-form': signinStub}})
      const button = wrapper.find('v-btn')
      button.trigger('submit')
      expect(actions.userLogin).toHaveBeenCalled()
    })
  })

})


