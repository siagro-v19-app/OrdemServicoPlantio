sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.ServicoPlantioDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/ServicoPlantios('" + sId + "')"
			};
		}
	});
});