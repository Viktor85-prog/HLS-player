const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton =  player.querySelector('.fullscreen__button');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function toggleFullscreen() {
	player.classList.add("fullscreen");
	player.requestFullscreen = player.requestFullscreen || player.mozRequestFullscreen
			|| player.msRequestFullscreen || player.webkitRequestFullscreen;
  
	if (!document.fullscreenElement) {
		fullscreenButton.children[0].src = './exitfullscreen.png'
		player.requestFullscreen().then({}).catch(err => {
		alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
	  });
	} else {
	  if (document.exitFullscreen) {
		document.exitFullscreen();
		fullscreenButton.children[0].src = './fullscreen.png'
	  }
	}
  }

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleKeypress(event) {
	if (event.keyCode === 13) {
	  toggleFullscreen();
	}
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', toggleFullscreen);
// video.addEventListener('fullscreenchange', checkFullScreen);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

fullscreenButton.addEventListener('click', toggleFullscreen);

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

document.addEventListener("keypress", handleKeypress, false);