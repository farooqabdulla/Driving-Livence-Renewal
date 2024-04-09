document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const inputs = document.querySelectorAll('input[type="text"], select, input[type="radio"]');
    const progressBar = document.getElementById('progressBar');
    let currentScreenIndex = 0;
  
    showScreen(currentScreenIndex);
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        updateProgressBar();
        if (isLastInputFilled()) {
          showNextScreen();
        }
      });
    });
  
    function showScreen(index) {
      screens.forEach((screen, i) => {
        if (i === index) {
          screen.style.display = 'block';
        } else {
          screen.style.display = 'none';
        }
      });
    }
  
    function showNextScreen() {
      currentScreenIndex++;
      if (currentScreenIndex < screens.length) {
        showScreen(currentScreenIndex);
      }
    }
  
    function updateProgressBar() {
      const filledInputs = Array.from(inputs).filter(input => {
        if (input.type === 'text' && input.value.length >= 3) {
          return true;
        } else if (input.type === 'select-one' && input.value !== '') {
          return true;
        } else if (input.type === 'radio' && input.checked) {
          return true;
        }
        return false;
      });
  
      const progress = (filledInputs.length / inputs.length) * 65;
      progressBar.style.width = `${progress}%`;
      progressBar.style.marginLeft = `${-48 + progress}%`;
    }
  
    function isLastInputFilled() {
      const lastScreenInputs = Array.from(screens[currentScreenIndex].querySelectorAll('input[type="text"], select, input[type="radio"]'));
      const filledLastScreenInputs = lastScreenInputs.filter(input => {
        if (input.type === 'text' && input.value.length >= 3) {
          return true;
        } else if (input.type === 'select-one' && input.value !== '') {
          return true;
        } else if (input.type === 'radio' && input.checked) {
          return true;
        }
        return false;
      });
  
      return filledLastScreenInputs.length === lastScreenInputs.length;
    }
  });
  
