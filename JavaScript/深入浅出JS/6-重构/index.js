let currentIndex = 0
let $buttonNext = $('.next')
let $buttonPrevious = $('.previous')
let $slides = $('.slides')
let $slidesWindow = $('.slidesWindow')

function playSlide (index) {
  if (index < 0) {
    index = 4
  } else if (index > 4) {
    index = 0
  }

  $slides.css({
    transform: `translate(${400 * index}px)`
  })

  currentIndex = index
  return index
}

$buttonNext.onClick = (event) => {
  playSlide(currentIndex + 1)
}
$buttonPrevious.onClick = (event) => {
  playSlide(currentIndex - 1)
}

let timerId = setInterval(() => {
  playSlide(currentIndex + 1)
}, 3000)

$slidesWindow.on('mouseenter', () => {
  clearInterval(timerId)
})

$slidesWindow.on('mouseleave', () => {
  timerId = setTimeout(() => {
    playSlide(currentIndex + 1)
  }, 3000)
})
