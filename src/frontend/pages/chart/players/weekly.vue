<template>
  <div>
    <h1 class="title">Player activity</h1>
    <h2 class="subtitle">
      Average players per day from the past weeks. Weeks are per week number.
    </h2>
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
        datasets: [],
      },
      colorsets: [
        '#A4E1BC',
        '#5BCD90',
        '#35AF6C',
        '#289250',
        '#237841',
        '#1E5933',
        '#1E452D',
      ],
    }
  },
  mounted() {
    this.pullData()
  },
  methods: {
    pullData() {
      return this.$axios
        .get(process.env.API_HOST + '/players/weekly')
        .then((response) => {
          this.extractPlayerData(response.data)
          this.extractLabelData(response.data)
          this.initiated = true
        })
    },
    extractPlayerData(response) {
      const arr = []
      response.forEach(function (row) {
        if (!arr[row.week]) {
          arr[row.week] = []
        }
        arr[row.week].push(row.players)
      })
      Object.keys(arr).forEach((key) => {
        const position = Object.keys(arr).indexOf(key)

        this.datacollection.datasets.push({
          label: key,
          borderColor: this.colorsets[position],
          pointBackgroundColor: this.colorsets[position],
          borderWidth: 2,
          pointBorderColor: this.colorsets[position],
          backgroundColor: 'rgba(0,0,0,0)',
          data: arr[key],
        })
      })
    },
    extractLabelData(response) {
      const arr = []
      response.forEach(function (row) {
        if (!arr.includes(row.day_name)) {
          arr.push(row.day_name)
        }
      })
      this.datacollection.labels = arr
    },
  },
}
</script>
