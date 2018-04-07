
// hidden div 
var hiddenDiv = document.querySelector(".hidden");
var userIcon = document.querySelector(".userIcon");
userIcon.addEventListener("click", function() {
    if (hiddenDiv.style.display === "block") {
        event.preventDefault();
        hiddenDiv.style.display = "none";
    } else {
        event.preventDefault();
        hiddenDiv.style.display = "block";
    }
});
// "search here sign"
var h1 = document.getElementById("search-here");
setInterval(function () {
    if (h1.style.color === "red") {
        h1.style.color = "yellow";
    } else {
        h1.style.color = "red";
    }
}, 500)





