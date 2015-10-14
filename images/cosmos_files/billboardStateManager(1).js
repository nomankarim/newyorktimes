function BillboardStateManager() {
	this._uniqueID = "";
	this._listenForEBInitialized();
}



BillboardStateManager.prototype = {
	_listenForEBInitialized: function() {
		if (EB.isInitialized()) {
			this._initialize();
		}
		else {
			var _self = this;
			EB.addEventListener(EBG.EventName.EB_INITIALIZED, function() {
				_self._initialize();
			});
		}
	},
	_initialize: function() {
		this._listenForUnload();
		this._initializeVariables();
		this._initializeIsFirstView();
		this._initializeIsAutoExpansion();
	},
	_listenForUnload: function() {
		var _self = this;
		window.addEventListener("unload", function(event) {
			_self._clearIsAutoExpansion();
		});
	},
	_clearIsAutoExpansion: function() {
		sessionStorage.removeItem(this._isAutoExpansionPropertyName);
	},
	_initializeVariables: function() {
		var _uniqueID = EB._isLocalMode ? "" : EB._adConfig.adId;
		this._isFirstViewPropertyName = _uniqueID + "_isFirstView";
		this._isAutoExpansionPropertyName = _uniqueID + "_isAutoExpansion";
	},
	_initializeIsFirstView: function() {
		var _isFirstView = this.getIsFirstView();

		if (_isFirstView === null) {
			_isFirstView = true;
		}
		else {
			_isFirstView = false;
		}

		localStorage.setItem(this._isFirstViewPropertyName, _isFirstView);
	},
	_initializeIsAutoExpansion: function() {
		var _isAutoExpansion = this.getIsAutoExpansion();

		
		if (_isAutoExpansion === null) {
			this._requestIsAutoExpansion();
		}
	},
	_requestIsAutoExpansion: function() {
		var self = this;

		window.addEventListener("message", function(message) {
			self._handleMessageFromCustomScript(message);
		});

		var message = {
			type: "requestIsAutoExpansion"
		};

		this._sendMessageToCustomScript(message);
	},
	_handleMessageFromCustomScript: function(message) {
		try {
			var data = JSON.parse(message.data);

			if (data.type && data.type === "requestIsAutoExpansion") {
				this.setIsAutoExpansion(data.isAutoExpansion);
	
				if (EBG.isFunc(this.onIsAutoExpansionDefined)) {
					this.onIsAutoExpansionDefined(data.isAutoExpansion);
				}
			}
		}
		catch (error) {
			EBG.log.debug(error);
		}
	},
	_sendMessageToCustomScript: function(message) {
		message.adID = EB._isLocalMode ? null : EB._adConfig.adId;

		window.parent.postMessage(JSON.stringify(message), "*" );
	},
	_convertStringToBoolean: function(string, defaultValue) {
		if (string === "true") {
			return true;
		}
		else if (string === "false") {
			return false;
		}

		return defaultValue;
	},
	getIsFirstView: function() {
		var _isFirstView = localStorage.getItem(this._isFirstViewPropertyName);

		_isFirstView = this._convertStringToBoolean(_isFirstView, true);

		return _isFirstView;
	},
	onIsAutoExpansionDefined: function() {
		//placeholder
	},
	getIsAutoExpansionDefined: function() {
		return (this.getIsAutoExpansion() !== null);
	},
	getIsAutoExpansion: function() {
		var _isAutoExpansion = sessionStorage.getItem(this._isAutoExpansionPropertyName);

		_isAutoExpansion = this._convertStringToBoolean(_isAutoExpansion, null);

		return _isAutoExpansion;
	},
	setIsAutoExpansion: function(isAutoExpansion) {
		sessionStorage.setItem(this._isAutoExpansionPropertyName, isAutoExpansion);
	}
};