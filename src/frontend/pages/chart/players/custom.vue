<template>
  <div>
    <h1 class="title">Player activity</h1>
    <h2 class="subtitle">Between custom time period</h2>
    <div class="columns">
      <div class="column is-one-fifth">
        <div class="field">
          <label class="label">From date</label>
          <div class="control">
            <no-ssr>
              <datepicker placeholder="Select Date"></datepicker>
            </no-ssr>
          </div>
        </div>
      </div>
      <div class="column is-one-fifth">
        <div class="field">
          <label class="label">To date</label>
          <div class="control">
            <no-ssr>
              <datepicker placeholder="Select Date"></datepicker>
            </no-ssr>
            dawd
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: { Datepicker },
  data() {
    return {}
  },
  methods: {
    customFormatter(date) {
      return this.$moment(date).format('d m Y, h:mm')
    },
  },
}
</script>
