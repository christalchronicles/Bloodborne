var defeated = [];
var round = 1;
var numberOfFaces = 5;
var boss;
var index;
var theLeftSide = document.getElementById("left");
var theRightSide = document.getElementById("right");
var theBody = document.getElementById("body");
var modalOpen = false;

document.getElementById("start").onclick = function(event){
	event.stopPropagation();
	generateGame();
}
	
function generateGame(){
			
				var bosses = ["Vicar Amelia", "Father Gascoigne", "Micolash", "Mergos Wet Nurse", 
				"Rom Vacuos Spider", "The One Unborn", "Shadow of Yharman"];
				
				//pick boss
				do{
					index = Math.floor(Math.random()*7);
				}while(defeated.includes(index));
					
				boss = bosses[index];
				defeated.push(index);
				
				var nextText = document.getElementById("next");
				nextText.innerHTML = "Get ready for: " + bosses[index];
				$("#myModal").modal();
				modalOpen = true; 
				
				$('#myModal').on('hide.bs.modal', function () {
					modalOpen = false;
					theBody.onclick = null;
				});
				
				//create and display left side
				for(var faces = 0; faces < numberOfFaces; faces++){
					var image = document.createElement("img");;
					image.src = boss + ".png";
					var top = Math.floor((Math.random()*400));				
					var left = Math.floor((Math.random()*400));
					image.style.top = top + "px";
					image.style.left = left + "px";
					theLeftSide.appendChild(image);
				}
				
				//clone left side
				var leftSideCopy = theLeftSide.cloneNode(true);
				
				//event for clicking boss
				theLeftSide.lastChild.onclick = 
					function clicked(event){
						
						event.stopPropagation();
						while(theLeftSide.firstChild){
							theLeftSide.removeChild(theLeftSide.firstChild);
						}
						while(theRightSide.firstChild){
							theRightSide.removeChild(theRightSide.firstChild);
						}
						
						if(round !=7){
							round++;
							numberOfFaces+=5;	
							generateGame();
						}
						else if(round == 7){
						alert("Nice!");
						}
					};
					
				leftSideCopy.removeChild(leftSideCopy.lastChild);
				theRightSide.appendChild(leftSideCopy);
				
				//event for clicking the body
				theBody.onclick = 
					function gameOver(event){
						event.stopPropagation();
						if(!modalOpen){
						nextText.innerHTML = "Game over!";
						$("#myModal").modal();
						theBody.onclick = null;
						theLeftSide.lastChild.onclick = null;
					}
				};							
};