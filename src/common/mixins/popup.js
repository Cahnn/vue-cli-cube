const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'

export default {
  data() {
    return {
      visiable: false
    }
  },
  methods: {
    show() {
      this.visiable = true
      this.$emit(EVENT_SHOW)
    },
    hide() {
      this.visiable = false
      this.$emit(EVENT_HIDE)
    }
  }
}
