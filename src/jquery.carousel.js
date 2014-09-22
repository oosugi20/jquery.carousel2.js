;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Carousel';
var PLUGIN_NAME = 'carousel';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this._prepareElms();
		this._eventify();
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
