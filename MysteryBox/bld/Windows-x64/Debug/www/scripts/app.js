(function() {

    function refreshAuthDisplay () {
        alert(client);
        var isLoggedIn;
        if (client) {
            isLoggedIn = client.currentUser !== null;
            alert("it worked");
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
            $("#login-name").text(client.currentUser.userId);
        }
    }

    function logIn () {
        client.login("facebook").then(refreshAuthDisplay, function (error) {
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
        alert('bye');
        refreshAuthDisplay();
        $('#summary').html('<strong>You must login to access data.</strong>');
        $("#logged-out button").click(logIn);
        $("#logged-in button").click(logOut);
    });

})();
  