// 620081437
// Extra Features to be graded
/*End of Game Notification
  Multiple backgrounds
  Ability to slide multiple squares at once
  Animations and/or transitions*/

"use strict"; 
window.onload = function()
{
	var puzzlearea;
	var squares;
	var shufflebutton;
	var validMoves=[];
	var emptySpaceX = '300px'; 
	var emptySpaceY = '300px';
	var shufflePicChkBoxlabel;
	var shufflePicChkBox;
	var easyModeChkBoxlabel;
	var easyModeChkBox;

	implementChkBox();

	puzzlearea = document.getElementById("puzzlearea");
	squares = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");
	
	initializeGrid();
	shufflebutton.onclick = shufflePuzzle;

	checkMoves();


	function initializeGrid()
	{
		for (var i=0; i<squares.length; i++)
		{
			squares[i].className = "puzzlepiece";

			squares[i].style.left = (i % 4 * 100) + "px";
			squares[i].style.top = (parseInt(i / 4) * 100) + "px";

			squares[i].style.backgroundPosition = "-" + squares[i].style.left + " " + "-" + squares[i].style.top;

			squares[i].onclick = function()
			{
				if (easyModeChkBox.checked) 
				{
					animatedSwitchPieces(parseInt(this.innerHTML-1));
				}
				else 
				{
					if (validMove(this.style.left, this.style.top))
					{
						animatedSwitchPieces(parseInt(this.innerHTML-1));
					}				
				}
			};
	
			squares[i].onmouseover = function()
			{
				if (easyModeChkBox.checked) 
				{
					this.classList.add("movablepiece");
				}
				else 
				{
					if (validMove(this.style.left, this.style.top))
					{
						this.classList.add("movablepiece");
					}
				}
			};

			squares[i].onmouseout = function()
			{
				this.classList.remove("movablepiece");
			};
		}
	}


	function shufflePuzzle() 
	{
		var rndNum;

		if (shufflePicChkBox.checked) 
			{
				shufflePic();
			}
		
		for (var i = 0; i < 150; i++) 
		{
			rndNum = Math.floor(Math.random() * validMoves.length);

			for (var x = 0; x < squares.length; x++)
			{
				if ((validMoves[rndNum][0] === parseInt(squares[x].style.left)) && 
					(validMoves[rndNum][1] === parseInt(squares[x].style.top)))
				{
					switchPieces(parseInt(squares[x].innerHTML-1));
					checkMoves();

					break;
				}
			}
		}
	}

	// Animation for moving the pieces
	function animatedSwitchPieces(puzzlePiece)
	{
		var posX = squares[puzzlePiece].style.left;
	  	var posY = squares[puzzlePiece].style.top;	  	
	  	var xFin = (squares[puzzlePiece].style.left === emptySpaceX);
	  	var yFin = (squares[puzzlePiece].style.top === emptySpaceY);
	  	
	  	var movement = setInterval(MovePiece, 1);


		function MovePiece() 
		{
			if ((xFin) && (yFin))
			{
				emptySpaceX = posX;
				emptySpaceY = posY;
				clearInterval(movement);
				checkMoves();
				validateWin();
			} 
			else 
			{
				if (!(xFin))
				{
					if (parseInt(squares[puzzlePiece].style.left) < parseInt(emptySpaceX))
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) - 10) + 'px');	
					}

					if (squares[puzzlePiece].style.left === emptySpaceX)
					{
						xFin = true;
					}
				}

				if (!(yFin))
				{
					if (parseInt(squares[puzzlePiece].style.top) < parseInt(emptySpaceY))
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) - 10) + 'px');	
					}

					// Checks if the Y coordinates have reached its destination
					if (squares[puzzlePiece].style.top === emptySpaceY)
					{
						yFin = true;
					}
				}
			}
		}
	}


	function switchPieces(puzzlePiece)
	{
		var temp = squares[puzzlePiece].style.left;
		squares[puzzlePiece].style.left = emptySpaceX;
		emptySpaceX = temp;

		temp = squares[puzzlePiece].style.top;
		squares[puzzlePiece].style.top = emptySpaceY;
		emptySpaceY = temp;
	}


	function checkMoves()
	{
		var tempX = parseInt(emptySpaceX);
		var tempY = parseInt(emptySpaceY);

		validMoves = [];

		if (tempY != 0)
		{
			validMoves.push([tempX, tempY - 100]);
		}

		if (tempX != 300)
		{
			validMoves.push([tempX + 100, tempY]);
		}

		if (tempY != 300)
		{
			validMoves.push([tempX, tempY + 100]);
		}

		if (tempX != 0)
		{
			validMoves.push([tempX - 100, tempY]);
		}
	}


	function validMove(pieceX, pieceY)
	{
		pieceX = parseInt(pieceX);
		pieceY = parseInt(pieceY);

		for (var i = 0; i < validMoves.length; i++)
		{
			if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
			{
				return true;
			}
		}
		return false;	
	}

	//Validates if all pieces are in the correct position
	function validateWin() 
	{
		var win = true;

		if ((emptySpaceX === "300px") && (emptySpaceY === "300px")) 
		{
			for (var i = 0; i < squares.length; i++) 
			{
				if ((squares[i].style.left !== (parseInt((i % 4) * 100) + "px")) &&
					(squares[i].style.top !== (parseInt((i / 4) * 100) + "px")))
				{
					win = false;
					break;
				}
			}
			if (win) 
			{
				gameWon();
			}
		}
	}

	//End of game notification
	function gameWon()
	{
		alert("Game Over, You Won!");
	} 

	//Changes background on shuffle if applied
	function shufflePic() 
	{
		var listOfPics = ["background.jpg","2 scoobydoo.jpg","3 bugs.jpg","4 kingbugs.jpg"];
		var currentPic = squares[0].style.backgroundImage.slice(5, -2);
		var rndNum = Math.floor(Math.random() * listOfPics.length);

		if (currentPic.length === 0)
		{
			currentPic = "background.jpg";
		}
	
		if (currentPic === listOfPics[rndNum]) 
		{
			while (currentPic === listOfPics[rndNum]) 
			{
				rndNum = Math.floor(Math.random() * listOfPics.length);	
			}
		}

		for (var x = 0; x < squares.length; x++)
		{
			squares[x].style.backgroundImage = "url('" + listOfPics[rndNum] +"')";
		}
		
	}

	//Implements check boxes so that player may either
	//Change picture on shuffle or play an wasier way
	//To complete the game or both
	function implementChkBox()
	{
		//Allows for change picture on shuffle
		shufflePicChkBoxlabel = document.createElement('label');
		shufflePicChkBoxlabel.htmlFor = "shufflePicChkBox1";
		shufflePicChkBoxlabel.appendChild(document.createTextNode('Change Picture On Shuffle'));

		shufflePicChkBox = document.createElement("input");
	    shufflePicChkBox.type = "checkbox";
	    shufflePicChkBox.id = "shufflePicChkBox1";
	
		document.getElementById("controls").appendChild(shufflePicChkBoxlabel);
		document.getElementById("controls").appendChild(shufflePicChkBox);

		//Allows for an easier way to complete game
		easyModeChkBoxlabel = document.createElement('label');
		easyModeChkBoxlabel.htmlFor = "shufflePicChkBox1";
		easyModeChkBoxlabel.appendChild(document.createTextNode('Easy'));

		easyModeChkBox = document.createElement("input");
	    easyModeChkBox.type = "checkbox";
	    easyModeChkBox.id = "easyModeChkBox1";
	
		document.getElementById("controls").appendChild(easyModeChkBoxlabel);
		document.getElementById("controls").appendChild(easyModeChkBox);
	}
};