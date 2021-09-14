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
        <Dialog :visible="dialog" :selectedItem="selectedItem" @closed="dialog=false"></Dialog>
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
import Dialog from './Dialog';
export default {
  name: 'TableComponent',
    components: {
    Dialog
  },
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
        selectedItem: {},
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
