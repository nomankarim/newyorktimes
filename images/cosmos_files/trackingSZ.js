
document.getElementById("container970x31").addEventListener("click", doAction2);



function doAction2(event) 
{
	var target = event.target || event.srcElement;
	var clickedElt;

	if (target.id) {clickedElt = target.id;} 
	else {clickedElt = target.name;}
	console.log(clickedElt);
	
	switch (clickedElt) 
	{
			
		case "expand970x31":
			
			break;
		
	

		default:
		EB.clickthrough();
		  break;
	
	}

}

