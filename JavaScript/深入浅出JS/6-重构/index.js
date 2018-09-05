let currentIndex = 0
let timerId
let $buttonNext = $('.next')
let $buttonPrevious = $('.previous')
let $slides = $('.slides')
let $slidesWindow = $('.slidesWindow')

function playSlide (index) {
  index = fixIndex(index)

  $slides.css({
    transform: `translate(${400 * index}px)`
  })

  currentIndex = index
  return index
}

function fixIndex (index) {
  if (index < 0) {
    index = 4
  } else if (index > 4) {
    index = 0
  }

  return index
}

function autoPlay () {
  return setInterval(() => {
    playSlide(currentIndex + 1)
  }, 3000)
}

let playNext = () => {
  playSlide(currentIndex + 1)
}

let playPrevious = () => {
  playSlide(currentIndex - 1)
}

let clearTimer = () => {
  window.clearInterval(timerId)
}

let resetTimer = () => {
  timerId = autoPlay()
}
function bindEvents () {
  const events = [
    { el: $buttonNext, event: 'click', fn: playNext },
    { el: $buttonPrevious, event: 'click', fn: playPrevious },
    { el: $slidesWindow, event: 'mouseenter', fn: clearTimer },
    { el: $slidesWindow, event: 'mouseleave', fn: resetTimer }
  ]

  events.forEach(eventObject => {
    $(eventObject.el).on(eventObject.event, eventObject.fn)
  })
}

bindEvents()

timerId = autoPlay()
