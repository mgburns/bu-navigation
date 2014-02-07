(function ($) {
	'use strict';

	// Simple filter mechanism, modeled after Plugins API
	// @todo partially implemented
	bu.hooks = (function () {
		var filters = {};

		return {
			addFilter: function (name, func) {
				if (filters[name] === undefined) {
					filters[name] = [];
				}

				filters[name].push(func);
				return this;

			},
			applyFilters: function (name, obj) {
				if (filters[name] === undefined) {
					return obj;
				}

				var args = Array.prototype.slice.apply(arguments),
					extra = args.slice(1),
					rslt = obj,
					i;

				for (i = 0; i < filters[name].length; i = i + 1) {
					rslt = filters[name][i].apply(this, extra);
				}

				return rslt;
			}
		};
	}());
}(jQuery));
