// Range Slider Component

/* <div class="range">
  <div class="range-inputs">
    <input
      class="range-input-min"
      type="range"
      min="100"
      max="1000"
      value="100"
    />
    <input
      class="range-input-max"
      type="range"
      min="100"
      max="1000"
      value="1000"
    />
  </div>

  <div class="range-track"></div>
  <div class="range-bullet range-bullet-min"></div>
  <div class="range-bullet range-bullet-max"></div>
</div> */

class Range {
  constructor(element) {
    const elements = document.querySelectorAll(element);

    elements.forEach(slider => {
      const gap = Number(slider.dataset.gap) || 0;

      const inputMin = slider.querySelector('.range-input-min');
      const inputMax = slider.querySelector('.range-input-max');

      const track = slider.querySelector('.range-track');

      const bullets = slider.querySelectorAll('.range-bullet');
      const bulletMin = slider.querySelector('.range-bullet-min');
      const bulletMax = slider.querySelector('.range-bullet-max');

      const min = Number(inputMin.min);
      const max = Number(inputMin.max);

      const getPercent = (value, min, max) =>
        ((value - min) / (max - min)) * 100;

      function updateRange() {
        bulletMin.style.left = `${getPercent(inputMin.value, min, max)}%`;
        bulletMax.style.left = `${getPercent(inputMax.value, min, max)}%`;

        track.style.left = `${getPercent(inputMin.value, min, max)}%`;
        track.style.width = `${getPercent(inputMax.value - inputMin.value, 0, max - min)}%`;
      }

      updateRange();

      bullets.forEach(bullet => {
        let isDragging = false;

        const onMouseMove = e => {
          if (!isDragging) return;

          const rect = slider.getBoundingClientRect();
          const percent = Math.min(
            Math.max(
              0,
              ((e.clientX || e.touches[0].clientX) - rect.left) /
                rect.width,
            ),
            1,
          );
          const value = min + Math.round(percent * (max - min));

          if (bullet === bulletMin && value < Number(inputMax.value)) {
            if (value + gap < Number(inputMax.value)) {
              inputMin.value = Math.min(value, Number(inputMax.value));
            } else {
              inputMin.value = Number(inputMax.value) - gap;
            }
          } else if (
            bullet === bulletMax &&
            value > Number(inputMin.value)
          ) {
            if (value - gap > Number(inputMin.value)) {
              inputMax.value = Math.max(value, Number(inputMin.value));
            } else {
              inputMax.value = Number(inputMin.value) + gap;
            }
          }

          updateRange();
        };

        const onMouseDown = e => {
          if (!e.touches) {
            e.preventDefault();
          }
          isDragging = true;
          document.addEventListener('pointermove', onMouseMove);
          document.addEventListener('touchmove', onMouseMove);
        };

        const onMouseUp = e => {
          if (!e.touches) {
            e.preventDefault();
          }
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('touchmove', onMouseMove);
        };

        bullet.addEventListener('mousedown', onMouseDown);
        bullet.addEventListener('touchstart', onMouseDown);

        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onMouseUp);
      });
    });
  }
}

new Range('.range');
