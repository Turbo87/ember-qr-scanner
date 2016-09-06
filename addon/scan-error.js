export default class ScanError extends Error {
  constructor(msg) {
    super(...arguments);
    this.name = 'ScanError';
    this.message = msg;
  }
}
