<template>
  <div>
    <h1 class="title">Stats</h1>
    <h2 class="subtitle">Most popular</h2>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>Avg daily players</th>
          <th>Most popular hour</th>
          <th>Most popular day</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="has-text-weight-medium">Today</td>
          <td>{{ daily.avg_daily }}</td>
          <td>{{ daily.popular_hour }}</td>
          <td>-</td>
        </tr>
        <tr>
          <td class="has-text-weight-medium">Weekly</td>
          <td>{{ weekly.avg_daily }}</td>
          <td>{{ weekly.popular_hour }}</td>
          <td>{{ weekly.popular_day }}</td>
        </tr>
        <tr>
          <td class="has-text-weight-medium">Monthly</td>
          <td>{{ monthly.avg_daily }}</td>
          <td>{{ monthly.popular_hour }}</td>
          <td>{{ monthly.popular_day }}</td>
        </tr>
        <tr>
          <td class="has-text-weight-medium">All time</td>
          <td>{{ all_time.avg_daily }}</td>
          <td>{{ all_time.popular_hour }}</td>
          <td>{{ all_time.popular_day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daily: {
        avg_daily: 0,
        popular_hour: '-'
      },
      weekly: {
        avg_daily: 0,
        popular_hour: '-',
        popular_day: '-'
      },
      monthly: {
        avg_daily: 0,
        popular_hour: '-',
        popular_day: '-'
      },
      all_time: {
        avg_daily: 0,
        popular_hour: '-',
        popular_day: '-'
      }
    }
  },
  mounted() {
    this.pullData()
  },
  methods: {
    pullData() {
      return this.$axios
        .get(process.env.API_HOST+'/stats')
        .then((response) => {
          this.extractData(response.data)
        })
    },
    extractData(response) {
      this.daily.avg_daily = response.daily.avg_players.players
      this.daily.popular_hour = response.daily.popular_hour.hour_date

      this.weekly.avg_daily = response.weekly.avg_players.players
      this.weekly.popular_hour = response.weekly.popular_hour.hour_date
      this.weekly.popular_day = response.weekly.popular_day.day_name

      this.monthly.avg_daily = response.monthly.avg_players.players
      this.monthly.popular_hour = response.monthly.popular_hour.hour_date
      this.monthly.popular_day = response.monthly.popular_day.day_name

      this.all_time.avg_daily = response.all_time.avg_players.players
      this.all_time.popular_hour = response.all_time.popular_hour.hour_date
      this.all_time.popular_day = response.all_time.popular_day.day_name
    }
  }
}
</script>
