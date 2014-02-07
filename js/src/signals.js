(function ($) {
	'use strict';

	// Simple pub/sub pattern
	bu.signals = (function () {
		var api = {};

		// Attach a callback function to respond for the given event
		api.listenFor = function (event, callback) {
			var listeners = this._listeners;
			if (listeners[event] === undefined) {
				listeners[event] = [];
			}

			listeners[event].push(callback);
		};

		// Broadcast a specific event, optionally providing context data
		api.broadcast = function (event, data) {
			var i, listeners = this._listeners;
			if (listeners[event]) {
				for (i = 0; i < listeners[event].length; i = i + 1) {
					listeners[event][i].apply(this, data || []);
				}
			}
		};

		// Objects that wish to broadcast signals must register themselves first
		return {
			register: function (obj) {
				obj._listeners = {};
				$.extend(true, obj, api);
			}
		};
	}());
}(jQuery));
