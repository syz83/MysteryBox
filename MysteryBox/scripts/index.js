// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var client = new WindowsAzure.MobileServiceClient(
            "https://mysterybox.azure-mobile.net/",
            "AGQgGfjAHCUDhIcMxQZSEzgQWQdQoB30"
        );

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


    item.UserName = "<unknown>"; // default
    user.getIdentities({
        success: function (identities) {
            var req = require('request');
            if (identities.facebook) {
                var fbAccessToken = identities.facebook.accessToken;
                var url = 'https://graph.facebook.com/me?access_token=' + fbAccessToken;
                req(url, function (err, resp, body) {
                    if (err || resp.statusCode !== 200) {
                        console.error('Error sending data to FB Graph API: ', err);
                        request.respond(statusCodes.INTERNAL_SERVER_ERROR, body);
                    } else {
                        try {
                            var userData = JSON.parse(body);
                            item.UserName = userData.name;
                            request.execute();
                        } catch (ex) {
                            console.error('Error parsing response from FB Graph API: ', ex);
                            request.respond(statusCodes.INTERNAL_SERVER_ERROR, ex);
                        }
                    }
                });
            } else {
                // Insert with default user name
                request.execute();
            }
        }
    });
