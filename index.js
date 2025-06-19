const SEGMENTS = [
  '10 віджимань',
  '20 присідань',
  '3 підтягування',
  '20 віджимань',
  '50 присідань',
  '5 підтягування',
  '5хв відпочинку',
  'Крути ще раз',
];
  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#66D18C', '#D46A6A'
  ];

  const wheel = document.getElementById('wheel');
  const resultEl = document.querySelector('.result');
  const spinButton = document.querySelector('.spin');
  let currentRotation = 0;

  function generateWheel() {
    const angle = 360 / SEGMENTS.length;

    // Generate conic gradient
    const colorStops = SEGMENTS.map((_, i) => {
      const start = i * angle;
      const end = (i + 1) * angle;
      return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
    }).join(', ');
    wheel.style.backgroundImage = `conic-gradient(${colorStops})`;

    // Clear old labels
    wheel.innerHTML = '';

    // Add labels
    SEGMENTS.forEach((label, i) => {
      const segmentAngle = i * angle + angle / 2;
      const labelDiv = document.createElement('div');
      labelDiv.className = 'segment-label';
      labelDiv.textContent = label;
      labelDiv.style.transform = `rotate(${segmentAngle}deg) translateX(-50%)`;
      wheel.appendChild(labelDiv);
    });
  }

  function rotateWheel(degrees) {
    wheel.style.transform = `rotate(${degrees}deg)`;
    spinButton.setAttribute('disabled', true);
    resultEl.textContent = '';

    return new Promise(resolve => setTimeout(() => {
      resolve();
      spinButton.removeAttribute('disabled');
    }, 3000));
  }

  function randomDegrees() {
    return Math.floor(Math.random() * 3600) + 1000;
  }

  function getSegmentValue(deg) {
    const normalizedDeg = (360 - (deg % 360) + 360) % 360;
    const anglePerSegment = 360 / SEGMENTS.length;
    const index = Math.floor(normalizedDeg / anglePerSegment);
    return SEGMENTS[index];
  }

  function launchSpin() {
    const spinDegrees = randomDegrees();
    currentRotation += spinDegrees;

    rotateWheel(currentRotation).then(() => {
      const result = getSegmentValue(currentRotation);
      resultEl.textContent = `Ти виграв: ${result}!`;
    });
  }

  generateWheel();
  spinButton.addEventListener('click', launchSpin);
