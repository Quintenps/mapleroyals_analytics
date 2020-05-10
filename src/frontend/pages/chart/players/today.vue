<template>
  <div>
    <h1 class="title">Player activity</h1>
    <h2 class="subtitle">From today (UTC)</h2>
    <line-chart v-if="initiated" :chartdata="datacollection" />
  </div>
</template>
<script>
import LineChart from '../../../components/LineChart'

export default {
  components: { LineChart },
  data() {
    return {
      initiated: false,
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Players today',
            backgroundColor: 'rgba(159,204,0,0.2)',
            borderColor: 'rgba(159,204,0,1)',
            pointBackgroundColor: 'rgba(159,204,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: 'rgba(159,204,0,0.8)',
            pointHoverBorderColor: 'rgba(159,204,0,1)',
            data: []
          }
        ]
      }
    }
  },
  mounted() {
    this.pullData()
  },
  methods: {
    pullData() {
      return this.$axios
        .get(process.env.API_HOST+'/players/today')
        .then((response) => {
          this.extractPlayerData(response.data)
          this.extractLabelData(response.data)
          this.initiated = true
        })
    },
    extractPlayerData(response) {
      const arr = []
      response.forEach(function(row) {
        arr.push(row.players)
      })
      this.datacollection.datasets[0].data = arr
    },
    extractLabelData(response) {
      const arr = []
      response.forEach(function(row) {
        const date = new Date(row.date_format)
        arr.push(
          date.toLocaleString('utc', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        )
      })
      this.datacollection.labels = arr
    }
  }
}
</script>
