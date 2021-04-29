<template>
  <div class="container py-5">
    <div class="row mb-5">
      <div class="col-12 text-center">
        <img
          alt="Mapleroyals analytics logo"
          id="logo"
          src="./assets/logo.png"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 col-md-3 col-xl-3 my-2 my-xl-0">
        <div class="card">
          <div class="card-body">
            <h3>{{ this.tileData?.online?.[0].players }}</h3>
            <h6>Players online now</h6>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 col-xl-3 my-2 my-xl-0">
        <div class="card">
          <div class="card-body">
            <h3>{{ this.tileData?.daily?.[1].players }}</h3>
            <h6 v-if="this.tileData?.daily">
              Players online daily
              <span
                v-if="isNegativeStringNumber(this.tileData?.daily?.percentage)"
                style="font-size:12px"
              >
                (<font-awesome-icon
                  :icon="['fas', 'arrow-down']"
                  style="color:red"
                />
                {{ this.tileData?.daily?.percentage }}%)
              </span>
              <span v-else style="font-size:12px">
                (<font-awesome-icon
                  :icon="['fas', 'arrow-up']"
                  style="color:green"
                />
                {{ this.tileData?.daily?.percentage }}%)
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 col-xl-3 my-2 my-xl-0">
        <div class="card">
          <div class="card-body">
            <h3>{{ this.tileData?.weekly?.[1].players }}</h3>
            <h6 v-if="this.tileData?.weekly">
              Players online weekly
              <span
                v-if="isNegativeStringNumber(this.tileData?.weekly?.percentage)"
                style="font-size:12px"
              >
                (<font-awesome-icon
                  :icon="['fas', 'arrow-down']"
                  style="color:red"
                />
                {{ this.tileData?.weekly?.percentage }}%)
              </span>
              <span v-else style="font-size:12px">
                (<font-awesome-icon
                  :icon="['fas', 'arrow-up']"
                  style="color:green"
                />
                {{ this.tileData?.weekly?.percentage }}%)
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 col-xl-3 my-2 my-xl-0">
        <div class="card">
          <div class="card-body">
            <h3>{{ this.tileData?.monthly?.[1].players }}</h3>
            <h6 v-if="this.tileData?.monthly">
              Players online monthly
              <span
                v-if="
                  isNegativeStringNumber(this.tileData?.monthly?.percentage)
                "
                style="font-size:12px"
              >
                (<font-awesome-icon
                  :icon="['fas', 'arrow-down']"
                  style="color:red"
                />
                {{ this.tileData?.monthly?.percentage }}%)
              </span>
              <span v-else style="font-size:12px">
                (<font-awesome-icon
                  :icon="['fas', 'arrow-up']"
                  style="color:green"
                />
                {{ this.tileData?.monthly?.percentage }}%)
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="btn-group btn-group-sm fa-pull-right" role="group">
              <button
                type="button"
                class="btn btn-outline-secondary"
                v-on:click="
                  getChartPlayerData(
                    this.apiUrl + '/players/chart/daily/all',
                    'All time'
                  )
                "
              >
                All time
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                v-on:click="
                  getChartPlayerData(
                    this.apiUrl + '/players/chart/daily/month',
                    'Last 30 days'
                  )
                "
              >
                Monthly
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                v-on:click="
                  getChartPlayerData(
                    this.apiUrl + '/players/chart/daily/week',
                    'Last 7 days'
                  )
                "
              >
                Weekly
              </button>
            </div>

            <h3>Player activity</h3>
            <h6>
              Viewing player activity with filter: <b>{{ filterType }}</b>
            </h6>
            <apexchart
              id="chart"
              height="400px"
              :options="options"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-12 text-center">
        <small class="text-muted small">Tracking since 08-05-2020</small> <br />
        <a href="//github.com/quintenps/mapleroyals_analytics"
          ><font-awesome-icon :icon="['fab', 'github']" style="color:#24292e;"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: () => ({
    apiUrl: process.env.VUE_APP_API_HOST,
    filterType: "Daily",
    tileData: [],
    options: {
      chart: {
        id: "chart",
        type: "area",
        zoom: {
          autoScaleYaxis: true,
        },
        show: true,
        offsetX: 0,
        offsetY: 0,
        toolbar: {
          tools: {
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: false,
            pan: true,
            reset: true,
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      colors: ["#00E396"],
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [],
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dddd - dd MMM yyyy",
        },
      },
    },
    series: [
      {
        name: "Players",
        data: [],
      },
    ],
  }),
  methods: {
    async getChartPlayerData(url, filterType) {
      this.filterType = filterType;
      let dates = [];
      let players = [];

      await axios
        .get(url)
        .then((resp) => {
          resp.data.forEach((element) => {
            dates.push(element["DATE_FORMAT"]);
            players.push(element["players"]);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      let chartOptions = this.options;
      this.options = {
        chartOptions,
        xaxis: {
          categories: dates,
          type: "datetime",
        },
      };

      window.ApexCharts.exec("chart", "updateSeries", [
        {
          data: players,
        },
      ]);
    },

    getTilesPlayerData() {
      axios
        .get(process.env.VUE_APP_API_HOST + "/players/tiles")
        .then((resp) => {
          this.tileData = resp.data;
          for (const [key] of Object.entries(resp.data)) {
            if (key == "online") {
              continue;
            }

            this.tileData[key].percentage = (
              (resp.data[key][0].players / resp.data[key][1].players - 1) *
              100
            )
              .toString()
              .substr(0, 4);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    isNegativeStringNumber(string) {
      if (string.charAt(0) == "-") {
        return true;
      }

      return false;
    },
  },
  mounted() {
    this.getChartPlayerData(
      process.env.VUE_APP_API_HOST + "/players/chart/daily/all",
      "All time"
    );
    this.getTilesPlayerData();
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

body {
  background-color: #f3f5f7;
}

h6 {
  color: #3d3232;
  font-weight: 400;
}

#logo {
  max-width: 325px;
  height: auto;
}
</style>
