<template>
  <span class="bubble">
    {{num}}
  </span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .bubble
    display: inline-block
    padding: 0 5px
    height: 16px
    /*width 6px*/
    line-height: 16px
    vertical-align center
    /*text-align: center*/
    border-radius: 16px
    font-family: Helvetica
    font-weight: 700
    font-size: 9px
    color: $color-white
    background-color rgb(240,20,20)
    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
</style>
