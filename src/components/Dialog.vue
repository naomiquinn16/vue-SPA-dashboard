<template>
  <v-dialog v-model="visible" max-width="500px" persistent>
    <v-card class="mx-auto" v-model="selectedItem">
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onClose"> Close </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    selectedItem: {
     type: Object
   },
   visible: {
     type: Boolean,
     default: false
   }
  },
  methods: {
    onClose () {
      this.$emit('closed')
    }
  }
}
</script>