(function() {

    function init() {
        console.log('login init');
        var loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                console.log('login btn click');
            });
        }
    }

    Troshka.registerController('login', {
        init: init
    });
})();