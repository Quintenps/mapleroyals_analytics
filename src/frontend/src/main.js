import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faArrowDown, faArrowUp)


const app = createApp(App);
app.use(VueApexCharts)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')