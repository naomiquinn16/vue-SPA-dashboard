<template>
  <v-card>
    <v-card-title>
        <v-text-field
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
      :items-per-page="6"
      class="elevation-1">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="320px">
            <v-card class="mx-auto">
              <v-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-VrRSheHJXPM1JMwrJ3hWl3eEeJB_kmj64A&usqp=CAU"
              ></v-img>
              <v-card-title> Information about {{selectedItem.planet}}</v-card-title>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{selectedItem.diameter}}</v-list-item-title>
                    <v-list-item-subtitle>Diameter</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{selectedItem.climate}}</v-list-item-title>
                    <v-list-item-subtitle>Climate</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{selectedItem.population}}</v-list-item-title>
                    <v-list-item-subtitle>Population</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.planet="{ item }">
        <a @click="openPlanetDialog(item)">
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
