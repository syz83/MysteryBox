var alert = function () { return };

(function () {

    function refreshAuthDisplay () {
        alert(client);
        var isLoggedIn;
        if (client) {
            isLoggedIn = client.currentUser !== null;
        }
        if (isLoggedIn) {
            $("#logged-in").show();
            $("#logged-out").hide();
        }
        else {
            $("#logged-in").hide();
            $("#logged-out").show();
        }

        if (isLoggedIn) {


            client.currentUser.getIdentities({
                success: function (identities) {
                    alert(identities.facebook.accessToken);
                    $("#login-name").text(identities.facebook.accessToken);
                }
            });
        }
    }

    function logIn () {
        client.login("facebook").done(function (results) {

            alert("on login " + results.level);

            refreshAuthDisplay();

        }, function (error) {
            alert(error);
        });
    }

    function logOut () {
        client.logout();
        refreshAuthDisplay();
        $('#summary').html('<strong>You must login to access data.</strong>');
    }

    // On page init, fetch the data and set up event handlers
    $(function () {
        refreshAuthDisplay();
        $('#summary').html('<strong>You must login to access data.</strong>');
        $("#logged-out button").click(logIn);
        $("#logged-in button").click(logOut);
    });

})();
  