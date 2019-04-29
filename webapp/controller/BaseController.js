sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"br/com/idxtec/OrdemServicoPlantio/helpers/EquipamentoHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/ImplementoHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/OperadorPlantioHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/ProdutoHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/QuadroHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/ServicoPlantioHelpDialog",
	"br/com/idxtec/OrdemServicoPlantio/helpers/UnidadeMedidaHelpDialog"
], function (Controller, History, EquipamentoHelpDialog, ImplementoHelpDialog, OperadorPlantioHelpDialog, ProdutoHelpDialog, 
	QuadroHelpDialog, ServicoPlantioHelpDialog, UnidadeMedidaHelpDialog){
	"use strict";
	
	return Controller.extend("br.com.idxtec.OrdemServicoPlantio.controller.BaseController", {
		getRouter: function (){
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		getModel: function (sModel){
			return this.getOwnerComponent().getModel();
		},
		
		handleSearchEquipamento: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			EquipamentoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchImplemento: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ImplementoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchOperador: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			OperadorPlantioHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchProduto: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ProdutoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchQuadro: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			QuadroHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchServico: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ServicoPlantioHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchUnidade: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			UnidadeMedidaHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		navBack : function(){
			var oRouter = this.getRouter();
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("Main", {}, true);
			}
		},
		
		formChanges: function (oEvent){
			var oViewModel = this.getView().getModel("viewModel");
			oViewModel.setProperty("/hasChanges", true);
		},
		
		formChanged: function (){
			return this.getView().getModel("viewModel").getProperty("/hasChanges");
			debugger;
		}
		
	});
});