<template>
  <div class="header">
<!--    内容相关-->
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
<!--    公告相关-->
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img v-bind:src="seller.avatar" width="100%" height="100%">
    </div>
<!--    动画效果-->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
  <!--            新版vue需要加 :key="***"-->
              <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
  <!--              index在vue1.x的语法是$index-->
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // import SupportIco from '../support-icon/support-ico'
  import star from '../star/star'

  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created () {
      // 按照设计图的先后顺序
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position relative
    color #fff
    background rgba(7,17,27,0.5)
    .content-wrapper
      position relative  // 父元素做相对定位
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        //inline-block元素：和其他元素都在一方上，可设置高宽度、边距等
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          font-size 12px
          color rgb(255,255,255)
          font-weight 100
          line-height 12px
          margin-bottom: 10px;
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right: 4px;
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px;
            font-size 10px
            font-weight 100
      .support-count
        position absolute  // 子元素做绝对定位
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height: 24px;
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
          vertical-align top
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      background rgba(7,17,27,0.2)
      white-space nowrap
      overflow hidden  // 内容会被修剪，并且其余内容是不可见的。
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        margin-top 4px
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
        color rgb(255,255,255)
        font-weight 100
        line-height 28px
      .icon-keyboard_arrow_right  // 脱离文档流，设置相对位置
        position absolute
        font-size 10px
        right  12px
        top 8px
    .background
      overflow hidden // 内容会被修剪，并且其余内容是不可见的。
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed  // 生成绝对定位的元素，相对于浏览器窗口进行定位。
      z-index 100  // 设置元素的堆叠顺序  仅能在定位元素上奏效
      top 0
      left 0
      width 100%
      height 100%
      overflow auto  // 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
      backdrop-filter: blur(10px)  // 高斯模糊效果
      opacity: 1  // 不透明级别 值1表示完全不透明
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-weight 700
              font-size 14px
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &.last-child // 设置最后一个元素的下内边距为零
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height 16px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              margin 24px 12px 0 12px
              font-size 12px
              font-weight 200
              color rgb(255,255,255)
              line-height 24px
      .detail-close
        color rgba(255,255,255,0.5)
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
