function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}


var counterDiv = document.createElement("div");
counterDiv.setAttribute("id", "counterDiv");
counterDiv.setAttribute("class", "w3-container w3-center w3-animate-opacity");
counterDiv.setAttribute("style","background-color: rgb(244,0,6);text-align: center;border-radius: 12px;margin-bottom: 5%;width:90%")
var counterH = document.createElement("h3");
var productDescription = document.getElementsByClassName('rte product-single__description')[0];
counterH.setAttribute("id", "demo");
counterH.setAttribute("style", "color:white;");
//console.log("Ref "+document.referrer);

counterDiv.appendChild(counterH);
productDescription.appendChild(counterDiv);

var countDownDate = new Date().getTime() + 10*60*1000;
createCookie('ppkcookie',countDownDate,7);
var x = readCookie('ppkcookie');
if (x) {
    console.log(x);
}


// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;
//  createCookie('ppkcookie',distance,7);
//var x = readCookie('ppkcookie');//DeleteLater
//if (x) {
//    console.log(x);
//}

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    console.log(hours);
    if(days==0 && hours==0){
        document.getElementById("demo").innerHTML = "Offer Expires in: " + minutes + "m " + seconds + "s ";
    }else if(days==0){
        document.getElementById("demo").innerHTML = "Offer Expires in:  "+ hours + "h " + minutes + "m " + seconds + "s ";
    }else{
        document.getElementById("demo").innerHTML = "Offer Expires in: " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
    }

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
