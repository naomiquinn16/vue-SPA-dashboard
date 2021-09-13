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
      :items-per-page="5"
      item-key="name"
      :search="search"
      class="elevation-1">
      <template #item.planet="{ value }">
        <v-dialog v-model="dialog" max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <a color="primary" dark v-bind="attrs" v-on="on">
              {{value}}
            </a>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Planet Information</v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
          </v-card>
        </v-dialog>
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
      ...mapActions(['loadTable',])
  },
  data () {
      return {
        dialog: false,
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
