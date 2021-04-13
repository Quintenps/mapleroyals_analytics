import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(VueApexCharts)
app.config.globalProperties.$API_HOST = process.env.API_HOST || 'http://localhost:3000'

app.mount('#app')
