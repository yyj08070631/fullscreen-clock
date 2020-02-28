<template>
  <div class="clock">
    <div class="clock-dial">
      <!-- 时钟面板 -->
      <div class="clock-panel">
        <img src="/fullscreen-clock/imgs/01baidi.png" />
        <img src="/fullscreen-clock/imgs/02fenzhending.png" :style="fenzhenStyle" />
        <img src="/fullscreen-clock/imgs/03dizuo.png" />
        <img src="/fullscreen-clock/imgs/04yuanhuan.png" />
        <img src="/fullscreen-clock/imgs/05banzhezhao.png" :style="fenzhenStyle" />
        <img src="/fullscreen-clock/imgs/06biaomian.png" />
        <img src="/fullscreen-clock/imgs/07miaozhen.png" :style="miaonzhenStyle" />
        <img src="/fullscreen-clock/imgs/08fenzhen.png" :style="fenzhenStyle" />
        <img src="/fullscreen-clock/imgs/09shizhen.png" :style="shizhenStyle" />
        <img src="/fullscreen-clock/imgs/10yuandian.png" />
      </div>
      <!-- 时钟文案 -->
      <div class="clock-text">
        <span>{{ now | HH }}</span>
        <span style="margin:0 12px;line-height:112px;">:</span>
        <span>{{ now | MM }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from 'licia/dateFormat'

export default {
  name: 'Clock',
  data: () => ({
    now: 0,
    noteVisible: false,
    miaonzhenStyle: { transform: 'rotate(0deg)' },
    fenzhenStyle: { transform: 'rotate(0deg)' },
    shizhenStyle: { transform: 'rotate(0deg)' }
  }),
  methods: {
    // 开始计时
    setTimmer () {
      let startTime = Date.now()
      let secs = 0
      let secondCount = new Date(startTime).getSeconds() + new Date(startTime).getMinutes() * 60 + new Date(startTime).getHours() * 3600
      const fixed = () => {
        // 校正时间
        secs++
        this.now = Date.now()
        let offset = this.now - (startTime + secs * 1000)
        let nextTime = 1000 - offset
        if (nextTime < 0) { nextTime = 0 }
        // 改变时钟样式
        secondCount++
        if (secondCount === 12 * 60 * 60) { secondCount = 0 }
        this.runClock(secondCount)
        // 递归执行
        setTimeout(fixed, nextTime)
      }
      // 改变时钟样式
      this.runClock(secondCount)
      setTimeout(fixed, 1000)
    },
    // 改变时钟样式
    runClock (secondCount) {
      this.miaonzhenStyle.transform = `rotate(${secondCount % 60 * 6}deg)`
      const hourCount = Math.floor(secondCount / 3600)
      const minuteCount = Math.floor((secondCount - hourCount * 3600) / 60)
      this.fenzhenStyle.transform = `rotate(${minuteCount % 60 * 6}deg)`
      this.shizhenStyle.transform = `rotate(${(hourCount * 5 + Math.floor(minuteCount / 12)) * 6}deg)`
    }
  },
  filters: {
    HH (v) { return dateFormat(v, 'HH') },
    MM (v) { return dateFormat(v, 'MM') }
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
  background-color: #e2ebf4;
}
.clock-dial {
  padding-top: 3vh;
  user-select: none;
}
.clock-panel {
  position: relative;
  width: 660px;
  height: 600px;
}
.clock-panel img {
  position: absolute;
  top: 0;
  left: 0;
}
.clock-text {
  display: flex;
  justify-content: center;
  font-family: century gothic;
  font-size: 84px;
  color: #919fac;
  letter-spacing: 3px;
}
</style>
