import Ember from 'ember';

function detectGetUserMedia() {
  if (navigator.mediaDevices && navigator.mediaDevices.requestCameraAccess) {
    return navigator.mediaDevices.requestCameraAccess;
  }

  let oldGetUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
  if (oldGetUserMedia) {
    return function(constraints) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        oldGetUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}

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
 * Polyfill for `getUserMedia()`.
 *
 * This can be `undefined` if no `getUserMedia()` function is available.
 *
 * @param {MediaStreamConstraints} constraints
 * @return Promise<MediaStream>
 */
export const getUserMedia = detectGetUserMedia();

export const isSupported = getUserMedia !== undefined;

/**
 * Assign a media stream to a <video> element.
 *
 * @param {HTMLVideoElement} video
 * @param {MediaStream} stream
 */
export const _setStream = createSetStream();

export class ScanError extends Error {
  constructor(msg) {
    super(...arguments);
    this.name = 'ScanError';
    this.message = msg;
  }
}
