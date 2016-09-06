function createSetStream() {
  if ('srcObject' in HTMLVideoElement.prototype) {
    return function(el, stream) {
      el.srcObject = !!stream ? stream : null;
    };

  } else {
    return function(el, stream) {
      if (stream) {
        el.src = (window.URL || window.webkitURL).createObjectURL(stream);
      } else {
        el.removeAttribute('src');
      }
    };
  }
}

/**
 * Assign a media stream to a <video> element.
 *
 * @param {HTMLVideoElement} video
 * @param {MediaStream} stream
 */
export default createSetStream();
