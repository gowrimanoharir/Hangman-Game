

//currentRound('roman');


//function currentRound(curWord)
//{	
	var dispWord=null;
	var letters=[];
  var pst=[];
	var guesses = 7;
	var ltr;
  var curWord='assist';
  var wins=0;
  var isWin=null;
	
  dispWord=Array(curWord.length+1).join('_');
  play.innerHTML=dispWord.split("").join(" ");
  lives.innerHTML=guesses;
  win.innerHTML=wins;
      
  document.onkeyup = function(e)
  {
    ltr=e.key.toLowerCase();
    if(guesses>0 && isWin!=true)
    {
       currentRoundInput(ltr);
    }
  }
    	
//}	

/*Function for current round of play*/
function currentRoundInput(ltr)
  {  
    
    pst=findPosition(curWord, ltr);
  
    if (pst.length>0)
     {
       dispWord=displayWord(dispWord, pst, ltr);
    }
    else{
      guesses=guesses-1;
      letters.push(ltr);
    }
    
    if(dispWord===curWord)
    {
      wins=wins+1;
      win.innerHTML=wins;
      isWin=true;
    }
    letter.innerHTML=letters.join(" ").toUpperCase();
    play.innerHTML=dispWord.split("").join(" ").toUpperCase();
    lives.innerHTML=guesses;    
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

/*Function to display the play word with current guesses*/

function displayWord(dispWord, position, ltr)
{
  dispStrArr=dispWord.split("");
  console.log(dispStrArr);
  for(i=0; i<position.length; i++){
     dispStrArr[position[i]]=ltr;
  }
  
  return dispStrArr.join("");
  
}

/*Function to keep track of words already displayed in
the game*/


/*Keep track of Wins, Lives and Letters already entered*/



