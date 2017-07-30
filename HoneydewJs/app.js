'use strict';
var seneca = require('seneca')();

seneca.use('./modules/bunsen.js');

console.log('Starting HoneydewJs');

seneca.listen(8487, 'localhost');
