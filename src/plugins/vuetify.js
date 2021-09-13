import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
          light: {
            primary: '#1D1C39', // navy
            secondary: '#FF22B1', // pink
            accent: '#895EF7', // purple
            error: '#FF22B1', // pink
          },
        },
      },
});
