<template>
  <div class="clock">
    <div class="clock-dial">{{ now | HHMMss }}</div>
  </div>
</template>
<script>
import dateFormat from 'licia/dateFormat'

export default {
  name: 'Clock',
  data: () => ({
    now: Date.now()
  }),
  methods: {
    // 开始计时
    setTimmer () {
      let startTime = Date.now()
      let secs = 0
      const fixed = () => {
        secs++
        this.now = Date.now()
        let offset = this.now - (startTime + secs * 1000)
        let nextTime = 1000 - offset
        if (nextTime < 0) { nextTime = 0 }
        setTimeout(fixed, nextTime)
      }
      setTimeout(fixed, 1000)
    }
  },
  filters: {
    HHMMss (v) { return dateFormat(v, 'HH:MM:ss') }
  },
  created () {
    this.setTimmer()
  }
}
</script>
<style>
.clock {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.clock-dial {
  padding-top: 25vh;
  font-size: 150px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 50px;
}
</style>
