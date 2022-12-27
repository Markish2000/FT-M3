'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la librería de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== 'function')
    throw TypeError('executor must be a function');

  this._state = 'pending';
  this._value = undefined;
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled';
    this._value = data;
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === 'pending') {
    this._state = 'rejected';
    this._value = reason;
  }
};

$Promise.prototype.then = function (successHb, errorHb) {
  this._handlerGroups.push({
    successHb: typeof successHb === 'function' ? successHb : false,
    errorHb,
  });
};

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
