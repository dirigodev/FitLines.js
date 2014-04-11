/*global jQuery */
/*!
* FitLines.js 1.0
*
* Copyright 2014, Dirigo Design & Development http://github.com/dirigodev
* Released under the MIT license
*
*/

(function ($) {

    $.fn.fitLines = function (options) {

        // Setup options
        var settings = $.extend({
                'createLines' : true,
                'threshold'   : 0
            }, options);

        return this.each(function () {

            // Store the object
            var $this = $(this),
                lines;

            if (settings.createLines) {
              lines = $this.text().split('\n');
              $this.empty();

              $(lines).each(function () {
                  if (this.match(/\w/g)) {
                      $this.append('<div><span>' + this.trim() + '</span></div>');
                  }
              });
            } else {
              lines = $this.find('div');

              $(lines).each(function () {
                  $(this).html('<span>' + $(this).text().trim() + '</span>');
              });
            }

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                var $lines = $this.find('div'),
                    maxWidth = $this.width();

                $lines.each(function () {
                    var $el = $('span', this),
                        width = $el.width(),
                        fontSize = $this.css('fontSize');

                    if (fontSize < settings.minFontSize) {
                        $el.css('fontSize', minFontSize);
                    }

                    while (width < maxWidth - settings.threshold) {

                        $el.css('fontSize', '+=1');
                        width = $el.width();

                    }

                });
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fitlines orientationchange.fitlines', resizer);

        });

    };

})(jQuery);
