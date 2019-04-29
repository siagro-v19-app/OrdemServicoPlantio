sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"br/com/idxtec/OrdemServicoPlantio/model/models",
	"br/com/idxtec/OrdemServicoPlantio/services/ErrorHandler"
], function(UIComponent, Device, models, ErrorHandler) {
	"use strict";

	return UIComponent.extend("br.com.idxtec.OrdemServicoPlantio.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			this._oErrorHandler = new ErrorHandler(this);
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			this.getRouter().initialize();
			
			this.getModel().setSizeLimit(1000000);
		},
		
		destroy: function(){
			this._oErrorHandler.destroy();
			
			UIComponent.prototype.destroy.apply(this, arguments);
		},
		
		getContentDensityClass: function(){
			if(!this._sContentDensityClass){
				if(!sap.ui.Device.support.touch){
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});