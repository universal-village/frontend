import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify, { VTextField } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VTextField,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: "#4EA95E",
        secondary: "#515151",
        accent: "#3dcc55",
        anchor: '#ededed',
      },
    },
  },
});
