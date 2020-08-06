<template>
  <div class="tab">
<!--    1、开启下划线跟随效果；2、双向绑定选中的label；3、用于渲染的数据，是一个数组；-->
    <cube-tab-bar
      :showSlider=true
      :useTransition=false
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>

    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0 // 为了能够双边滚动
        }
      }
    },
    computed: {
      selectedLabel: {
        get() {   // 回调函数  当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.tabs[this.index].label
        },
        set(newVal) {  // 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          // findIndex()是一个循环函数，循环对比value.label与最新属性值是否相同，相同则返回最新属性值数据
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted() {
      this.onChange(this.index)
    },
    methods: {
      onScroll(pos) {   // cube-slide的scroll事件，滚动中实时派发，获取到滚动位置的坐标值
        // console.log(pos.x)  // pos.x是一个负值
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange(current) {   // silde 页面切换时触发change事件，返回当前的索引值,然后赋值给this.index
        this.index = current  //  this.index改变的话，会触发selectedLabel重新计算，然后cube-tab就会进行新的计算，就可以完成切换
        const instance = this.$refs.component[current]
        if (instance && instance.fetch) {
          instance.fetch()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  // 使scoped样式中的一个选择器能够作用得‘更深’，可以使用 ‘>>>’
  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
