sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.UnidadeMedidaDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/UnidadeMedidas(" + sId + ")"
			};
		}
	});
});