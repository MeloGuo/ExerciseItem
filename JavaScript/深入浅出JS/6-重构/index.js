const slides = {
  currentIndex: 0,
  timerId: null,
  duration: 3000,
  $slides: $('.slides'),
  events: [
    { el: '.next', event: 'click', fn: 'playNext' },
    { el: '.previous', event: 'click', fn: 'playPrevious' },
    { el: '.slidesWindow', event: 'mouseenter', fn: 'clearTimer' },
    { el: '.slidesWindow', event: 'mouseleave', fn: 'resetTimer' }
  ],
  init () {
    this.bindEvents()
    this.timerId = this.autoPlay(this.duration)
  },
  bindEvents () {
    this.events.forEach(eventObject => {
      $(eventObject.el).on(eventObject.event, this[eventObject.fn].bind(this))
    })
  },
  playSlide (index) {
    index = this.fixIndex(index)

    this.$slides.css({
      transform: `translate(${-400 * index}px)`
    })

    this.currentIndex = index
    return index
  },
  fixIndex (index) {
    if (index < 0) {
      index = 4
    } else if (index > 4) {
      index = 0
    }

    return index
  },
  autoPlay () {
    return setInterval(() => {
      this.playSlide(this.currentIndex + 1)
    }, this.duration)
  },
  playNext () {
    this.playSlide(this.currentIndex + 1)
  },
  playPrevious () {
    this.playSlide(this.currentIndex - 1)
  },
  clearTimer () {
    window.clearInterval(this.timerId)
  },
  resetTimer () {
    this.timerId = this.autoPlay(this.duration)
  }
}

slides.init()
