<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12 text-center">
        <img
          alt="Mapleroyals analytics logo"
          id="logo"
          src="./assets/logo.png"
        />
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h3>Player activity</h3>
            <apexchart
              v-if="loaded"
              height="400px"
              :options="options"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-4">
      <div class="col-12 text-center">
        <p class="text-muted">Tracking since 08-05-2020</p>
        <a href="//github.com/quintenps/mapleroyals_analytics"
          ><img src="./assets/github.png"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},
  data: () => ({
    loaded: false,
    options: {
      chart: {
        id: "mapleroyals-players",
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
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
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
    getPlayerData() {
      console.log("API HOST: " + this.$API_HOST);
      axios
        .get(this.$API_HOST + "/players")
        .then((resp) => {
          resp.data.forEach((element) => {
            this.options.xaxis.categories.push(element["DATE_FORMAT"]);
            this.series[0].data.push(element["players"]);
          });

          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getPlayerData();
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

body {
  background-color: #f3f5f7;
}

#logo {
  max-width: 325px;
  height: auto;
}
</style>
