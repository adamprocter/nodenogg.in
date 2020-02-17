export const drag = {
  methods: {
    makeDraggable(nodes) {
      var active = false
      var currentX
      var currentY
      var initialX
      var initialY
      var xOffset = 0
      var yOffset = 0

      nodes.addEventListener('mousedown', startDrag)
      nodes.addEventListener('mousemove', drag)
      nodes.addEventListener('mouseup', endDrag)
      nodes.addEventListener('mouseleave', endDrag)
      nodes.addEventListener('touchstart', startDrag)
      nodes.addEventListener('touchmove', drag)
      nodes.addEventListener('touchend', endDrag)
      nodes.addEventListener('touchleave', endDrag)
      nodes.addEventListener('touchcancel', endDrag)

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

          setTranslate(currentX, currentY, nodes)
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
    }
  }
}
