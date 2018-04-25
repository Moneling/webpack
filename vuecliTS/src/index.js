import Vue from 'vue';
import App from './app.vue';

import './assets/style/index.less';
import './assets/style/index.styl';
var root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(App)
}).$mount(root)