sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.ProdutoDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/Produtos(" + sId + ")"
			};
		}
	});
});