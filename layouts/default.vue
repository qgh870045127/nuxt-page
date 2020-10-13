<template>
  <div id="app">
    <!-- 头部 -->
    <Header />
    <!-- 内容 -->
    <transition name="fade-transform" mode="out-in">
      <Nuxt />
    </transition>
    <!-- 底部 -->
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  created () { },
}
</script>
<style lang="scss">
// 全局样式
@import '@/styles/index.scss';
// 雪碧图
@import '@/styles/sprite.scss';
// 动画
@import '@/styles/animation.scss';

#app {
  padding-top: 61PX;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
