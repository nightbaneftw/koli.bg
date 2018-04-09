(function() {
    
    function init() {
        console.log('about init');
    }

    Troshka.registerController('about', {
        init: init
    });
})();