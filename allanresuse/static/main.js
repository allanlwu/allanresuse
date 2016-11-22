define(['jquery', 'base/js/utils'], function ($, utils) {
    function createDisplayDiv() {
        $('#maintoolbar-container').append(
            $('<div>').attr('id', 'allanresuse-display')
                      .addClass('btn-group')
                      .addClass('pull-right')
            .append(
                $('<strong>').text('Upload to GDrive: ')
            ).append(
                $('<span>').attr('id', 'allanresuse-mem')
                           .attr('title', 'Manually upload to Google Drive')
            )
        );
    }

    var displayMetrics = function() {
        $.getJSON(utils.get_body_data('baseUrl') + 'metrics', function(data) {
            // FIXME: Proper setups for MB and GB. MB should have 0 things
            // after the ., but GB should have 2.
            var display = str((data['rss'] / (1024 * 1024)).toFixed(0)) + " MB";

            if (data['limits']['mem'] !== null) {
                display += " / " + (data['limits']['mem'] / (1024 * 1024));
            }
            $('#allanresuse-mem').text(display);
        });
    }

    var load_ipython_extension = function () {
        createDisplayDiv();
        displayMetrics();
        // Update every five seconds, eh?
        setInterval(displayMetrics, 1000 * 5);
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});