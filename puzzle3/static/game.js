// global variables
var codehash = -862611903
var num_puzzles = 6; // number of puzzles used in this game
var puzzles_solved = 0; // n umber of puzzles solved
var audio = new Audio('static/sounds/button.wav');
var open = new Audio('static/sounds/open.wav');
var denied = new Audio('static/sounds/denied.wav');
var tada = new Audio('static/sounds/woohoo.wav');
var no = new Audio('static/sounds/no.wav');
var welcome = new Audio('static/sounds/welcome.wav');
var moan = new Audio('static/sounds/moan.wav');

// clues variables
var current_clue = 0;
var clues = ['1.png', '2.png', '3.png', '4.png', '5.png']

// puzzle 1 variables
var p1_combo = [6,4,2,8];
var p1_btns = [0,0,0,0] ;
var p1_list = [0,1,2,3,4,5,6,7,8,9];

// puzzle 2 variables
var p2_combo = [2,6,9,3];
var p2_btns = [0,0,0,0]
var p2_list = ['A','C','D','E','H','N','O','P','U','V']

// puzzle 3 variables
var p3_combo = [6,3,7,2];
var p3_btns = [0,0,0,0];
var p3_list = ['red','blue','lightgreen','yellow','pink','purple','skyblue','orange']

// puzzle 4 variables
var p4_combo = [0,1,2,3];
var p4_btns = [0,0,0,0];
var p4_list = ['1.png','2.png','3.png','4.png']
// can use this puzzle question with shape sprites as well

// puzzle 5 variables
var p5_btns = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var p5_combo = [1,1,0,1,1,0,1,0,0,1,1,0,1,0,0,1]

// puzzle 6 variables
var p6_count = 0;
var p6_combo = [1,0,0,1,1] // L=0, R=1

// puzzle 7 variables
var p7_combo = [0,1,2,3];
var p7_btns = [0,0,0,0];
var p7_list = ['360.png','45.png','90.png','135.png','180.png','225.png','270.png','315.png']

// puzzle 8 variables
var p8_count = 0;
var p8_combo = [0,1,2,3,0,3] // TL,TR,BR,BL

// puzzle 9 variables
var p9_count = 0;
var p9_combo = [0,1,2,3,1,3] // TL,TR,BR,BL

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and ready');

    // event listener for codeword submit
    document.querySelector('#submit').addEventListener("click", checkCodeWord);
    document.querySelector('#codeword').addEventListener("change", checkCodeWord);


    // event listeners for clues nav buttons
    document.querySelector('#left-btn').addEventListener("click", scrollLeft);
    document.querySelector('#right-btn').addEventListener("click", scrollRight);
    
    // event listeners for puzzle 1
    document.querySelector('#p1-btn0').addEventListener("click", p1Btns);
    document.querySelector('#p1-btn1').addEventListener("click", p1Btns);    
    document.querySelector('#p1-btn2').addEventListener("click", p1Btns);    
    document.querySelector('#p1-btn3').addEventListener("click", p1Btns);
    document.querySelector('#p1-btnE').addEventListener("click", p1BtnE);

    // event listeners for puzzle 2
    document.querySelector('#p2-btn0').addEventListener("click", p2Btns);
    document.querySelector('#p2-btn1').addEventListener("click", p2Btns);    
    document.querySelector('#p2-btn2').addEventListener("click", p2Btns);    
    document.querySelector('#p2-btn3').addEventListener("click", p2Btns);
    document.querySelector('#p2-btnE').addEventListener("click", p2BtnE);

    // event listeners for puzzle 3
    document.querySelector('#p3-btn0').addEventListener("click", p3Btns);
    document.querySelector('#p3-btn1').addEventListener("click", p3Btns);    
    document.querySelector('#p3-btn2').addEventListener("click", p3Btns);    
    document.querySelector('#p3-btn3').addEventListener("click", p3Btns);
    document.querySelector('#p3-btnE').addEventListener("click", p3BtnE);

    // event listeners for puzzle 4
/*    document.querySelector('#p4-btn0').addEventListener("click", p4Btns);
    document.querySelector('#p4-btn1').addEventListener("click", p4Btns);    
    document.querySelector('#p4-btn2').addEventListener("click", p4Btns);    
    document.querySelector('#p4-btn3').addEventListener("click", p4Btns);
    document.querySelector('#p4-btnE').addEventListener("click", p4BtnE); */

    // event listeners for puzzle 5
    const buttons = document.querySelectorAll(".grid-button")
    for (const button of buttons) {
        button.addEventListener("click", p5GridButtonPressed);
    }
    document.querySelector('#p5-btnE').addEventListener("click", p5BtnE);

    // event listeners for puzzle 6
    const lr_buttons = document.querySelectorAll(".lr-button")
    for (const lr_button of lr_buttons) {
        lr_button.addEventListener("click", p6LRButtonClick);
    }
    for (const lr_button of lr_buttons) {
        lr_button.addEventListener("mousedown", p6LRButtonMousedown);
    }   
    document.querySelector('#p6-btnE').addEventListener("click", p6BtnE);

    // event listeners for puzzle 7
  /*  document.querySelector('#p7-btn0').addEventListener("click", p7Btns);
    document.querySelector('#p7-btn1').addEventListener("click", p7Btns);    
    document.querySelector('#p7-btn2').addEventListener("click", p7Btns);    
    document.querySelector('#p7-btn3').addEventListener("click", p7Btns);
    document.querySelector('#p7-btnE').addEventListener("click", p7BtnE); */

    // event listeners for puzzle 8
    document.querySelector('#p8-btn0').addEventListener("click", p8Btn0click);
    document.querySelector('#p8-btn0').addEventListener("mousedown", p8Btn0mousedown);
    document.querySelector('#p8-btn1').addEventListener("click", p8Btn1click);
    document.querySelector('#p8-btn1').addEventListener("mousedown", p8Btn1mousedown);
    document.querySelector('#p8-btn2').addEventListener("click", p8Btn2click);
    document.querySelector('#p8-btn2').addEventListener("mousedown", p8Btn2mousedown);
    document.querySelector('#p8-btn3').addEventListener("click", p8Btn3click);
    document.querySelector('#p8-btn3').addEventListener("mousedown", p8Btn3mousedown);

    // event listeners for puzzle 9
  /*  const square_buttons = document.querySelectorAll(".square-button")
    for (const square_button of square_buttons) {
        square_button.addEventListener("click", p9BtnClick);
    }
    for (const square_button of square_buttons) {
        square_button.addEventListener("mousedown", p9BtnMousedown);
    }   
    document.querySelector('#p9-btnE').addEventListener("click", p9BtnE); */

});

// check code word
function checkCodeWord() {
    if (stringToHash(document.querySelector('#codeword').value.toLowerCase()) == codehash) {
        console.log("Correct code word");
        document.querySelector('.wrapper').style.display='block';
        document.querySelector('.code').style.display='none';
        welcome.play();
    }
    else {
        document.querySelector('#codeword').value = '';
        no.play();
    }
}
function stringToHash(string) { 
    var hash = 0; 
    if (string.length == 0) return hash; 
      
    for (i = 0; i < string.length; i++) { 
        char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
    } 
    return hash; 
} 

// check if all puzzles are solved
function check_all_solved() {
    console.log("num_puzzles: " + num_puzzles + " puzzles_solved: " + puzzles_solved);
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.display='block';
        tada.play();
    }
}

  // clues functions
  function scrollRight() {
    current_clue ++;
    if (current_clue == clues.length) {
        current_clue = 0;
    }
    document.querySelector('#clue-img').src = 'static/images/' + clues[current_clue];
  }
  function scrollLeft() {
    current_clue --;
    if (current_clue < 0) {
        current_clue = clues.length-1;
    }
    document.querySelector('#clue-img').src = 'static/images/' + clues[current_clue];
  }

// puzzle 1 functions
function p1Btns() {
    audio.play();
    var n = this.id.slice(6,)
    p1_btns[n] ++
    if (p1_btns[n] == p1_list.length) {
        p1_btns[n] = 0;
    }
    this.innerHTML = p1_list[p1_btns[n]]
}

function p1BtnE() {
    if (JSON.stringify(p1_combo) == JSON.stringify(p1_btns)) {
        open.onended = function() {
            p1OpenSafe();
        }
        open.play();
    }
    else {
        denied.play();
    }
}
function p1OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 1) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p1-box').src = "static/sprites/box_open.png";
        document.querySelector('#p1-box').style.bottom = '0px';
        document.querySelector('#p1-box').style.left = '30px';
        if (pos == 1) {
            document.querySelector('#p1-answer').style.top = '70px';
            document.querySelector('#p1-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p1-btn0').removeEventListener("click", p1Btns);
    document.querySelector('#p1-btn1').removeEventListener("click", p1Btns);    
    document.querySelector('#p1-btn2').removeEventListener("click", p1Btns);    
    document.querySelector('#p1-btn3').removeEventListener("click", p1Btns);
    document.querySelector('#p1-btnE').removeEventListener("click", p1BtnE);
    document.querySelector('#nav-btn1').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

// puzzle 2 functions
function p2Btns() {
    audio.play();
    var n = this.id.slice(6,)
    p2_btns[n] ++
    if (p2_btns[n] == p2_list.length) {
        p2_btns[n] = 0;
    }
    this.innerHTML = p2_list[p2_btns[n]]
}
 
function p2BtnE() {
    if (JSON.stringify(p2_combo) == JSON.stringify(p2_btns)) {
        open.onended = function() {
            p2OpenSafe();
        }
        open.play();
    }
    else {
        denied.play();
    }
}
function p2OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 150);
    moan.play()
    function frame() {
      if (pos == 22) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p2-box').src = "static/sprites/hand/" + pos + "open.jpg";
        document.querySelector('#p2-box').style.bottom = '0px';
        document.querySelector('#p2-box').style.left = '30px';
        if (pos == 22) {
            document.querySelector('#p2-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p2-btn0').removeEventListener("click", p2Btns);
    document.querySelector('#p2-btn1').removeEventListener("click", p2Btns);    
    document.querySelector('#p2-btn2').removeEventListener("click", p2Btns);    
    document.querySelector('#p2-btn3').removeEventListener("click", p2Btns);
    document.querySelector('#p2-btnE').removeEventListener("click", p2BtnE);
    document.querySelector('#nav-btn2').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

  // puzzle 3 functions

function p3Btns() {
    audio.play();
    var n = this.id.slice(6,)
    p3_btns[n] ++
    if (p3_btns[n] == p3_list.length) {
        p3_btns[n] = 0;
    }
    this.style.backgroundColor = p3_list[p3_btns[n]]
}

function p3BtnE() {
    if (JSON.stringify(p3_combo) == JSON.stringify(p3_btns)) {
        open.onended = function() {
            p3OpenSafe();
        }
        open.play();
    }
    else {
        denied.play();
    }
}

function p3OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 1) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p3-box').src = "static/sprites/box2_open.jpg";
        document.querySelector('#p3-box').style.bottom = '0px';
        document.querySelector('#p3-box').style.left = '30px';
        if (pos == 1) {
            document.querySelector('#p3-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p3-btn0').removeEventListener("click", p3Btns);
    document.querySelector('#p3-btn1').removeEventListener("click", p3Btns);    
    document.querySelector('#p3-btn2').removeEventListener("click", p3Btns);    
    document.querySelector('#p3-btn3').removeEventListener("click", p3Btns);
    document.querySelector('#p3-btnE').removeEventListener("click", p3BtnE);
    document.querySelector('#nav-btn3').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

  // puzzle 4 functions
  function p4Btns() {
    audio.play();
    var n = this.id.slice(6,)
    p4_btns[n] ++
    if (p4_btns[n] == p4_list.length) {
        p4_btns[n] = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p4_list[p4_btns[n]]
}

function p4BtnE() {
    if (JSON.stringify(p4_combo) == JSON.stringify(p4_btns)) {
        open.onended = function() {
            p4OpenSafe();
        }
        open.play();
    }
    else {
        denied.play();
    }
}  

function p4OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 1) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p4-box').src = "static/sprites/box3_open.jpg";
        document.querySelector('#p4-box').style.bottom = '0px';
        document.querySelector('#p4-box').style.left = '30px';
        if (pos == 1) {
            document.querySelector('#p4-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p4-btn0').removeEventListener("click", p4Btns);
    document.querySelector('#p4-btn1').removeEventListener("click", p4Btns);    
    document.querySelector('#p4-btn2').removeEventListener("click", p4Btns);    
    document.querySelector('#p4-btn3').removeEventListener("click", p4Btns);
    document.querySelector('#p4-btnE').removeEventListener("click", p4BtnE);
    document.querySelector('#nav-btn4').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

  // puzzle 5 functions
function p5GridButtonPressed() {
    audio.play()
    if (p5_btns[this.id.slice(6,)] == 0) {
        p5_btns[this.id.slice(6,)] = 1;
        this.style.backgroundColor = 'grey';
    }
    else {
        p5_btns[this.id.slice(6,)] = 0;
        this.style.backgroundColor = 'white'
    }
}

function p5BtnE() {
    if (JSON.stringify(p5_btns) == JSON.stringify(p5_combo)) {
        open.onended = function() {
            p5OpenSafe();
       }
       open.play();
   }
    else {
        denied.play();
    }
}
function p5OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p5-box').src = "static/sprites/" + pos + "hatch_open.png";
        document.querySelector('#p5-box').style.bottom = '0px';
        document.querySelector('#p5-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p5-answer').style.display = 'block';
        }  
      }
    }
    const buttons = document.querySelectorAll(".grid-button")
    for (const button of buttons) {
        button.removeEventListener("click", p5GridButtonPressed);
    }
    document.querySelector('#p5-btnE').removeEventListener("click", p5BtnE);
    document.querySelector('#nav-btn5').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();  
  }
  

    // puzzle 6 functions
function p6LRButtonMousedown() {
    this.style.borderColor = "white"
}

function p6LRButtonClick() {
    audio.play()
    this.style.borderColor = "black"

    if (p6_combo[p6_count] == this.id.slice(6,) && this.id.slice(6,) < p6_combo.length) {
        p6_count ++
    } else {
        p6_count = 0;
    }
    console.log(p6_count);
}
function p6BtnE() {
    if (p6_count == p6_combo.length) {
        open.onended = function() {
            p6OpenSafe();
       }
       open.play();
   }
    else {
        denied.play();
        p6_count = 0;
    }
}
function p6OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 1) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p6-box').src = "static/sprites/box4_open.jpg";
        document.querySelector('#p6-box').style.bottom = '0px';
        document.querySelector('#p6-box').style.left = '30px';
        if (pos == 1) {
            document.querySelector('#p6-answer').style.display = 'block';
        }  
      }
    }
    const lr_buttons = document.querySelectorAll(".lr-button")
    for (const lr_button of lr_buttons) {
        lr_button.removeEventListener("click", p6LRButtonClick);
    }
    for (const lr_button of lr_buttons) {
        lr_button.removeEventListener("mousedown", p6LRButtonMousedown);
    }   
    document.querySelector('#p6-btnE').removeEventListener("click", p6BtnE);
    document.querySelector('#nav-btn6').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }
  
    // puzzle 7 functions
function p7Btns() {
        audio.play();
        var n = this.id.slice(6,)
        p7_btns[n] ++
        if (p7_btns[n] == p7_list.length) {
            p7_btns[n] = 0;
        }
        this.firstElementChild.src = "static/sprites/" + p7_list[p7_btns[n]]
    }
    
function p7BtnE() {
        if (JSON.stringify(p7_combo) == JSON.stringify(p7_btns)) {
            open.onended = function() {
                p7OpenSafe();
            }
            open.play();
        }
        else {
            denied.play();
        }
    }    

function p7OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 1) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p7-box').src = "static/sprites/box5_open.jpg";
        document.querySelector('#p7-box').style.bottom = '0px';
        document.querySelector('#p7-box').style.left = '30px';
        if (pos == 1) {
            document.querySelector('#p7-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p7-btn0').removeEventListener("click", p7Btns);
    document.querySelector('#p7-btn1').removeEventListener("click", p7Btns);    
    document.querySelector('#p7-btn2').removeEventListener("click", p7Btns);    
    document.querySelector('#p7-btn3').removeEventListener("click", p7Btns);
    document.querySelector('#p7-btnE').removeEventListener("click", p7BtnE);
    document.querySelector('#nav-btn7').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

  // puzzle 8 functions
  function p8Btn0mousedown() {
    document.querySelector('#painting').style.top = '-5px';
    document.querySelector('#painting').style.left = '-5px';
  }
  function p8Btn0click() {
    document.querySelector('#painting').style.top = '0px';
    document.querySelector('#painting').style.left = '0px';
    p8BtnClick(this.id);
  }
  function p8Btn1mousedown() {
    document.querySelector('#painting').style.top = '-5px';
    document.querySelector('#painting').style.left = '5px';
  }
  function p8Btn1click() {
    document.querySelector('#painting').style.top = '0px';
    document.querySelector('#painting').style.left = '0px';
    p8BtnClick(this.id);
  }
  function p8Btn2mousedown() {
    document.querySelector('#painting').style.top = '5px';
    document.querySelector('#painting').style.left = '5px';
  }
  function p8Btn2click() {
    document.querySelector('#painting').style.top = '0px';
    document.querySelector('#painting').style.left = '0px';
    p8BtnClick(this.id);
  }
  function p8Btn3mousedown() {
    document.querySelector('#painting').style.top = '5px';
    document.querySelector('#painting').style.left = '-5px';
  }
  function p8Btn3click() {
    document.querySelector('#painting').style.top = '0px';
    document.querySelector('#painting').style.left = '0px';
    p8BtnClick(this.id);
  }
  function p8BtnClick(e) {
    audio.play()
    console.log(e);
    if (p8_combo[p8_count] == e.slice(6,)) {
        p8_count ++
    } else {
        p8_count = 0
        if (p8_combo[p8_count] == e.slice(6,)) {
            p8_count ++;
        }
        
    }
    console.log("p8_count: " + p8_count);
    if (p8_count == p8_combo.length) {
        open.onended = function() {
           p8OpenSafe();
       }
       open.play();
    } 
  }
  function p8OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p8-box').src = "static/sprites/box6_open.jpg";
        document.querySelector('#p8-box').style.bottom = '0px';
        document.querySelector('#p8-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p8-answer').style.display = 'block';
        }  
      }
    }
    document.querySelector('#p8-btn0').removeEventListener("click", p8Btn0click);
    document.querySelector('#p8-btn0').removeEventListener("mousedown", p8Btn0mousedown);
    document.querySelector('#p8-btn1').removeEventListener("click", p8Btn1click);
    document.querySelector('#p8-btn1').removeEventListener("mousedown", p8Btn1mousedown);
    document.querySelector('#p8-btn2').removeEventListener("click", p8Btn2click);
    document.querySelector('#p8-btn2').removeEventListener("mousedown", p8Btn2mousedown);
    document.querySelector('#p8-btn3').removeEventListener("click", p8Btn3click);
    document.querySelector('#p8-btn3').removeEventListener("mousedown", p8Btn3mousedown);
    document.querySelector('#nav-btn8').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }

// puzzle 9 functions
function p9BtnMousedown() {
    this.style.borderColor = "white"
}

function p9BtnClick() {
    audio.play()
    console.log(this.id)
    this.style.borderColor = "black"

    if (p9_combo[p9_count] == this.id.slice(6,) && this.id.slice(6,) < p9_combo.length) {
        p9_count ++
    }
    else {
        p9_count = 0;
    }
    console.log(p9_count);
}
function p9BtnE() {
    if (p9_count == p9_combo.length) {
        open.onended = function() {
           p9OpenSafe();
       }
       open.play();
   }
    else {
        denied.play();
        p9_count = 0;
    }
}
function p9OpenSafe() {
    var pos = 0;
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p9-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p9-box').style.bottom = '0px';
        document.querySelector('#p9-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p9-answer').style.display = 'block';
        }  
      }
    }
    const square_buttons = document.querySelectorAll(".square-button")
    for (const square_button of square_buttons) {
        square_button.removeEventListener("click", p9BtnClick);
    }
    for (const square_button of square_buttons) {
        square_button.removeEventListener("mousedown", p9BtnMousedown);
    }   
    document.querySelector('#p9-btnE').removeEventListener("click", p9BtnE);
    document.querySelector('#nav-btn9').style.color = 'lime';
    puzzles_solved ++
    check_all_solved();
  }
 