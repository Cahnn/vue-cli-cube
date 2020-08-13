<template>
  <div class="shop-cart-sticky" v-show="visiable">
    <shop-cart
      ref="shopCart"
      :select-foods="selectFoods"
      :delivery-price="deliveryPrice"
      :min-price="minPrice"
      :fold="fold"
      :sticky=true
    >
    </shop-cart>
  </div>
</template>

<script>
  import ShopCart from '../shop-cart/shop-cart'
  import popupMixin from 'common/mixins/popup'

  export default {
    mixins: [popupMixin],  // mixins就是混入。一个混入对象可以包含任意组件选项
    name: 'shop-cart-sticky',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      fold: {
        type: Boolean,
        default: true
      },
      list: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      drop(el) {
        this.$refs.shopCart.drop(el)
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shop-cart-sticky
    position absolute
    left 0
    bottom 0
    z-index 999
    width 100%
    height 48px
</style>
