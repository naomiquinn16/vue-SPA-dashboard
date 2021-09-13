import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';

import router from './router';
import { fetchAllPeople } from './services/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        people: [],
        isAuthenticated: false,
        user: null,
        isLoading: false
    },
    mutations: {
        setPeople(state, payload) {
            state.people = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        startLoading(state) {
            state.isLoading = true;
          },
        stopLoading(state) {
            state.isLoading = false;
        },

    },
    actions: {
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/dashboard');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userJoin({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/dashboard');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        loadTable({ commit }) {
            commit('startLoading');
            fetchAllPeople().then((people) => {
            commit('setPeople', people);
            commit('stopLoading');
            });
          },
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        },
        isLoading(state) {
            return state.isLoading;
        },
        people: state => state.people
    }
});