// global variables
var num_puzzles = 6; // number of puzzles used in this game
var puzzles_solved = 0; // n umber of puzzles solved
var audio = new Audio('static/sounds/button.wav');
var open = new Audio('static/sounds/open.wav');
var denied = new Audio('static/sounds/denied.wav');
var tada = new Audio('static/sounds/woohoo.wav');

// clues variables
var current_clue = 0;
var clues = ['1.png','2.png','3.png','4.png','5.png']

// puzzle 1 variables
var p1_combo = [1,2,3,4];
var p1_btn1 = 0;
var p1_btn2 = 0;
var p1_btn3 = 0;
var p1_btn4 = 0;
var p1_list = [0,1,2,3,4,5,6,7,8,9]

// puzzle 2 variables
var p2_combo = [6,7,2,5];
var p2_btn1 = 0;
var p2_btn2 = 0;
var p2_btn3 = 0;
var p2_btn4 = 0;
var p2_list = ['A','C','E','F','K','N','O','P','S','Y']

// puzzle 3 variables
var p3_combo = [1,0,3,2];
var p3_btn1 = 0;
var p3_btn2 = 0;
var p3_btn3 = 0;
var p3_btn4 = 0;
var p3_list = ['red','blue','green','yellow','pink','purple','cyan','orange']

// puzzle 4 variables
var p4_combo = [0,1,2,3];
var p4_btn1 = 0;
var p4_btn2 = 0;
var p4_btn3 = 0;
var p4_btn4 = 0;
var p4_list = ['1.png','2.png','3.png','4.png']
// can use this puzzle question with shape sprites as well

// puzzle 5 variables
var p5_btns = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var p5_combo = [0,0,1,0,0,1,1,0,1,0,0,1,0,0,0,0]

// puzzle 6 variables
var p6_count = 0;
var p6_combo = [0,1,1,0,1,0]

// puzzle 7 variables
var p7_combo = [3,5,1,7];
var p7_btn1 = 0;
var p7_btn2 = 0;
var p7_btn3 = 0;
var p7_btn4 = 0;
var p7_list = ['360.png','45.png','90.png','135.png','180.png','225.png','270.png','315.png']

// puzzle 8 variables
var p8_count = 0;
var p8_combo = [0,1,3,3,2]

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and ready');


    // event listeners for clues nav buttons
    document.querySelector('#left-btn').addEventListener("click", scrollLeft);
    document.querySelector('#right-btn').addEventListener("click", scrollRight);
    /*
    // event listeners for puzzle 1
    document.querySelector('#p1-btn1').addEventListener("click", p1Btn1);
    document.querySelector('#p1-btn2').addEventListener("click", p1Btn2);    
    document.querySelector('#p1-btn3').addEventListener("click", p1Btn3);    
    document.querySelector('#p1-btn4').addEventListener("click", p1Btn4);
    document.querySelector('#p1-btn5').addEventListener("click", p1Btn5);

    // event listeners for puzzle 2
    document.querySelector('#p2-btn1').addEventListener("click", p2Btn1);
    document.querySelector('#p2-btn2').addEventListener("click", p2Btn2);    
    document.querySelector('#p2-btn3').addEventListener("click", p2Btn3);    
    document.querySelector('#p2-btn4').addEventListener("click", p2Btn4);
    document.querySelector('#p2-btn5').addEventListener("click", p2Btn5);
*/
    // event listeners for puzzle 3
    document.querySelector('#p3-btn1').addEventListener("click", p3Btn1);
    document.querySelector('#p3-btn2').addEventListener("click", p3Btn2);    
    document.querySelector('#p3-btn3').addEventListener("click", p3Btn3);    
    document.querySelector('#p3-btn4').addEventListener("click", p3Btn4);
    document.querySelector('#p3-btn5').addEventListener("click", p3Btn5);

    // event listeners for puzzle 4
    document.querySelector('#p4-btn1').addEventListener("click", p4Btn1);
    document.querySelector('#p4-btn2').addEventListener("click", p4Btn2);    
    document.querySelector('#p4-btn3').addEventListener("click", p4Btn3);    
    document.querySelector('#p4-btn4').addEventListener("click", p4Btn4);
    document.querySelector('#p4-btn5').addEventListener("click", p4Btn5);

    // event listeners for puzzle 5
    const buttons = document.querySelectorAll(".grid-button")
    for (const button of buttons) {
        button.addEventListener("click", p5GridButtonPressed);
    }
    document.querySelector('#p5-btn16').addEventListener("click", p5Btn16);

    // event listeners for puzzle 6
    const lr_buttons = document.querySelectorAll(".lr-button")
    for (const lr_button of lr_buttons) {
        lr_button.addEventListener("click", p6LRButtonClick);
    }
    for (const lr_button of lr_buttons) {
        lr_button.addEventListener("mousedown", p6LRButtonMousedown);
    }   
    document.querySelector('#p6-btn2').addEventListener("click", p6Btn2);

    // event listeners for puzzle 7
    document.querySelector('#p7-btn1').addEventListener("click", p7Btn1);
    document.querySelector('#p7-btn2').addEventListener("click", p7Btn2);    
    document.querySelector('#p7-btn3').addEventListener("click", p7Btn3);    
    document.querySelector('#p7-btn4').addEventListener("click", p7Btn4);
    document.querySelector('#p7-btn5').addEventListener("click", p7Btn5);

    // event listeners for puzzle 8
    document.querySelector('#p8-btn0').addEventListener("click", p8Btn0click);
    document.querySelector('#p8-btn0').addEventListener("mousedown", p8Btn0mousedown);
    document.querySelector('#p8-btn1').addEventListener("click", p8Btn1click);
    document.querySelector('#p8-btn1').addEventListener("mousedown", p8Btn1mousedown);
    document.querySelector('#p8-btn2').addEventListener("click", p8Btn2click);
    document.querySelector('#p8-btn2').addEventListener("mousedown", p8Btn2mousedown);
    document.querySelector('#p8-btn3').addEventListener("click", p8Btn3click);
    document.querySelector('#p8-btn3').addEventListener("mousedown", p8Btn3mousedown);


});

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
function p1Btn1() {
    audio.play();
    p1_btn1++;
    if (p1_btn1 == p1_list.length) {
        p1_btn1 = 0;
    }
    this.innerHTML = p1_list[p1_btn1];
}
function p1Btn2() {
    audio.play();
    p1_btn2++;
    if (p1_btn2 == p1_list.length) {
        p1_btn2 = 0;
    }
    this.innerHTML = p1_list[p1_btn2];
}
function p1Btn3() {
    audio.play();
    p1_btn3++;
    if (p1_btn3 == p1_list.length) {
        p1_btn3 = 0;
    }
    this.innerHTML = p1_list[p1_btn3];
}
function p1Btn4() {
    audio.play();
    p1_btn4++;
    if (p1_btn4 == p1_list.length) {
        p1_btn4 = 0;
    }
    this.innerHTML = p1_list[p1_btn4];
}
function p1Btn5() {
    if (p1_btn1 == p1_combo[0] && p1_btn2 == p1_combo[1] && p1_btn3 == p1_combo[2] && p1_btn4 == p1_combo[3]) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p1-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p1-box').style.bottom = '0px';
        document.querySelector('#p1-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p1-answer').innerHTML = 'Answer';
        }  
      }
    }
    document.querySelector('#nav-btn1').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }

// puzzle 2 functions
function p2Btn1() {
    audio.play();
    p2_btn1++;
    if (p2_btn1 == p2_list.length) {
        p2_btn1 = 0;
    }
    this.innerHTML = p2_list[p2_btn1];
}
function p2Btn2() {
    audio.play();
    p2_btn2++;
    if (p2_btn2 == p2_list.length) {
        p2_btn2 = 0;
    }
    this.innerHTML = p2_list[p2_btn2];
}
function p2Btn3() {
    audio.play();
    p2_btn3++;
    if (p2_btn3 == p2_list.length) {
        p2_btn3 = 0;
    }
    this.innerHTML = p2_list[p2_btn3];
}
function p2Btn4() {
    audio.play();
    p2_btn4++;
    if (p2_btn4 == p2_list.length) {
        p2_btn4 = 0;
    }
    this.innerHTML = p2_list[p2_btn4];
}
function p2Btn5() {
    if (p2_btn1 == p2_combo[0] && p2_btn2 == p2_combo[1] && p2_btn3 == p2_combo[2] && p2_btn4 == p2_combo[3]) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
    var id = setInterval(frame, 350);
    function frame() {
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p2-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p2-box').style.bottom = '0px';
        document.querySelector('#p2-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p2-answer').innerHTML = 'Answer';
        }  
      }
    }
    document.querySelector('#nav-btn2').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }

  // puzzle 3 functions

function p3Btn1() {
    audio.play();
    p3_btn1++;
    if (p3_btn1 == p3_list.length) {
        p3_btn1 = 0;
    }
    this.style.backgroundColor = p3_list[p3_btn1];
}
function p3Btn2() {
    audio.play();
    p3_btn2++;
    if (p3_btn2 == p3_list.length) {
        p3_btn2 = 0;
    }
    this.style.backgroundColor = p3_list[p3_btn2];
}
function p3Btn3() {
    audio.play();
    p3_btn3++;
    if (p3_btn3 == p3_list.length) {
        p3_btn3 = 0;
    }
    this.style.backgroundColor = p3_list[p3_btn3];
}
function p3Btn4() {
    audio.play();
    p3_btn4++;
    if (p3_btn4 == p3_list.length) {
        p3_btn4 = 0;
    }
    this.style.backgroundColor = p3_list[p3_btn4];
}
function p3Btn5() {
    if (p3_btn1 == p3_combo[0] && p3_btn2 == p3_combo[1] && p3_btn3 == p3_combo[2] && p3_btn4 == p3_combo[3]) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p3-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p3-box').style.bottom = '0px';
        document.querySelector('#p3-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p3-answer').src = "static/images/6.png";
        }  
      }
    }
    document.querySelector('#nav-btn3').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }

  // puzzle 4 functions
function p4Btn1() {
    audio.play();
    p4_btn1++;
    if (p4_btn1 == p4_list.length) {
        p4_btn1 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p4_list[p4_btn1];
}
function p4Btn2() {
    audio.play();
    p4_btn2++;
    if (p4_btn2 == p4_list.length) {
        p4_btn2 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p4_list[p4_btn2];
}
function p4Btn3() {
    audio.play();
    p4_btn3++;
    if (p4_btn3 == p4_list.length) {
        p4_btn3 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p4_list[p4_btn3];
}
function p4Btn4() {
    audio.play();
    p4_btn4++;
    if (p4_btn4 == p4_list.length) {
        p4_btn4 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p4_list[p4_btn4];
}
function p4Btn5() {
    if (p4_btn1 == p4_combo[0] && p4_btn2 == p4_combo[1] && p4_btn3 == p4_combo[2] && p4_btn4 == p4_combo[3]) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p4-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p4-box').style.bottom = '0px';
        document.querySelector('#p4-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p4-answer').src = 'static/images/9.png';
        }  
      }
    }
    document.querySelector('#nav-btn4').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }

  // puzzle 5 functions
function p5GridButtonPressed() {
    audio.play()
    if (p5_btns[this.id.slice(6,)] == 0) {
        p5_btns[this.id.slice(6,)] = 1;
        this.style.backgroundColor = 'white';
    }
    else {
        p5_btns[this.id.slice(6,)] = 0;
        this.style.backgroundColor = 'grey'
    }
}

function p5Btn16() {
    if (JSON.stringify(p5_btns) == JSON.stringify(p5_combo)) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
        document.querySelector('#p5-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p5-box').style.bottom = '0px';
        document.querySelector('#p5-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p5-answer').src = 'static/images/7.png';
        }  
      }
    }
    document.querySelector('#nav-btn5').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }    
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
        
    }
    else {
        p6_count = 0;
    }
    console.log(p6_count);
}
function p6Btn2() {
    if (p6_count == p6_combo.length) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p6-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p6-box').style.bottom = '0px';
        document.querySelector('#p6-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p6-answer').innerHTML = 'Solved!';
        }  
      }
    }
    document.querySelector('#nav-btn6').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }
  
    // puzzle 7 functions
function p7Btn1() {
    audio.play();
    p7_btn1++;
    if (p7_btn1 == p7_list.length) {
        p7_btn1 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p7_list[p7_btn1];
}
function p7Btn2() {
    audio.play();
    p7_btn2++;
    if (p7_btn2 == p7_list.length) {
        p7_btn2 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p7_list[p7_btn2];
}
function p7Btn3() {
    audio.play();
    p7_btn3++;
    if (p7_btn3 == p7_list.length) {
        p7_btn3 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p7_list[p7_btn3];
}
function p7Btn4() {
    audio.play();
    p7_btn4++;
    if (p7_btn4 == p7_list.length) {
        p7_btn4 = 0;
    }
    this.firstElementChild.src = "static/sprites/" + p7_list[p7_btn4];
}
function p7Btn5() {
    if (p7_btn1 == p7_combo[0] && p7_btn2 == p7_combo[1] && p7_btn3 == p7_combo[2] && p7_btn4 == p7_combo[3]) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
      if (pos == 2) {
        clearInterval(id);
      } else {
        pos++;
        document.querySelector('#p7-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p7-box').style.bottom = '0px';
        document.querySelector('#p7-box').style.left = '30px';
        if (pos == 2) {
            //document.querySelector('#p7-answer').innerHTML = 'Answer';
            document.querySelector('#p7-answer').src = 'static/images/8.png';
        }  
      }
    }
    document.querySelector('#nav-btn7').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
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
    }
    else {
        p8_count = 0;
    }
    console.log("p8_count: " + p8_count);
    if (p8_count == p8_combo.length) {
        open.onended = function() {
            //document.querySelector('#box').src = "part_open.png";
            //document.querySelector('#box').src = "open.png";
            //document.querySelector('#box').style.bottom = '0px';
            //document.querySelector('#box').style.left = '30px';
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
        document.querySelector('#p8-box').src = "static/sprites/" + pos + "open.png";
        document.querySelector('#p8-box').style.bottom = '0px';
        document.querySelector('#p8-box').style.left = '30px';
        if (pos == 2) {
            document.querySelector('#p8-answer').innerHTML = 'Solved!';
        }  
      }
    }
    document.querySelector('#nav-btn8').style.color = 'lime';
    puzzles_solved ++
    if (puzzles_solved == num_puzzles) {
        document.querySelector('#congratulations').style.color='yellow';
        tada.play();
    }
  }