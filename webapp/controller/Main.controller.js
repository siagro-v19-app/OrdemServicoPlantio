sap.ui.define([
	"br/com/idxtec/OrdemServicoPlantio/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"br/com/idxtec/OrdemServicoPlantio/services/Session"
], function(BaseController, Filter, FilterOperator, Session) {
	"use strict";

	return BaseController.extend("br.com.idxtec.OrdemServicoPlantio.controller.Main", {
		onInit: function (){
			this._EmpresaId = Session.get("EMPRESA_ID");
			this._UsuarioId = Session.get("USUARIO_ID");
			
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			var oFilter = new Filter("Empresa", FilterOperator.EQ, this._EmpresaId);
			var oView = this.getView();
			var oTable = oView.byId("table");
			
			oTable.bindRows({ 
				path: '/OrdemServicoPlantios',
				parameters:{
					expand: 'EquipamentosDetails, QuadroDetails, ServicoPlantioDetails'
				},
				sorter: {
					path: 'Id'
				},
				filters: oFilter
			});
		},
		
		getRouter: function (){
			return this.getOwnerComponent().getRouter();
		},
		
		onAdd: function (oEvent){
			var oRouter = this.getRouter();
			oRouter.navTo("FormAddEdit", {
				"query":{
					"action": "add"
				}
			}, false);
		},
		
		onEdit: function (oEvent){
			var oRouter = this.getRouter();
			var oTable = this.getView().byId("table");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex === -1) {
				return;
			}
			var oContext = oTable.getContextByIndex(nIndex);

			oRouter.navTo("FormAddEdit", {
				"query":{
					"action": "edit",
					"id":  oContext.getProperty( "Id" )
				}
			}, false);
		},
		
		onRemove: function (oEvent){
			var oModel = this.getModel();
			var oTable = this.getView().byId("table");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex === -1) {
				return;
			}
			var oContext = oTable.getContextByIndex(nIndex);
			
			oModel.remove(oContext.sPath,{
				success: function(){
					oModel.refresh(true);
				}
			});
		}
	});
});