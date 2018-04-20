function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(42.4924539,27.4804892),
        zoom:18,
        disableDefaultUI: true,
    };
    var map=new google.maps.Map(document.getElementsByClassName('googleMap')[0],mapProp);
}

var hiddenDiv = document.querySelector(".hidden");
var userIcon = document.querySelector(".user");
var menu = document.querySelector(".menu");
var hiddenMenu = document.querySelector(".hidden-menu");
var input = document.querySelector('input[name="search"]');
var advSearch = document.querySelector(".adv-search");
var hiddenContainer = document.querySelector(".hidden-container");
var searchBtn = document.querySelector(".search-btn");

advSearch.addEventListener("click", function(event) {
    if (hiddenContainer.style.display === "block") {
        event.preventDefault();
        hiddenContainer.style.display = "none";
    } else {
        event.preventDefault();
        hiddenContainer.style.display = "block";
    }
})

searchBtn.addEventListener("click", function(event) {
    window.location='results.html'
})

input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        window.location='results.html'
    }
}, false)

menu.addEventListener("click", function(event) {
    event.cancelBubble = true
    if (hiddenMenu.style.display === "block") {
        event.preventDefault();
        hiddenMenu.style.display = "none";
    } else {
        event.preventDefault();
        hiddenMenu.style.display = "block";
    }
})


userIcon.addEventListener("click", function(event) {
    event.cancelBubble = true
    if (hiddenDiv.style.display === "block") {
        event.preventDefault();
        hiddenDiv.style.display = "none";
    } else {
        event.preventDefault();
        hiddenDiv.style.display = "block";
    }
})

hiddenDiv.addEventListener("click", function(event) {
    event.cancelBubble = true
})

document.addEventListener("click", function() {
    hiddenDiv.style.display = "none";
})

window.addEventListener('resize', function(event){
    hiddenMenu.style.display = "none";
    hiddenDiv.style.display = "none";
});

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        700:{
            items:2
        },
        900:{
            items:3
        }
    }
})