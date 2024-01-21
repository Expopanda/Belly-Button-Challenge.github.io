document.addEventListener('DOMContentLoaded', function () {
    const radialDial = document.getElementById('radialDial');
    const dialMarker = document.getElementById('dialMarker');
  
    radialDial.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  
    let isDragging = false;
  
    function handleMouseDown(e) {
      isDragging = true;
      updateDialPosition(e);
    }
  
    function handleMouseMove(e) {
      if (isDragging) {
        updateDialPosition(e);
      }
    }
  
    function handleMouseUp() {
      isDragging = false;
    }
  
    function updateDialPosition(e) {
      const rect = radialDial.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const degrees = (angle * 180) / Math.PI;
  
      dialMarker.style.transform = `rotate(${degrees}deg)`;
    }
  });