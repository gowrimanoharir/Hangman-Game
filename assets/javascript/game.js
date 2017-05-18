
/*Define & initialize Global variables defining dictionary & wins that is 
for the entire game*/
  var dictionary=['jarvis','mjolnir', 'xandar', 'asgard', 
'tesseract', 'wakanda', 'ragnarok', 'infinitystones', 'vibranium', 'ultron', 'hydra', ];
  var wins=0;

/*Define Global variables that would be used for each round of  
play*/
  var dispWord, letters, pst, guesses, ltr, curWord,
  isWin;
  
/*Play Hangman*/
playHangman();

/*Start the game*/
function playHangman()
{
	currentRoundInitialize();
       
  document.onkeyup = function(e)
  {
    ltr=e.key.toLowerCase();
    if(guesses>0 && isWin!=true && isAlpha(ltr))
    {
       currentRoundPlay(ltr);
    }
    else if(isWin===true || guesses===0)
    {
        currentRoundInitialize();        
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
  isWin=null;

  dispWord=Array(curWord.length+1).join('_');
  play.innerHTML=dispWord.split("").join(" ");
  lives.innerHTML=guesses;
  win.innerHTML=wins;
  letter.innerHTML='';
  wantmore.innerHTML="";
  theword.innerHTML="";
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
          letters.push(ltr);
        }
    }
    
    //calculates the win if display and current word matches
    if(dispWord===curWord)
    {
      wins=wins+1;
      win.innerHTML=wins;
      isWin=true;
    }

    //calls the function to update the display for current keyin
    currentRoundDisplay();
}

/*Function to update display for current round*/

function currentRoundDisplay()  
{
    letter.innerHTML=letters.join(" ").toUpperCase();
    play.innerHTML=dispWord.split("").join(" ").toUpperCase();
    lives.innerHTML=guesses;  
    if(isWin===true || guesses===0)
    {
        wantmore.innerHTML="Press Any key to continue";
        if(guesses===0)
        {
          theword.innerHTML="Sorry you lost, it was "+curWord.toUpperCase();
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


/*Function to display Hangman Figure*/
