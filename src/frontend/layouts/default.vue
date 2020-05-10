<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <a href="/">
              <img class="logo" src="/logo.png" />
            </a>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <tile
              v-if="data"
              :title="formatNumber(data.mostPlayers.players)"
              :tooltip-msg="'Registered at: ' + data.mostPlayers.day_format"
              subtitle="Most average players ever in a day"
            />
          </div>
          <div class="column">
            <tile
              v-if="data"
              :title="data.mostPopularMonth.month_name"
              subtitle="Most popular month"
            />
          </div>
          <div class="column">
            <tile
              v-if="data"
              :title="data.mostPopularDay.day_name"
              subtitle="Most popular day"
            />
          </div>
          <div class="column">
            <tile
              v-if="data"
              :title="parseTo12hTime(data.MostPopularHour.full_date)"
              :tooltip-msg="
                formatNumber(data.MostPopularHour.players) +
                  ' hourly average players'
              "
              subtitle="Most popular hour (UTC)"
            />
          </div>
        </div>
        <div class="box">
          <div class="columns">
            <div class="column is-one-fifth-desktop">
              <aside class="menu">
                <p class="menu-label">
                  <font-awesome-icon
                    :icon="['fas', 'info']"
                  ></font-awesome-icon>
                  General
                </p>
                <ul class="menu-list">
                  <li>
                    <nuxt-link to="/">Index</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/stats">Stats</nuxt-link>
                  </li>
                </ul>
                <p class="menu-label">
                  <font-awesome-icon
                    :icon="['fas', 'user-circle']"
                  ></font-awesome-icon>
                  Player charts
                </p>
                <ul class="menu-list">
                  <li>
                    <nuxt-link to="/chart/players/month">Month</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/chart/players/week">Week</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/chart/players/today">Today</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/chart/players/hour">Hour</nuxt-link>
                  </li>
                </ul>
              </aside>
            </div>
            <div class="column is-four-fifths-desktop">
              <nuxt />
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <a href="https://github.com/Quintenps/mapleroyals_analytics">
            <font-awesome-icon
              :icon="['fab', 'github']"
              style="font-size: 24px"
            ></font-awesome-icon>
          </a>
        </p>
        <p class="is-italic">Tracking since 08-05-2020</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Tile from '../components/Tile'

export default {
  components: { Tile },
  data() {
    return {
      initiated: false,
      data: null
    }
  },
  mounted() {
    this.pullData()
  },
  methods: {
    pullData() {
      return this.$axios
        .get('http://MRA_BACKEND:3000/stats/popular')
        .then((response) => {
          this.data = response.data
        })
    },
    formatNumber(num) {
      if (isNaN(num)) return num

      if (num < 1000000) {
        return parseFloat(num / 1000).toFixed(2) + 'K'
      }
    },
    parseTo12hTime(date) {
      const time = new Date(date)
      return time.toLocaleString('utc', { hour: 'numeric', hour12: true })
    }
  }
}
</script>

<style>
.nuxt-link-exact-active.nuxt-link-active {
  background-color: #3273dc;
  color: #fff;
}

.subtitle {
  color: #a9a9a9;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25;
  text-transform: uppercase;
}

html,
body,
footer {
  background-color: #f3f5f7 !important;
}
</style>
