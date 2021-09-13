<template>
    <v-app id="app">
    <nav>
    <v-app-bar color="#0B0E1F" class="white--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text" :disabled="!isAuthenticated"></v-app-bar-nav-icon>
        <v-toolbar-title class="font-weight-black">Space.io</v-toolbar-title><v-icon color="secondary">mdi-circle-medium</v-icon>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">mdi-magnify</v-icon>
        </v-btn>
        <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                class="white--text"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list v-if="!isAuthenticated">
              <v-list-item
                v-for="item in appbarItems"
                :key="item.title"
                :to="item.url"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-if="isAuthenticated" outlined color="white" @click="logout">Logout</v-btn>
      </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title color="primary" class="text-h6">
                Space.io<v-icon color="secondary">mdi-circle-medium</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

          <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in navbarItems"
              link
              :key="item.title"
              :to="item.url"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        </nav>
        <v-main transition="slide-x-transition" fill-height>
            <router-view></router-view>
        </v-main>

        <v-footer style="padding:0;"
          >
            <v-card
              flat
              tile
              width="100%"
              class="primary text-center"
            >
              <v-card-text class="white--text">
              <v-icon color="secondary">mdi-circle-medium</v-icon>
                {{ new Date().getFullYear() }} — <strong>Space.io</strong>
              <v-icon color="secondary">mdi-circle-medium</v-icon>
              </v-card-text>
            </v-card>
          </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',

  data: () => {
     return {
            appTitle: 'Space',
            drawer: true,
            appbarItems: [
                { title: 'Sign In', url: '/sign-in', icon: 'mdi-login'},
                { title: 'Join', url: '/join', icon: 'mdi-account-plus'}
            ],
            navbarItems: [
                { title: 'Dashboard', url: '/dashboard', icon: 'mdi-view-dashboard-outline' },
                { title: 'Profile', url: '/profile', icon: 'mdi-account' }
            ]
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
      logout() {
          this.$store.dispatch('userSignOut');
      }
    }
};
</script>
