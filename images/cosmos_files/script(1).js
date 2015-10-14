var stateManager = new BillboardStateManager();


function startAd() 
{
	determineIfAutoExpansion();

}

function determineIfAutoExpansion() 
{
	if (stateManager.getIsAutoExpansionDefined()) 
	{
		if (stateManager.getIsAutoExpansion())
		{
			doAutoExpansionBehavior();
		}
	}
	else 
	{
		stateManager.onIsAutoExpansionDefined = determineIfAutoExpansion;
	}
	
	var cancelAutoCollapseOnUserInteraction = EB._isLocalMode ? false : EB._adConfig.customJSVars.mdCancelAutoCollapseOnUserInteraction;

	if (cancelAutoCollapseOnUserInteraction) 
	{
		console.log("cancelAutoCollapseOnUserInteraction");
	}
}



function handleMessageFromCustomScript(message) 
{
	try {
		var data = JSON.parse(message.data);

		if (data.type && data.type === "collapse") {
			pauseAllVideos();
		}
	}
	catch (error) {
		EBG.log.debug(error);
	}
}



function collapse() 
{
	var leaveBehindPanelName = EB._isLocalMode ? "leavebehind" : EB._adConfig.customJSVars.mdLeaveBehindPanelName;

	EB.expand({
		panelName: leaveBehindPanelName,
		actionType: EBG.ActionType.AUTO
	});

	var billboardPanelName = EB._isLocalMode ? "billboard" : EB._adConfig.customJSVars.mdBillboardPanelName;

	EB.collapse({
		panelName: billboardPanelName
	});
}





function cancelAutoCollapse(event) 
{
	document.removeEventListener("mousedown", cancelAutoCollapse);
	document.removeEventListener("touchstart", cancelAutoCollapse);

	var message = {
		type: "cancelAutoCollapse"
	};

	sendMessageToCustomScript(message);
}

function sendMessageToCustomScript(message) {
	message.adID = EB._isLocalMode ? null : EB._adConfig.adId;

	window.parent.postMessage(JSON.stringify(message), "*" );
}

