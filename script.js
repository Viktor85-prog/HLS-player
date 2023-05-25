var video = document.getElementById('video');
var el = document.getElementById('update');

if (Hls.isSupported()) {
	var hls = new Hls();
	hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
	hls.attachMedia(video);
	hls.on(Hls.Events.MEDIA_ATTACHED, function () {
	  video.muted = true;
	  video.play();
	});
  }


  window.onload = function () {

	function foo() {
		const r = video.buffered;
		const pos = video.currentTime;
		let bufferLen = 0;

		for (let i = 0; i < r.length; i++) {
			if (pos >= r.start(i) && pos < r.end(i)) {
				bufferLen = r.end(i) - pos;
			}
		}
		el.innerHTML =
			'<div>currentTime:' + pos.toFixed(2) + '</div>'+ 
			'<div>buffered:' + bufferLen.toFixed(2) + '</div>'+ 
			'<div>decoded:' + video.webkitDecodedFrameCount + '</div>'+
			'<div>dropped:' + video.webkitDroppedFrameCount + '</div>';
		window.requestAnimationFrame(foo);
	}
	foo();
  };