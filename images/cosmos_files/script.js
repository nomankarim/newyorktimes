

startAd();
function startAd() 
{
	addEventListeners();
}

function addEventListeners()
{
	var expandButton = document.getElementById("expand970x31");
	expandButton.addEventListener("click", expand);
}

function expand(event) 
{
	EB.userActionCounter("POS_Expand");
	console.log("EXPAND BILLBOARD");
	var billboardPanelName = EB._isLocalMode ? "billboard" : EB._adConfig.customJSVars.mdBillboardPanelName;

	EB.expand({
		panelName: billboardPanelName
	});

	var leaveBehindPanelName = EB._isLocalMode ? "leavebehind" : EB._adConfig.customJSVars.mdLeaveBehindPanelName;

	EB.collapse({
		panelName: leaveBehindPanelName
	});
	
	
}

