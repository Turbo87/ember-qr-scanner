
ember-qr-scanner
==============================================================================

[QR Code](https://en.wikipedia.org/wiki/QR_code) scanner component for
[Ember.js](http://emberjs.com/).


Installation
------------------------------------------------------------------------------

```
ember install ember-qr-scanner
```


Usage
------------------------------------------------------------------------------

```hbs
{{qr-scanner onSuccess=(action (mut result)) onError=(action (mut error))}}
```

The `qr-scanner` component will create a `<canvas>` showing the current camera
stream. Once the component is added to the template it will automatically
request permission from the user to use the camera.

The `onError` callback will be called if either the camera stream could not be
acquired or if the scan of the current video frame did not result in a QR
code. In the second case a `ScanError` instance will be passed to the callback
(available through `import { ScanError } from 'ember-qr-scanner';`).

You can check for browser compatibility by using
`import { isSupported } from 'ember-qr-scanner';` and then checking the
`isSupported` flag.


Links
------------------------------------------------------------------------------

- [ZXing](https://github.com/zxing/zxing) – "Zebra Crossing" barcode image
  processing library for Java
- [LazarSoft/jsqrcode](https://github.com/LazarSoft/jsqrcode) – JavaScript
  port of ZXing
- [edi9999/jsqrcode](https://github.com/edi9999/jsqrcode) – NPM/WebPack port
  of jsqrcode (see [vendor](vendor) folder)
- [webcodecamjs](https://github.com/andrastoth/webcodecamjs) - jsqrcode
  wrapper using the WebRTC APIs


License
-------------------------------------------------------------------------------

`ember-qr-scanner` is licensed under the [MIT License](LICENSE.md).

- [edi9999/jsqrcode](https://github.com/edi9999/jsqrcode) and
  [ZXing](https://github.com/zxing/zxing) are licensed under the Apache 2.0
  License
