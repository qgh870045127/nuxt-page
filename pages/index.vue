<template>
  <div class="news wc">
    <input type="button" class="btn-primary btn3d" value="按钮" />
    <div
      v-for="(item, index) in 5"
      :key="index"
      ref="news-nav"
      style="font-size: 0.2rem; height: 5rem"
    >
      <div class="bright-button" style="opacity:0;" v-lazyBox="{ delay: 0.3 }">测试</div>
      <div class="bright-button" style="opacity:0;" v-lazyBox="{ delay: 0.4 }">测试</div>
      <div class="bright-button" style="opacity:0;" v-lazyBox="{ delay: 0.5 }">测试</div>
      <div class="bright-button" style="opacity:0;" v-lazyBox="{ delay: 0.6 }">测试</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      scrollY: '',
      isScroll: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, false)
  },
  destroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapState({ headOpts: (state) => state.headHandler }),
  },
  created() {},
  watch: {
    'headOpts.activeIndex'(value) {
      if (this.isScroll) return
      let offsetTop = this.$refs['news-nav'][value].offsetTop
      let topPos = offsetTop - this.headOpts.headHeight
      this.scrollTo({ to: topPos })
    },
  },
  methods: {
    ...mapActions('scrollHandler', ['scrollTo']),
    ...mapMutations('headHandler', ['SET_INDEX']),
    onScroll() {
      this.isScroll = true
      this.scrollY =
        document.documentElement.scrollTop ||
        document.body.parentNode.scrollTop ||
        document.body.scrollTop
      let len = this.$refs['news-nav'].length

      for (let i = 0; i < len; i++) {
        let top = this.$refs['news-nav'][i].offsetTop
        if (this.scrollY - top < 200) {
          this.SET_INDEX(i)
          break
        }
      }
      this.$nextTick(() => {
        this.isScroll = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.news {
  .btn-primary {
    width: 100px;
    box-shadow: 0 0 0 1px #417fbd inset,
      0 0 0 2px rgba(255, 255, 255, 0.15) inset, 0 8px 0 0 #4d5bbe,
      0 8px 8px 1px rgba(0, 0, 0, 0.5);
    background-color: #4274d7;
  }

  .btn-primary:active {
    box-shadow: 0 0 0 1px #417fbd inset,
      0 0 0 1px rgba(255, 255, 255, 0.15) inset,
      0 1px 3px 1px rgba(0, 0, 0, 0.3);
    background-color: #4274d7;
  }
  .btn3d {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #ffffff;
    position: relative;
    top: -6px;
    border: 0;
    outline: medium none;
    transition: all 0.04s linear;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 2px;
    margin-right: 2px;
  }
  .btn3d:active {
    top: 2px;
  }
}
</style>
