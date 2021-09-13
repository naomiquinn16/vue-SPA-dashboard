<template>
  <v-data-table
    :headers="headers"
    :items="people"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'TableComponent',
  computed: {
        ...mapGetters(['isLoading', 'people'])
  },
  mounted() {
      Promise.all([this.loadTable()]);
  },
  methods: {
      ...mapActions(['loadTable',])
  },
  data () {
      return {
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
          { text: 'Planet Name', value: 'homeworld' }
        ]
      }
    }
}
</script>
