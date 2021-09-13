<template>
  <v-card>
    <v-card-title>
        <v-text-field
          color="secondary"
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
      :items-per-page="8"
      class="elevation-1">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="mx-auto">
              <v-img
              src="https://comet.nerc.ac.uk/wp-content/uploads/2015/04/cropped-Blue-and-purple-space.jpg"
              ></v-img>
              <v-card-title> Information about {{selectedItem.planet}}</v-card-title>
              <v-list>
                <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="secondary">mdi-circle-medium</v-icon>
                    </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>The diameter of {{selectedItem.planet}} is {{selectedItem.diameter}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                  <v-list-item-icon>
                      <v-icon color="secondary">mdi-circle-medium</v-icon>
                    </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>The climate here is {{selectedItem.climate}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                  <v-list-item-icon>
                      <v-icon color="secondary">mdi-circle-medium</v-icon>
                    </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>The population of {{selectedItem.planet}} is {{selectedItem.population}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.created="{ item }">
        <span>{{ new Date(item.created).toLocaleString() }}</span>
      </template>
             <template v-slot:item.edited="{ item }">
        <span>{{ new Date(item.edited).toLocaleString() }}</span>
      </template>
      <template v-slot:item.planet="{ item }">
        <a @click="openPlanetDialog(item)" style="color: #FF22B1">
          {{item.planet}}
        </a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'TableComponent',
  computed: {
        ...mapGetters(['isLoading', 'data'])
  },
  mounted() {
      Promise.all([this.loadTable()]);
  },
  methods: {
      ...mapActions(['loadTable',]),
      openPlanetDialog(item) {
        this.selectedIndex = this.data.indexOf(item);
        this.selectedItem = Object.assign({}, item);

        this.dialog = true;
      },
  },
  data () {
      return {
        dialog: false,
        selectedIndex: -1,
        selectedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        },
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Height', value: 'height' },
          { text: 'Mass', value: 'mass' },
          { text: 'Created', value: 'created' },
          { text: 'Edited', value: 'edited' },
          { text: 'Planet Name', value: 'planet' }
        ]
      }
    }
}
</script>
