'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la librería de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== 'function')
    throw TypeError('executor must be a function');

  this._state = 'pending';
  $Promise.prototype._internalResolve = () => {};
  $Promise.prototype._internalReject = () => {};
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos escribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
