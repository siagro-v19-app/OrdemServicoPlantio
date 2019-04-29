sap.ui.define([
	"br/com/idxtec/OrdemServicoPlantio/controller/BaseController",
	"br/com/idxtec/OrdemServicoPlantio/model/OrdemServicoPlantio",
	"sap/ui/model/json/JSONModel",
	"br/com/idxtec/OrdemServicoPlantio/services/Session",
	"br/com/idxtec/OrdemServicoPlantio/model/OrdemServicoPlantioProduto",
	"br/com/idxtec/OrdemServicoPlantio/services/OrdemServicoPlantioService",
	"br/com/idxtec/OrdemServicoPlantio/model/EmpresaDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/UsuarioDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/OrdemServicoPlantioDetails"
], function(BaseController, OrdemServicoPlantio, JSONModel, Session, OrdemServicoPlantioProduto, 
		Service, EmpresaDetails, UsuarioDetails, OrdemServicoPlantioDetails) {
	"use strict";

	return BaseController.extend("br.com.idxtec.OrdemServicoPlantio.controller.FormAddEdit", {

		onInit: function (){
			var oView = this.getView();
			var oRouter = this.getRouter();
			var oViewModel = new JSONModel();
			var oDataModel = new JSONModel();
			var oItemsModel = new JSONModel();
			var oModel = this.getModel();
			
			oModel.setDeferredGroups(["group"]);
			
			oViewModel.setData({
				tituloPagina: "",
				hasChanges: false
			});
			
			oView.setModel(oViewModel, "viewModel");
			oView.setModel(oDataModel, "dataModel");
			oView.setModel(oItemsModel, "itemsModel");
			
			this._EmpresaId = Session.get("EMPRESA_ID");
			this._UsuarioId = Session.get("USUARIO_ID");
			
			oRouter.getRoute("FormAddEdit").attachMatched(this._routerMatch, this);
		},
		
		_routerMatch: function(oEvent){
			var oView = this.getView();
			var oQuery = oEvent.getParameter("arguments")["?query"];
			var oViewModel = oView.getModel("viewModel");
			var oDataModel = oView.getModel("dataModel");
			var oItemsModel = oView.getModel("itemsModel");
			
			this._action = oQuery.action;
			
			if (this._action === "add"){
				
				oViewModel.setProperty("/tituloPagina", "Incluir Nova Ordem de Serviço");
				
				var oEntry = new OrdemServicoPlantio();
				oEntry.Empresa = this._EmpresaId;
				oEntry.Usuario = this._UsuarioId;
				oEntry.EmpresaDetails = new EmpresaDetails(this._EmpresaId);
				oEntry.UsuarioDetails = new UsuarioDetails(this._UsuarioId);
				oDataModel.setData(oEntry);
				oItemsModel.setData([]);
				
				oView.byId("quadro").setValue( null );
				oView.byId("servico").setValue( null );
				oView.byId("operador").setValue( null );
				oView.byId("equipamento").setValue( null );
				oView.byId("implemento").setValue( null );
				
			} else if (this._action === "edit"){
				var service = new Service();
				
				oViewModel.setProperty("/tituloPagina", "Editar Ordem de Serviço");
			
				this._id = oQuery.id;
				
				oView.setBusyIndicatorDelay(0);
				oView.setBusy(true);
				
				service.fetchData(this).then(function (){
					oView.setBusy(false);
				});
			}
		},
		
		onAddRow: function (oEvent){
			var oView = this.getView();
			var oItemsModel = oView.getModel("itemsModel");
			var oItems = oItemsModel.getProperty("/");
			var oNewItem = new OrdemServicoPlantioProduto();
			
			if (this._action === "edit"){
				oNewItem.Empresa = this._EmpresaId;
				oNewItem.EmpresaDetails = new EmpresaDetails(this._EmpresaId);
				oNewItem.OrdemServico = parseInt(this._id, 0);
				oNewItem.OrdemServicoPlantioDetails = new OrdemServicoPlantioDetails(this._id);
			}
			
			var oNewLine = oItems.concat(oNewItem);
			
			oItemsModel.setProperty("/", oNewLine);	
		},
		
		onRemoveRow: function (oEvent){
			var oView = this.getView();
			var oItemsModel = oView.getModel("itemsModel");
			var oTable = this.getView().byId("table");
			var oModel = this.getModel();
			
			var nIndex = oTable.getSelectedIndex();
			
			if ( nIndex > -1 ) {
				var oItems = oItemsModel.getProperty( "/" );
				var sId = oItems[nIndex].Id;
				
				if ( sId !== 0 ){
					oModel.remove("/OrdemServicoPlantioProdutos(" + sId + ")", {
						groupId: "group"
					});
				}
				
				oItems.splice( nIndex, 1 );
				oItemsModel.setProperty( "/", oItems );
				oTable.clearSelection();
			} else {
				sap.m.MessageBox.warning("Selecione um item na tabela!");
			}
		},
		
		onSave: function (oEvent){
			var that = this;
			var service = new Service();
			var oView = this.getView();
			var oViewModel = oView.getModel("viewModel");
			
			oView.setBusyIndicatorDelay(0);
			oView.setBusy(true);
				
			if (this._action === "add"){
				
				service.insert(this).then(function (){
					sap.m.MessageBox.success("Dados Gravados.",{
						onClose: function() {
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					});		
				}).finally(function (){
					oView.setBusy(false);
				});
				
			} else if (this._action === "edit"){
				
				service.update(this).then(function (){
					sap.m.MessageBox.success("Dados Gravados.",{
						onClose: function() {
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					});		
				}).finally(function (){
					oView.setBusy(false);
				});
				
			}
		},
		
		onCancel: function (){
			var oViewModel = this.getView().getModel("viewModel");
			var that = this;
			console.log(oViewModel.getProperty("/hasChanges"));
			if ( this.formChanged() ) {
				sap.m.MessageBox.warning("Deseja descartar as alterações realizadas ?",{
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(sAction) {
						if (sAction === "YES"){
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					}
				});
			} else {
				this.navBack();
			}
		},
		
		onCalculaTotal : function ( oEvent ) {
			var oView = this.getView();
			var oItemsModel = oView.getModel("itemsModel");
			var aItems = oItemsModel.getData();
			
			for( var i = 0; i < aItems.length; i++ ) {
				aItems[i].ValorTotal = aItems[i].Quantidade * aItems[i].ValorUnitario;                                                  
			}
	
			oItemsModel.refresh( true );
		}
	
	});

});