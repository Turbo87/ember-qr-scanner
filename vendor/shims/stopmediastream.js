// Cross browser stream.stop hack from:https://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
function init() {
  var MediaStream = window.MediaStream;
  if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
      MediaStream = webkitMediaStream;
  }
  if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
      MediaStream.prototype.stop = function() {
          this.getAudioTracks().forEach(function(track) {
              track.stop();
          });

          this.getVideoTracks().forEach(function(track) {
              track.stop();
          });
      };
  }
}

export default { init }