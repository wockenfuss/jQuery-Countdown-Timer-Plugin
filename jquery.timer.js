/*
Simple jQuery countdown timer
Displays a countdown in an HTML element.

Can optionally be initialized with a duration and a function to execute
on completion.

*/
(function( $, undefined) {
	var timer = {
		duration: 5, //default time in minutes
		interval: 1000, //timer interval in milliseconds
		callback: function() { //default callback executed on timer completion
			alert("Time's up");
		},
		elapsedTime: function() {
			return (new Date().getTime()) - this.startTime;
		},
		tick: function() {
			var msRemaining = timer.msDuration - timer.elapsedTime();
			timer.display(msRemaining);
			if ( msRemaining <= 0 ) {
				timer.target.trigger('out-of-time');
			} else {
				setTimeout(timer.tick, timer.interval);
			}
		},
		display: function(msRemaining) {
			timer.target.html(timer.timeFormat(msRemaining));
		},
		timeFormat: function(ms) {
			if ( ms < 0 ) {
				return "00:00";
			}
			var padded = ms + 999;
			return timer.hours(padded) + timer.minutes(padded) + ":" + timer.seconds(padded);
		},
		hours: function(time) {
			var hours = Math.floor(time/3600000);
			hours = (hours > 0) ? hours + ":" : "";
			return hours;
		},
		minutes: function(time) {
			return timer.zeroPad(Math.floor( time/60000 ) % 60);
		},
		seconds: function(time) {
			return timer.zeroPad(Math.floor( time/1000 ) % 60);
		},
		zeroPad: function(n) {
			if ( n < 10 ) return "0" + n;
			return "" + n;
		}
	};

	var bind = function() {
		timer.target.on('out-of-time', function() {
			timer.callback();
		});
	};

	var methods = {
		init: function( options ) {
			if ( arguments.length > 1 ) {
				timer.callback = Array.prototype.slice.call( arguments, 1 )[0];
				$.extend(timer, { duration: options });
			} else if ( typeof arguments[0] === 'function' ) {
				timer.callback = arguments[0];
			} else {
				$.extend(timer, { duration: options });
			}
			timer.target = this;
			timer.msDuration = timer.duration * 60000;
			bind();
			timer.display(timer.msDuration);
		},
		start: function() {
			if ( timer.target === undefined ) {
				methods.init.apply( this, arguments );
			}
			timer.startTime = new Date().getTime();
			setTimeout(timer.tick, timer.interval);
		}
	};

  $.fn.timer = function( option ) {
		if ( methods[option] ) {
      return methods[option].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof option === 'function' || typeof option === 'number' || !option ) {
			return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  option + ' does not exist on jQuery.timer' );
    }
  };
})( jQuery );