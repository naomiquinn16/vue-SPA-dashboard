import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app'
require('firebase/auth')

import router from './router';
import { fetchAllPeople, fetchAllPlanets } from './services/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
        isAuthenticated: false,
        user: null,
        isLoading: false
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
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
            fetchAllPlanets().then((planets) => {
                fetchAllPeople().then((people) => {
                    let data = people.map(person => {
                      let item = planets.find(item => item.url === person.homeworld);
                        if (item) {
                            item = {
                                planet: item.name,
                                diameter: item.diameter,
                                climate: item.climate,
                                population: item.population
                            }
                            return {...person, ...item};
                        }
                    }).filter(item => item !== undefined);
                commit('setData', data);
                commit('stopLoading');
                });
            });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        },
        isLoading(state) {
            return state.isLoading;
        },
        data: state => state.data
    }
});