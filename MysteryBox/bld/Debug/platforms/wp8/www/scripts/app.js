//var alert = function () { return };

(function () {

    function refreshAuthDisplay () {
        //alert(client);
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

            //Check if current user has been written in User table before
            //if current user is not there, add it
            client.getTable('User').where({ userId: client.currentUser.userId }).read().then(
                function (results) {
                    if (results.length === 0) {
                        var user = {
                            userId: client.currentUser.userId
                        }
                        client.getTable('User').insert(user);
                    }
                    
                }
            );
            // How to make this code wait until top block finishes?
            var userTable = client.getTable('User');
            userTable
                .where({ userId: client.currentUser.userId })
                .read()
                .done(function (results) {
                $("#login-name").text(results[0].UserName);
            });


                    
        }
    }

    function logIn () {
        client.login("facebook").done(function (results) {

            //$("#token-name").val(results.mobileServiceAuthenticationToken)


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
  