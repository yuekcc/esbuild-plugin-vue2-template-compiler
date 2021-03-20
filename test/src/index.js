import MyTitle from './title';
import Vue from 'vue';

import AppTPL from './index.template.html';

const App = Vue.extend({
  components: {
    MyTitle,
  },
  data() {
    return {
      name: 'Tom',
    };
  },
  ...AppTPL,
});

new Vue({
  el: '#app',
  render(h) {
    return h(App);
  },
});
