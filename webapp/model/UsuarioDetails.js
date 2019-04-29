sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.UsuarioDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/Usuarios(" + sId + ")"
			};
		}
	});
});