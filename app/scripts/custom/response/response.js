/* global Tc,window */
(function ($,window) {
	'use strict';
	Tc.Module.Response = Tc.Module.extend({
		onDataReceived: function (response) {
			var $ctx = this.$ctx.trigger('show'),
				config = this.sandbox.getConfig(),
				$map = $ctx.find('#jvectormap'),
				$thisIs = $ctx.find('.js-this-is__city'),
				jvectormapConfig = config.jvectormap;
			if (response.data.lang === 'en') {
				jvectormapConfig.series.regions[0].values = this.getRegions(response.data.places);
			}
			jvectormapConfig.markers = this.getMarker(response.data.places, config);
			jvectormapConfig.onViewportChange = function (event, number) {
				$map.attr('data-zoomlevel', Math.round(number));
			};
			jvectormapConfig.onMarkerLabelShow = function (event, label) {
				$thisIs.text($(label).text());
			};
			$map.empty().vectorMap(jvectormapConfig);
			this.setCsvDownloadButton($ctx, response.data.csv);
			this.setKmlDownloadButton($ctx, response.data.kml);
			this.setUsername($ctx, response.data.username);
			this.pushState(response.url);
            this.setStats($ctx,response.data.stats);
		},
		setUsername: function ($ctx, username) {
			$ctx.find('.js-username').text(username);
		},
		pushState: function (url) {
			var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?url=' + url;
			if (window.history && window.history.pushState) {
				window.history.pushState('', '', newUrl);
			}
		},
		getMarker: function (array, config) {
			var markers = [];
			$.each(array, function (index, value) {
				var marker = {
					'style': config.been,
					'latLng': [value.lat, value.lng],
					'name': value.name
				};
				if ($.inArray('want', value.flags) !== -1) {
					marker.style = config.want;
				}
				if ($.inArray('fave', value.flags) !== -1) {
					marker.style = config.fave;
				}
				markers.push(marker);
			});
			return markers;
		},
		getRegions: function (array) {
			var regions = {};
			$.each(array, function (index, value) {
				var iso = value.iso;
				if (iso === '') {
					return;
				}
				if (typeof regions[iso] === 'undefined') {
					regions[iso] = 1;
				} else {
					regions[iso]++;
				}
			});
			return regions;
		},
		countCountries: function (list) {
			var coutryList = [];
			$.each(list, function (index, value) {
				if ($.inArray(value.country, coutryList) === -1) {
					if ($.inArray('been', value.flags) !== -1) {
						coutryList.push(value.country);
					}
				}
			});
			return coutryList.length;
		},
		setStats : function($ctx,stats){

			$ctx.find('.js-stats-bar .country').text(stats.country);
            $ctx.find('.js-stats-bar .city').text(stats.city);
            $ctx.find('.js-stats-bar .percent').text((stats.country/193*100).toFixed(2)+'%');
		},
		setKmlDownloadButton: function ($ctx, kml) {
			console.log(kml);
            $ctx.find('.js-download-bar__button__kml').attr('href', kml);


		},
		setCsvDownloadButton: function ($ctx, csv) {
			console.log(csv);
			$ctx.find('.js-download-bar__button__csv').attr('href', csv);

		},

		on: function (callback) {
			var $ctx = this.$ctx,
				config = this.sandbox.getConfig(),
				mod = this;
			this.sandbox.subscribe('Tracking', this);
			$ctx.on({
				'hide': function () {
					$ctx.removeClass(config.classNames.block);
					$ctx.addClass(config.classNames.isHidden);
				},
				'show': function () {
					$ctx.removeClass(config.classNames.isHidden);
					$ctx.addClass(config.classNames.block);
				}
			});
			callback();
		},
		onError: function () {
			this.$ctx.trigger('hide');
		}
	});
})(Tc.$,window);