const player = document.querySelector('.player');
const toggle = player.querySelector('.toggle');

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
  }
  
  function updateButton() {
	const icon = this.paused ? '►' : '❚❚';
	toggle.textContent = icon;
  }

  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);

  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);