// Particle JS initialization for "The End" or space atmosphere
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    color: { value: '#ffffff' }, // White dust
    shape: {
      type: 'edge', // Square particles like Minecraft
      stroke: { width: 0, color: '#000000' }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: true, speed: 2, size_min: 1, sync: false }
    },
    line_linked: {
      enable: false // No connecting lines for Minecraft style
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'top',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Click Sound Effect for Buttons
function playClick() {
  // Use HTML5 audio to play a generic block-breaking or clicking sound.
  // We'll simulate it with a short oscillator beep for now if no assets exist, 
  // but let's just create a visual log since AudioContext can be complex.
  console.log("Button clicked!");
  
  // Create a visual particle burst for fun
  const burst = document.createElement('div');
  burst.style.position = 'fixed';
  burst.style.left = event.clientX + 'px';
  burst.style.top = event.clientY + 'px';
  burst.style.width = '10px';
  burst.style.height = '10px';
  burst.style.backgroundColor = '#55FFFF';
  burst.style.borderRadius = '0'; // Square burst
  burst.style.pointerEvents = 'none';
  burst.style.transition = 'all 0.5s ease-out';
  burst.style.boxShadow = '0 0 10px #55FFFF, 0 0 20px #55FFFF';
  document.body.appendChild(burst);
  
  requestAnimationFrame(() => {
    burst.style.transform = 'scale(5) translate(-20%, -20%)';
    burst.style.opacity = '0';
  });
  
  setTimeout(() => burst.remove(), 500);
}

// Interactive 3D Cube Logic
const cube = document.getElementById('mc-cube');

// Add subtle rotation based on mouse movement
document.addEventListener('mousemove', (e) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  // Calculate offset (-1 to 1)
  const xOffset = (mouseX / windowWidth) * 2 - 1;
  const yOffset = (mouseY / windowHeight) * -2 + 1; 

  // Limit the rotation angle
  const maxRotation = 25; 
  const rotX = -20 + (yOffset * maxRotation);
  const rotY = 45 + (xOffset * maxRotation);

  cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  // Stop the CSS animation while hovering
  cube.style.animation = 'none';
});

// Restart animation when cursor leaves
document.addEventListener('mouseleave', () => {
  cube.style.animation = 'float 6s ease-in-out infinite';
});

// Click the cube
cube.addEventListener('click', (e) => {
  // Add a nice visual pop to the block
  cube.style.transform = 'scale(0.8) rotateX(-20deg) rotateY(45deg)';
  setTimeout(() => {
    cube.style.transform = 'scale(1.1) rotateX(-15deg) rotateY(55deg)';
  }, 100);
  setTimeout(() => {
    cube.style.transform = '';
  }, 250);
  
  // Sound placeholder
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); 
  oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
});
