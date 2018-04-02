var button = document.getElementById('navigateTo')
button.addEventListener('click', () => {
  wx.miniProgram.navigateTo({
    url: '/pages/index'
  })
}, false)