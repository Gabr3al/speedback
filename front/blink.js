
  document.addEventListener('DOMContentLoaded', (event) => {
    let isFullThrottleVisible = false;
    let blinkInterval;

    document.getElementById('fulltoggle').addEventListener('click', () => {
      isFullThrottleVisible = !isFullThrottleVisible;
      const fullElement = document.getElementById('full');
      const vignetteElement = document.getElementById('vignette');

      if (isFullThrottleVisible) {
        blinkInterval = setInterval(() => {
          if (fullElement.style.display === 'none') {
            fullElement.style.display = 'block';
          } else {
            fullElement.style.display = 'none';
          }
        }, 500);

        // Enable vignette effect
        vignetteElement.classList.add('active');
      } else {
        clearInterval(blinkInterval);
        fullElement.style.display = 'none';

        // Disable vignette effect
        vignetteElement.classList.remove('active');
      }
    });
  });
