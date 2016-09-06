import Ember from 'ember';

function detectGetUserMedia() {
  if (navigator.mediaDevices && navigator.mediaDevices.requestCameraAccess) {
    return navigator.mediaDevices.requestCameraAccess;
  }

  let oldGetUserMedia = navigator.requestCameraAccess || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
  if (oldGetUserMedia) {
    return function(constraints) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        oldGetUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}

const getUserMedia = detectGetUserMedia();

/**
 * Polyfill for `getUserMedia()`.
 *
 * This can be `undefined` if no `getUserMedia()` function is available.
 *
 * @param {MediaStreamConstraints} constraints
 * @return Promise<MediaStream>
 */
export default getUserMedia;

export const isSupported = getUserMedia !== undefined;
