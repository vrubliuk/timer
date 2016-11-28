function ShowTimer() {
  document.getElementById("timer").removeAttribute("style");
}
function HideTimer() {
  document.getElementById("timer").style.display = "none";
}
function ShowInputField() {
  document.getElementById("inputField").removeAttribute("style");
}
function HideInputField() {
  document.getElementById("inputField").style.display = "none";
}
function ShowProgressBar() {
  document.getElementById("timeFullBar").removeAttribute("style");
}
function HideProgressBar() {
  document.getElementById("timeFullBar").style.display = "none";
}



function Hover(element) {
 
 
  document.getElementById(element).onmouseover = function () {

    var x = ElementIsActive(element);
    if (x) { document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0.1)";}

    else {

      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)";
    }
   
    // var x = $(this).children('img').attr('src'),
    //     y = "not";
    // var y = x.includes("not");
    // alert(y);
    
  // document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0.1)";
};

document.getElementById(element).onmouseout = function () {
  var x = ElementIsActive(element);
if (x) { document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)"; }

else {

      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)";
    }

};
}
Hover("refresh");
Hover("start-stop");
Hover("edit");

// function noHover(element) {
//   document.getElementById(element).onmouseover = function () {
//      document.getElementById(this).style.backgroundColor = "rgb(255,255,255)";
//     };
// document.getElementById(element).onmouseout = function () {
//   document.getElementById(element).removeAttribute("style");
// };
// }






document.getElementById("start-stop").onclick = function () {
  var x = document.getElementById("img-start").getAttribute("src");
  var y = ElementIsActive("start-stop");
  if (x == "images/start.png" && y) {
    StartTimer(20);
    document.getElementById("img-start").setAttribute("src", "images/stop.png");
    document.getElementById("edit").style.opacity = "0.2";
  }
};


function StartTimer(time) {
  var width = 100;
  var element = document.getElementById("timeLeftBar");
  var x = setInterval(changeWidth, 10);
  function changeWidth() {
    if (width <= 0) {
      clearInterval(x);
      document.getElementById("img-start").setAttribute("src", "images/start.png");
      document.getElementById("edit").style.opacity = "1";
      element.style.width = '100%';
    } else {
      width = width - (100 / time / 100);
      element.style.width = width + '%';
    }
  }
}


//HIDE FOOTER IF WINDOW IS SMALL
window.addEventListener("resize", function () {
  var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
 
  if ( h <= 350 ) {
    document.getElementById("footer").style.display = "none";
  } else {
    document.getElementById("footer").removeAttribute("style");
  }

});


function ElementIsActive(element) {
  var x = document.getElementById(element);
  var style = window.getComputedStyle(x);
  var op = style.getPropertyValue('opacity');
  if ( op == 1 ) {
    return true;
  }
}
//WHEN CLICK EDIT/DONE BUTTON
document.getElementById("edit").onclick = function () {
   var x = document.getElementById("img-edit").getAttribute("src");
   var active = ElementIsActive("edit");
  if (x == "images/edit.png" && active ) {  
    HideTimer();
    ShowInputField();
    HideProgressBar();
    document.getElementById("start-stop").style.opacity = "0.2";
    document.getElementById("img-refresh").setAttribute("src", "images/back.png");
    document.getElementById("img-edit").setAttribute("src", "images/done.png");
    document.getElementById("edit").style.opacity = "0.2";
  
    
  } else if (x == "images/done.png" && active ) {
      HideInputField();
      ShowTimer();
      ShowProgressBar();
      document.getElementById("img-refresh").setAttribute("src", "images/refresh.png");
    document.getElementById("img-edit").setAttribute("src", "images/edit.png");
    document.getElementById("start-stop").style.opacity = "1";

      var hours = document.getElementById("hoursInput").value;
      var minutes = document.getElementById("minutesInput").value;
      var seconds = document.getElementById("secondsInput").value;
      var corectedHours = CorrectInputValue(hours);
      var corectedMinutes = CorrectInputValue(minutes);
      var corectedSeconds = CorrectInputValue(seconds);

      document.getElementById("hours").innerHTML = corectedHours;
      document.getElementById("minutes").innerHTML = corectedMinutes;
      document.getElementById("seconds").innerHTML = corectedSeconds;
      document.getElementById("hoursInput").value = "0";
    document.getElementById("minutesInput").value = "0";
    document.getElementById("secondsInput").value = "0";

  }

function CorrectInputValue (value) { 
  var x = value.length;
  if (x == 1) {
    value = "0" + value;
    return value;
  } else {
    return value;
  }
 }


};
//WHEN CLICK REFRESH/BACK BUTTON
document.getElementById("refresh").onclick = function () {
  var x = document.getElementById("img-refresh").getAttribute("src");
  if ( x == "images/back.png" ) {
    HideInputField();
    ShowTimer();
    ShowProgressBar();
    document.getElementById("img-refresh").setAttribute("src", "images/refresh.png");
    document.getElementById("img-edit").setAttribute("src", "images/edit.png");
    document.getElementById("start-stop").style.opacity = "1";
    document.getElementById("edit").style.opacity = "1";
    document.getElementById("hoursInput").value = "0";
    document.getElementById("minutesInput").value = "0";
    document.getElementById("secondsInput").value = "0";

  }

};







window.onload = function () {
  ShowTimer();
};

//INPUT VALIDATION. ONLY DIGITS ARE ALLOWED TO BE ENTERED
$('input').keypress(function (e) {
  if (e.which != 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }
});


document.getElementById("hoursInput").onfocus = function () {
  var minutes = document.getElementById("hoursInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("hoursInput").value = "";
  }
};
document.getElementById("hoursInput").onblur = function () {
  var minutes = document.getElementById("hoursInput").value;
  if (minutes.length === 0) {
    document.getElementById("hoursInput").value = "0";
  }
};
document.getElementById("minutesInput").onfocus = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("minutesInput").value = "";
  }
};
document.getElementById("minutesInput").onblur = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (minutes.length === 0) {
    document.getElementById("minutesInput").value = "0";
  }
};
document.getElementById("secondsInput").onfocus = function () {
  var minutes = document.getElementById("secondsInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("secondsInput").value = "";
  }
};
document.getElementById("secondsInput").onblur = function () {
  var minutes = document.getElementById("secondsInput").value;
  if (minutes.length === 0) {
    document.getElementById("secondsInput").value = "0";
  }
};



//CORRECTION FOR USER'S INPUT FOR MINUTES AND SECONDS
document.getElementById("minutesInput").onkeypress = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes[0]) > 5) {
    document.getElementById("minutesInput").value = 59;
  }
};
document.getElementById("secondsInput").onkeypress = function () {
  var seconds = document.getElementById("secondsInput").value;
  if (parseInt(seconds[0]) > 5) {
    document.getElementById("secondsInput").value = 59;
  }
};


//MAKE SAVE BUTTON ACTIVE ONLY IF TIME IS ENTERED AND MORE THAN ZERO 
function checkHours() {
  var hours = document.getElementById("hoursInput").value;
  if (parseInt(hours) > 0) {
    return true;
  } else if (parseInt(hours) === 0 || hours.length === 0) {
    return false;
  }
}
function checkMinutes() {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes) > 0) {
    return true;
  } else if (parseInt(minutes) === 0 || minutes.length === 0) {
    return false;
  }
}
function checkSeconds() {
  var seconds = document.getElementById("secondsInput").value;
  if (parseInt(seconds) > 0) {
    return true;
  } else if (parseInt(seconds) === 0 || seconds.length === 0) {
    return false;
  }
}
document.getElementById("hoursInput").onkeyup = checkEntered;
document.getElementById("minutesInput").onkeyup = checkEntered;
document.getElementById("secondsInput").onkeyup = checkEntered;
function checkEntered() {
  var x = checkHours();
  var y = checkMinutes();
  var z = checkSeconds();
  if (x || y || z) {
    document.getElementById("edit").style.opacity = "1";
   
  } else if (!x && !y && !z) {
    document.getElementById("edit").style.opacity = "0.3";
    
  }
}

