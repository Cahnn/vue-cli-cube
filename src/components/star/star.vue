<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  // 定义常量方便后期维护
  const LENGHT = 5
  const CLS_ON = 'on'
  const CLS_HAIF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {  // 接收两个参数
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {  // 计算属性
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        // Math.floor(X):返回值是一个表示小于或等于指定数字的最大整数的数字。
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0 // 结果不为零即是小数（半星）
        let integer = Math.floor(score)  // 向下取整 （全星）
        for (let i = 0; i < integer; i++) {  // 遍历全星数
          result.push(CLS_ON)  // 获取
        }
        if (hasDecimal) {  // 如果有小数，则放一个半星
          result.push(CLS_HAIF)
        }
        while (result.length < LENGHT) {  // 如果 半星 + 全星 != 5
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &.last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &.last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')

</style>
