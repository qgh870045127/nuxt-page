<template>
  <header class="header" ref="header">
    <el-menu
      :default-active="headOpts.activeIndex"
      mode="horizontal"
      background-color="#000"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="0">处理中心</el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      scrollY: '',
      status: true,
    }
  },
  computed: {
    ...mapState({ headOpts: (state) => state.headHandler }),
  },
  mounted() {
    this.SET_HEIGHT(this.$refs.header.clientHeight)
    window.addEventListener('scroll', this.onScroll, false)
  },
  watch: {
    scrollY(newVal, oldVal) {
      let direction = newVal - oldVal > 0 ? true : false
      if (newVal > this.headOpts.headHeight) {
        if (direction) {
          this.$refs.header.className = 'header header-hidden'
        } else {
          this.$refs.header.className = 'header'
        }
      }
    },
    $route() {
      this.$refs.header.className = 'header'
    },
  },
  methods: {
    ...mapMutations('headHandler', ['SET_INDEX', 'SET_HEIGHT']),
    /**
     * @description 菜单激活事件
     */
    handleSelect(index, path) {
      this.SET_INDEX(index)
    },
    onScroll() {
      this.scrollY =
        document.documentElement.scrollTop ||
        document.body.parentNode.scrollTop ||
        document.body.scrollTop
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  transition: all 0.5s;
  &-hidden {
    opacity: 0;
  }
  &:hover {
    opacity: 1;
  }

  .el-menu {
    border-bottom-color: #000;
  }

  .el-menu-item {
    font-size: 0.16rem;
    padding: 0 0.2rem;
  }

  .el-submenu__title:after,
  .el-menu-item:after {
    content: '';
    width: 0;
    height: 2px;
    background: rgb(255, 208, 75);
    position: absolute;
    top: 100%;
    left: 50%;
    transition: all 0.3s;
  }

  .el-menu-item:hover:after,
  .el-submenu__title:hover:after {
    left: 0%;
    width: 100%;
  }
}
</style>
