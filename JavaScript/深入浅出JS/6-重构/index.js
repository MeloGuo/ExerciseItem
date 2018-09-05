let currentIndex = 0
let $slides = $('.slides')
let $slidesWindow = $('.slidesWindow')

function playNextSlide () {
  $slides.css({
    transform: `translateX(${-400 * (currentIndex + 1)}px)`
  })
  if (currentIndex > 4) {
    currentIndex = 0
  } else {
    currentIndex += 1
  }
}

function playPreviousSlide () {
  $slides.css({
    transform: `translateX(${400 * (currentIndex - 1)}px)`
  })
  if (currentIndex < 0) {
    currentIndex = 4
  } else {
    currentIndex -= 1
  }
}

buttonNext.onClick = (event) => {
  playNextSlide()
}
buttonPrevious.onClick = (event) => {
  playPreviousSlide()
}

let timerId = setInterval(() => {
  playNextSlide()
}, 3000)

$slidesWindow.on('mouseenter', () => {
  clearInterval(timerId)
})

$slidesWindow.on('mouseleave', () => {
  timerId = setTimeout(() => {
    playNextSlide()
  }, 3000)
})
