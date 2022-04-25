document.addEventListener('DOMContentLoaded', (event) => {

  // lists and variables
  /* Junbi Sogi 0, Juchoom Sogi 1, Ap Sogi 2, Ap Kubi 3, Are Makki 4, Montong Makki 5, Olgul Makki 6, Momtong Jireugi 7, Ap Chagi 8
  */
  techniques = ['Junbi Seogi', 'Juchoom Seogi', 'Ap Seogi', 'Ap Kubi','Arae Makki', 'Momtong Makki', 'Olgul Makki', 'Momtong Jireugi', 'Ap Chagi']
  techniques_english = ['Ready Stance', 'Riding Stance', 'Walking Stance', 'Forward Stance', 'Low Block', 'Middle Block', 'High Block', 'Middle Punch', 'Front Kick']
  steps = [[null,0],[4,2],[7,2],[4,2],[7,2],[4,3],[7,null],[5,2],[7,2],[5,2],[7,2],[4,3],[7,null],[6,2],[8,null],[7,2],[6,2],[8,null],[7,2],[4,3],[7,3], [null,0]];
  step = 0;
  clips = ['0.mp4', '1.mp4','2.mp4','3.mp4','4.mp4','5.mp4','6.mp4','7.mp4','8.mp4','9.mp4','10.mp4','11.mp4', '12.mp4','13.mp4','14.mp4','15.mp4','16.mp4','17.mp4','18.mp4','19.mp4','20.mp4','21.mp4']
  wrong_guesses = 0;
  score = 0;
  number_of_choices = 5;
  plus_points_init = 10;
  plus_points = plus_points_init;
  minus_points = 10;
 

  // event listeners
  document.querySelector('#submitbutton').addEventListener('click', submit_answer)
  document.querySelector('#levelOne').addEventListener('click', levelOne);
  document.querySelector('#levelTwo').addEventListener('click', levelTwo);
  document.querySelector('#levelThree').addEventListener('click', levelThree);

  function levelOne() {
    number_of_choices = 3
    minus_points -= 5; // reduce minus points to 5 for level one

    document.querySelector('#input4_1').style.visibility = 'hidden';
    document.querySelector('#input4_1').style.visibility = 'hidden';
    document.querySelector('#input4_2').style.visibility = 'hidden';
    document.querySelector('#input4_2').style.visibility = 'hidden';
    document.querySelector('#input5_1').style.visibility = 'hidden';
    document.querySelector('#input5_1').style.visibility = 'hidden';
    document.querySelector('#input5_2').style.visibility = 'hidden';
    document.querySelector('#input5_2').style.visibility = 'hidden';
    startGame();
  }
  function levelTwo() {
    number_of_choices = 4

    document.querySelector('#input5_1').style.visibility = 'hidden';
    document.querySelector('#input5_1').style.visibility = 'hidden';
    document.querySelector('#input5_2').style.visibility = 'hidden';
    document.querySelector('#input5_2').style.visibility = 'hidden';

    startGame();
  }
  function levelThree() {
    number_of_choices = 5
    plus_points_init += 1;

    var point_timer = setInterval(decrement_plus_points, 2000);
    document.querySelector('#pointsProgress').hidden = false

    startGame();
  }

  function startGame() {
    var audio = new Audio('static/startup.mp3')
    audio.play()
    document.querySelector('#score').innerHTML = score;
    populate_answers()
    document.querySelector('#start_btn_container').style.display = 'none';
    document.querySelector('#score_h5').hidden = false;
    document.querySelector('#submit_div').hidden = false;
    play_current_step();

  }

  function submit_answer() {
    correct = true
    if (steps[step][0] != null) {

      if (document.forms.form1.elements['technique'].value == '') {
        return; // if technique expected but not checked, return
      }
      if (techniques[steps[step][0]] != document.forms.form1.elements['technique'].value) {
        correct = false
      }

    }

    if (steps[step][1] != null) {
      if(document.forms.form2.elements['stance'].value == '') {
        return;
      } // if stance expected but not checked, return

      if (techniques[steps[step][1]] != document.forms.form2.elements['stance'].value) {
        correct = false
      }
    }

    if (correct == true) {
      blink('lightgreen')
      var audio = new Audio('static/correct.wav')
      audio.play()
      if (wrong_guesses == 0) {
        score += plus_points;
      }
      wrong_guesses = 0;
      document.querySelector('#score').innerHTML = score;
      step ++

      

      if (step == steps.length) {
        console.log("Game Over")
        var audio = new Audio('static/woohoo.wav')
        audio.play()
        game_over()
        
      }
      // then game is over
      populate_answers();
      play_current_step()
    } else { // if correct != true
      blink('lightpink')
      var audio = new Audio('static/denied.wav');
      audio.play();
      wrong_guesses ++;

      // highlight correct answer if two or more wrong answers and level 1

      if (steps[step][0] != null && wrong_guesses >= 2 && number_of_choices == 3) { 
        for (i=1; i <= number_of_choices; i++) {
          if (document.querySelector('#label'+ i +'_1').innerHTML == techniques[steps[step][0]]) {
            document.querySelector('#label'+ i +'_1').style.color = 'red'
          }
        }
      }
      console.log("stance value" +steps[step][1])
      if (steps[step][1] != null && wrong_guesses >= 2 && number_of_choices == 3) { 
        for (i=1; i <= number_of_choices; i++) {
          if (document.querySelector('#label'+ i +'_2').innerHTML == techniques[steps[step][1]]) {
            document.querySelector('#label'+ i +'_2').style.color = 'red'
          }
        }

      }
 
      score -= minus_points;
      
      if (score < 0) {
        score = 0;
      }
      document.querySelector('#score').innerHTML = score;
    }
  }


  // while step < steps.length
  // populate answers
  // wait for player to press enter
  // if wrong answer play wrong sound and wait for answer again
  // if right answer:
  //   play right sound
  //   increment step counter
  //   load next video
  //   play next video
  //   populate answers
  //   wait for player to press enter
  //  if step = steps.length
  //  play sound
  //  display game over, game score, play again button
  function populate_answers() {
    

    // check for valid technique
    if (steps[step][0] != null) {
      document.querySelector('#form1').hidden = false
      answers = [];
      answers[0] = techniques[steps[step][0]]; // put the correct answer into the array
      fill_random_answers()
      populate(1)


    } else {
      document.querySelector('#form1').hidden = true
    }
    

    // check for valid stance
    if (steps[step][1] != null) {
      document.querySelector('#form2').hidden = false
      answers = [];
      answers[0] = techniques[steps[step][1]]; // put the correct answer into the array
      fill_random_answers()
      populate(2)


    } else {
      document.querySelector('#form2').hidden = true
    }
    //console.log('value: ' + document.forms.form2.elements['stance'].value)

    function fill_random_answers() {  
      // fill array with random and unique answers
      i = 1;
      while (i < number_of_choices) {
        item = random_item(techniques);
        if (!answers.includes(item)) {
          answers.push(item);
          i++
        }
      }    
      // shuffle
      answers_shuffled = [...answers]
      shuffle(answers_shuffled);
    }
      
    function populate(form) {  

      for (i = 0; i < number_of_choices; i++) {
        document.querySelector('#label' + (i+1) + '_' + form).innerHTML = answers_shuffled[i];
        document.querySelector('#input' + (i+1) + '_' + form).value = answers_shuffled[i];
        document.querySelector('#input' + (i+1) + '_' + form).checked = false;
        document.querySelector('#label' + (i+1) + '_' + form).style.color = 'black';
      } 
      plus_points = plus_points_init;

 
    }

   }
    
  function decrement_plus_points() {
    plus_points -= 1;
    if (plus_points < 0) {
      plus_points = 0;
    }

    document.querySelector('#pointsBar').style.width = (plus_points * 10) + '%'
    console.log('plus_points: ' + plus_points)
  }

  function play_current_step() {
    var vid = document.getElementById('video')
    document.querySelector('#video_source').src = 'static/' + clips[step]
    console.log('static/' + clips[step])
    vid.load()
    vid.controls = false;
    vid.play();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
  }
  

  function print_form_value() {
    console.log(document.forms.form1.elements['technique'].value)


  }

  function blink(color) {
    var f = document.querySelector('body');
    f.style.backgroundColor = color;
    setTimeout(function() {
       f.style.backgroundColor = 'white';
    }, 50);
 }
 function game_over() {
   document.querySelector('.container_form').style.display = 'none'
   document.querySelector('.container_video').style.display = 'none'
   document.querySelector('#submit_div').style.display = 'none'
   document.querySelector('#score_h5').style.display = 'none'
   document.querySelector('.container_game_over').hidden = false
   document.querySelector('#final_score').innerHTML = score
   document.querySelector('#pointsProgress').hidden = true
   
  
      
 }
 

})