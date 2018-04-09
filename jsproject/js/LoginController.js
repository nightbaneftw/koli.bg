(function() {

    var loginBtn,
        loginForm;

    function init() {
        console.log('login init');
        loginBtn = document.querySelector('.login-btn');
        loginForm = document.querySelector('.login-form');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                // console.log('login btn click');
                event.stopPropagation();
                loginForm.classList.toggle('hidden');
            });
            loginForm.addEventListener('click', function(event) {
                // console.log('login form click');
                event.stopPropagation();
            });
            document.addEventListener('click', docClick);
        }
    }

    function docClick() {
        //console.log('doc click');
        loginForm.classList.add('hidden');
    }

    function destroy() {
        document.removeEventListener('click', docClick);
    }

    Troshka.registerController('login', {
        init: init,
        destroy: destroy
    });
})();