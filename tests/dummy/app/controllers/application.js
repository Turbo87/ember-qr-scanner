import Ember from 'ember';
import { isSupported } from 'ember-qr-scanner/get-user-media';

export default Ember.Controller.extend({
  isSupported,
});
