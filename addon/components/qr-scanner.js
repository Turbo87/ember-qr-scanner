import Ember from 'ember';
import QRCode from 'jsqrcode';

import { getUserMedia, _setStream, ScanError } from 'ember-qr-scanner';

export default Ember.Component.extend({
  tagName: 'video',
  attributeBindings: ['width','height'],

  frameRate: 30,

  init() {
    this._super(...arguments);

    let qr = new QRCode();
    this.set('qr', qr);
  },

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, '_start');
  },

  willRemoveElement() {
    this._cancelRun();
  },

  _start() {
    // Request camera access via getUserMedia()
    this.requestCameraAccess().then(stream => {

      // Get the <video> element
      let video = this.element;

      // Create <canvas> element
      let canvas = document.createElement('canvas');
      canvas.style.display = "none";
      canvas.width = this.get("width");
      canvas.height = this.get("height");

      // Attach media stream to the <video> element
      _setStream(video, stream);
      video.play();

      // Schedule a _run() execution
      this._scheduleRun(canvas);

    }).catch(error => {
      this.getWithDefault('onError', Ember.K)(error);
    });
  },

  findBackFacingCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return Ember.RSVP.Promise.resolve();
    }

    return navigator.mediaDevices.enumerateDevices().then(devices => {
      return devices.filter(device => device.kind === 'videoinput' || device.kind === 'video')
        .filter(device => (/back|environment/).test(device.label))
        .map(device => device.deviceId)[0];
    });
  },

  requestCameraAccess() {
    if (!getUserMedia) {
      return Ember.RSVP.Promise.reject(new Error('getUserMedia() is not available in this browser'));
    }

    return this.findBackFacingCamera().then(deviceId => {
      return getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
          deviceId,
          optional: [{
            sourceId: deviceId,
          }],
        }
      });
    });
  },

  _scheduleRun(canvas) {
    let frameRate = this.get('frameRate');
    this.set('timerId', Ember.run.later(this, '_run', canvas, 1E3 / frameRate));
  },

  _cancelRun() {
    let timerId = this.get('timerId');
    if (timerId) {
      Ember.run.cancel(timerId);
    }
  },

  _run(canvas) {
    let video = this.element;
    if (!video.paused && !video.ended) {
      let context = canvas.getContext('2d');

      // Transfer image from <video> element to the <canvas>
      context.drawImage(video, 0, 0);

      // Read image data from <canvas>
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Detect QR code on <canvas> image
      try {
        let result = this.get('qr').process(imageData);
        this.get('onSuccess')(result);
      } catch (error) {
        this.getWithDefault('onError', Ember.K)(new ScanError(error));
      }
    }

    // Schedule next _run() execution
    this._scheduleRun(canvas);
  },
});
