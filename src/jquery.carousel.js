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
		frame_selector: '.js-carousel-frame',
		items_selector: '.js-carousel-items',
		item_selector: '.js-carousel-item',

		prevButton_selector: '.js-carousel-prev',
		nextButton_selector: '.js-carousel-next',

		pointer_selector: '.js-carousel-pointer',
		point_selector: '.js-carousel-point',


		pointer: true,

		distance: null,
		duration: 300//,
		//stopEndPoint: true,
		//loop: true
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this._prepareElms();
		this._eventify();

		this.distance = this.options.distance || this._getDistance();
		this.point = 0;
		this.max_point = this.$item.length - 1; // TODO 一度に何個かずらすとき

		this.$items.css({ position: 'relative' });

		if (this.options.pointer) {
			this._createPointer();
		}


		this.$item.last().prependTo(this.$items);
		var left = this.distance * -1;
		this.$items.css({ left: left });
		this.$item = this.$items.find(this.options.item_selector);
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
		var o = this.options;

		this.$frame = this.$el.find(o.frame_selector);
		this.$items = this.$el.find(o.items_selector);
		this.$item = this.$el.find(o.item_selector);

		this.$prev = this.$el.find(o.prevButton_selector);
		this.$next = this.$el.find(o.nextButton_selector);

		this.$pointer = this.$el.find(o.pointer_selector);
		this.$point = this.$el.find(o.point_selector);
	};

	/**
	 * _getDistance
	 */
	fn._getDistance = function () {
		// [TODO] margin, padding, etc...
		return this.$item.width();
	};


	/**
	 * _createPointer
	 */
	fn._createPointer = function () {
		var _this = this;
		var $point = this.$point.first();

		this.$pointer.html('');

		$.each(this.$item, function () {
			_this.$pointer.append($point.clone());
		});

		this.$point = this.$pointer.find(this.options.point_selector);
		this._updatePointer();
	};


	/**
	 * _updatePointer
	 */
	fn._updatePointer = function () {
		this.$point.removeClass('current');
		this.$point.eq(this.point).addClass('current');
	};


	/**
	 * moveTo
	 * @param {Number} point 移動したいpoint
	 */
	fn.moveTo = function (point) {
	};

	/**
	 * toPrev
	 */
	fn.toPrev = function () {
		var _this = this;
		var duration = this.options.duration;
		var easing = this.options.easing;

		var prev = ( this.hasPrev() ) ? this.point - 1 : this.max_point;

		var _left = this.distance * -1;
		var left = this.distance * -2;


		if (this.$items.is(':animated')) {
			return false;
		}

		this.point = prev;

		this.$el.trigger('carousel:beforemove');

		this._updatePointer();

		this.$item.last().prependTo(_this.$items);
		this.$item = this.$el.find(this.options.item_selector);
		this.$items.css({ left: left });
		

		this.$items.animate({
			left: _left
		}, {
			duration: duration,
			easing: easing,
			done: function () {
				_this.$el.trigger('carousel:aftermove');
			}
		});
	};

	/**
	 * toNext
	 */
	fn.toNext = function () {
		var _this = this;
		var duration = this.options.duration;
		var easing = this.options.easing;

		var next = ( this.hasNext() ) ? this.point + 1 : 0;

		var _left = this.distance * -1;
		var left = this.distance * -2;


		if (this.$items.is(':animated')) {
			return false;
		}

		this.point = next;


		this.$el.trigger('carousel:beforemove');

		this._updatePointer();

		this.$items.animate({
			left: left
		}, {
			duration: duration,
			easing: easing,
			done: function () {
				_this.$item.first().appendTo(_this.$items);
				_this.$item = _this.$el.find(_this.options.item_selector);
				_this.$items.css({ left: _left });
				_this.$el.trigger('carousel:aftermove');
			}
		});
	};

	/**
	 * hasPrev
	 */
	fn.hasPrev = function () {
		return this.point - 1 >= 0;
	};

	/**
	 * hasNext
	 */
	fn.hasNext = function () {
		return this.point + 1 <= this.max_point;
	};


	// ============================================================
	// Event

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		this.$prev.on('click', $.proxy(this._onPrevClick, this));
		this.$next.on('click', $.proxy(this._onNextClick, this));
	};


	/**
	 * _onPrevClick
	 */
	fn._onPrevClick = function () {
		this.toPrev();
	};

	/**
	 * _onNextClick
	 */
	fn._onNextClick = function () {
		this.toNext();
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
