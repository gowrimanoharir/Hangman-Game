
/*Define Global variables that would be used for the entire Game*/

//Define the Dictionary
  var dictionary=['jarvis','mjolnir', 'xandar', 'asgard',
'tesseract', 'wakanda', 'ragnarok', 'infinitystones', 'vibranium', 'ultron', 'hydra'];

//Define the hints corresponding to dictionary words
  var hints={'jarvis':'Iron Man\'s AI',
              'mjolnir':'The Hammer!!', 
              'xandar':'Capital of Nova Empire where the Guardians first met', 
              'asgard':'Norse God\'s home', 
              'tesseract':'Holds the Space stone', 
              'wakanda':'Black Panther rules!!', 
              'ragnarok':'Forthcoming Thor\'s great battle', 
              'infinitystones':'There are six of these', 
              'vibranium':'Captain\'s shield is made of...',
              'ultron':'Rogue supervillain robot', 
              'hydra': 'Criminal organization in Marvel world or a bug that keeps spawning new bugs in dev world'};

//Define the image subtext
  var livestext=['YOU GOT EATEN!!', 'Its close', 'Maybe I should run', 'He has not seen me yet', 'uh..oh..', 
  '(ominous music continues...)', '(ominous music plays..)', 'On a nice sunny day']

//Define scores
  var wins=0;
  var losses=0;

/*Define Global variables that would be used for each round of  
play*/
  var dispWord, letters, pst, guesses, ltr, curWord,
  isWin, totWords, curHint;
  
/*Start the game*/
playHangman();

/*Define the game function*/
function playHangman()
{ 
  totWords=dictionary.length;
	currentRoundInitialize();
       
  document.onkeyup = function(e)
  {
    ltr=e.key.toLowerCase();
    wantmore.innerHTML="";

    if(!isGameOver())
    {  
      if(isWin===true || guesses===0)
      {
          currentRoundInitialize();        
      }
      else if(!(isAlpha(ltr)))
      { 
        wantmore.style.background="#393e46";
        wantmore.innerHTML="Not a valid letter";
      }
      else if(isPlayed(ltr))
      { 
        wantmore.style.background="#393e46";
        wantmore.innerHTML="<b>"+ltr.toUpperCase()+"</b> has already been played";
      }
      else if(guesses>0 && isWin!=true && isAlpha(ltr))
      {
         currentRoundPlay(ltr);
      }
    }
    }
} 	


/*Function for initializing variables & display for 
current round of play*/

function currentRoundInitialize()
{
  dispWord=null;
  letters=[];
  pst=[];
  guesses = 7;
  ltr;
  curWord=dictionary.pop(); 
  curHint=hints[curWord];
  isWin=null;

  dispWord=Array(curWord.length+1).join('_');
  play.style.color="#FFDC1A"
  play.innerHTML="<b>"+dispWord.split("").join(" ")+"</b>";
  lives.innerHTML=livestext[guesses];
  win.innerHTML=wins;
  lose.innerHTML=losses;
  letter.style.color="red"
  letter.innerHTML='';
  wantmore.innerHTML="";
  theword.innerHTML="";
  hinttext.innerHTML="";
  hangimg.src="assets/images/init.png";
  hangimg.alt="on a sunny day";
}

/*Function to calculate wins & lives for current
round of play*/

function currentRoundPlay(ltr)
{  
    
    //finds the position of current input in play word
    pst=findPosition(curWord, ltr);

    //checks to see if keyin is not already pressed
    if ((!(dispWord.includes(ltr)))&&(!(letters.includes(ltr))))
    {      

        //if keyin is part of current word adds it to display word
        if (pst.length>0)
         {
           dispWord=displayWord(dispWord, pst, ltr);
        }
        //if keyin is not part of current word adds it to letters missed and reduces lives
        else if(!(letters.includes(ltr))){
          guesses=guesses-1;
          changeImg(guesses);
          letters.push(ltr);
        }

        if(guesses<3)
        {
          hinttext.style.color="#ffe44d";
          hinttext.innerHTML="HINT:  " + curHint;
        }
    }
    
    //calculates the win & losses comparing display and current word
    
      if(dispWord===curWord)
      {
        wins=wins+1;
        win.innerHTML=wins;
        isWin=true;
      }
      else if(guesses===0)
      {
        losses=losses+1;
        lose.innerHTML=losses;
      }
    
    //calls the function to update the display for current keyin
    currentRoundDisplay();
}

/*Function to update display for current round*/

function currentRoundDisplay()  
{
    
    letter.innerHTML=letters.join(" ").toUpperCase();
    play.innerHTML=dispWord.split("").join(" ").toUpperCase();
    lives.innerHTML=livestext[guesses];  
    if(isWin===true || guesses===0 || isGameOver())
    {   
        //to check if current round or the game is over
        if(isGameOver())
        {
          console.log=isGameOver();
          theword.style.color="#FFDC1A";
          theword.innerHTML="<h2>Game Over, Thanks for playing!!</h2>";
        }
        else
        { 
          wantmore.style.background="#393e46";
          wantmore.innerHTML="Press any key to continue...";
        }

        //to display the current play word if user lost
        if(guesses===0 && !(isGameOver()))
        {
          theword.style.color="red";
          theword.innerHTML="&#x1f494; Sorry you lost this round, it's "+curWord.toUpperCase()+" &#x1f494;";
        }
        else if(isWin===true && !isGameOver())
        {
          theword.style.color="#2cf152";
          theword.innerHTML="&#9733;&#9733;&#9733; You won this round &#9733;&#9733;&#9733;";
        }
    } 
}


/*Function to compare input characters with the play word 
and return positions*/

function findPosition(word, letter)
{
  var position=[];
  for (i=0; i<word.length; i++)
  {
    if(word[i]===letter)
    {
      position.push(i);
    }
  }
  return position;
}

/*Function to form the play word with current letter*/

function displayWord(dispWord, position, ltr)
{
  dispStrArr=dispWord.split("");
  console.log(dispStrArr);
  for(i=0; i<position.length; i++){
     dispStrArr[position[i]]=ltr;
  }
  
  return dispStrArr.join("");
  
}

/*Function to check if keyin is alphabets*/

function isAlpha(ltr){
  var aplha="abcdefghijklmnopqrstuvwxyz";
  return(aplha.split("").includes(ltr));
}

/*Function to check if keyin is played*/

function isPlayed(ltr){
  return(letters.includes(ltr) || dispWord.split("").includes(ltr));
}


/*Function to display images based on lives left*/
function changeImg(imgnum)
{
  var imgpath="assets/images/"+imgnum+".png";
  hangimg.src=imgpath;
  hangimg.alt=imgnum+".png";
}

/*Function to check if game is over*/

function isGameOver(){
  return(totWords===(wins+losses));
}