<template>
    <v-app id="app">
    <nav>
    <v-app-bar color="deep-purple accent-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Space App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
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
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="item in appbarItems"
                :key="item.title"
                :to="item.url"
                @click="() => {}"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
                Space App
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
        <v-main transition="slide-x-transition">
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => {
     return {
            appTitle: 'Space',
            drawer: true,
            appbarItems: [
                { title: 'Sign In', url: '/sign-in'},
                { title: 'Join', url: '/join' }
            ],
            navbarItems: [
                { title: 'Dashboard', url: '/dashboard', icon: 'mdi-view-dashboard-outline' },
                { title: 'Profile', url: '/profile', icon: 'mdi-account' }
            ]
        };
    },
};
</script>
