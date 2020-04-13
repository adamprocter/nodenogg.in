export const drag = {
  methods: {
    makeDraggable(incoming) {
      var active = false
      var currentX
      var currentY
      var initialX
      var initialY
      var xOffset = 0
      var yOffset = 0

      incoming.addEventListener('mousedown', startDrag)
      incoming.addEventListener('mousemove', drag)
      incoming.addEventListener('mouseup', endDrag)
      incoming.addEventListener('mouseleave', endDrag)
      incoming.addEventListener('touchstart', startDrag)
      incoming.addEventListener('touchmove', drag)
      incoming.addEventListener('touchend', endDrag)
      incoming.addEventListener('touchleave', endDrag)
      incoming.addEventListener('touchcancel', endDrag)

      function startDrag(e) {
        if (e.type === 'touchstart') {
          initialX = e.touches[0].clientX - xOffset
          initialY = e.touches[0].clientY - yOffset
        } else {
          initialX = e.clientX - xOffset
          initialY = e.clientY - yOffset
        }
        if (e.target.parentNode.classList.contains('node')) {
          active = true
        }
      }

      function drag(e) {
        if (active) {
          e.preventDefault()

          if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX
            currentY = e.touches[0].clientY - initialY
          } else {
            currentX = e.clientX - initialX
            currentY = e.clientY - initialY
          }

          xOffset = currentX
          yOffset = currentY

          setTranslate(currentX, currentY, incoming)
        }
      }

      function endDrag() {
        initialX = currentX
        initialY = currentY
        active = false
      }

      function setTranslate(xPos, yPos, el) {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
      }
    },
  },
}
