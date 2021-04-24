document.addEventListener('DOMContentLoaded', (event) => {

  // lists and variables
  /* Junbi Sogi 0, Juchoom Sogi 1, Ap Sogi 2, Ap Kubi 3, Are Makki 4, Montong Makki 5, Olgul Makki 6, Momtong Jireugi 7, Ap Chagi 8
  */
  techniques = ['Junbi Sogi', 'Juchoom Sogi', 'Ap Sogi', 'Ap Kubi','Arae Makki', 'Momtong Makki', 'Olgul Makki', 'Momtong Jireugi', 'Ap Chagi']
  steps = [[null,0],[4,2],[7,2],[4,2],[7,2],[4,3],[7,null],[5,2],[7,2],[5,2],[7,2],[4,3],[7,null],[6,2],[8,null],[7,2],[6,2],[8,null],[7,2],[4,3],[7,3], [null,0]];
  step = 0;
  clips = ['0.mp4', '1.mp4','2.mp4','3.mp4','4.mp4','5.mp4','6.mp4','7.mp4','8.mp4','9.mp4','10.mp4','11.mp4', '12.mp4','13.mp4','14.mp4','15.mp4','16.mp4','17.mp4','18.mp4','19.mp4','20.mp4','21.mp4']
  wrong_guesses = 0;
  score = 100;

  // event listeners
  document.querySelector('#submitbutton').addEventListener('click', submit_answer)
  document.querySelector('#startbutton').addEventListener('click', startGame);
  

  function startGame() {
    var audio = new Audio('static/startup.mp3')
    audio.play()
    document.querySelector('#score').innerHTML = score;
    populate_answers()
    document.querySelector('#startbutton').style.visibility = 'hidden';
    play_current_step();

  }

  function submit_answer() {
    correct = true
    if (steps[step][0] != null) {
       if (techniques[steps[step][0]] != document.forms.form1.elements['technique'].value) {
        correct = false
      }
    }
    if (steps[step][1] != null) {
      if (techniques[steps[step][1]] != document.forms.form2.elements['stance'].value) {
        correct = false
      }
    }

    if (correct == true) {
      blink('lightgreen')
      var audio = new Audio('static/correct.wav')
      audio.play()
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
    } else {
      blink('lightpink')
      var audio = new Audio('static/denied.wav');
      audio.play();
      wrong_guesses ++;
      score -= 5;
      document.querySelector('#score').innerHTML = score;
      if (score <= 0) {
        game_over()
        
      }
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
    console.log('value: ' + document.forms.form2.elements['stance'].value)

    function fill_random_answers() {  
      // fill array with random and unique answers
      i = 1;
      while (i < 5) {
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

      document.querySelector('#label1_' + form).innerHTML = answers_shuffled[0];
      document.querySelector('#input1_' + form).value = answers_shuffled[0];
      document.querySelector('#label2_' + form).innerHTML = answers_shuffled[1];
      document.querySelector('#input2_' + form).value = answers_shuffled[1];
      document.querySelector('#label3_' + form).innerHTML = answers_shuffled[2];
      document.querySelector('#input3_' + form).value = answers_shuffled[2];
      document.querySelector('#label4_' + form).innerHTML = answers_shuffled[3];
      document.querySelector('#input4_' + form).value = answers_shuffled[3];
      document.querySelector('#label5_' + form).innerHTML = answers_shuffled[4];
      document.querySelector('#input5_' + form).value = answers_shuffled[4];

      ["input1_", "input2_", "input3_", "input4_", "input5_"].forEach(function(id) {
        document.getElementById(id + form).checked = false;
      });
    }

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

   
  
      
 }
 

})