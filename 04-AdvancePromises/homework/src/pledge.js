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

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    const group = this._handlerGroups.shift();

    if (this._state === 'fulfilled') {
      if (group.successCb) {
        const result = group.successCb();
      } else {
        group.downstreamPromise._internalResolve(this._value);
      }
    }
    if (this._state === 'rejected' && group.errorCb) group.errorCb(this._value);
  }
};

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled';
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === 'pending') {
    this._state = 'rejected';
    this._value = reason;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  const downstreamPromise = new $Promise(() => {});

  this._handlerGroups.push({
    successCb: typeof successCb === 'function' ? successCb : false,
    errorCb: typeof errorCb === 'function' ? errorCb : false,
    downstreamPromise,
  });
  if (this._state !== 'pending') {
    this._callHandlers(this._value);
  }

  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
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
