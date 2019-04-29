/** */
sap.ui.define([
	"sap/ui/base/Object",
	"br/com/idxtec/OrdemServicoPlantio/services/Session",
	"br/com/idxtec/OrdemServicoPlantio/model/UsuarioDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/ProdutoDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/UnidadeMedidaDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/EmpresaDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/EquipamentosDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/ImplementoDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/OperadorPlantioDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/QuadroDetails",
	"br/com/idxtec/OrdemServicoPlantio/model/ServicoPlantioDetails"
], function (BaseObject, Session, UsuarioDetails, ProdutoDetails, UnidadeMedidaDetails,
	EmpresaDetails, EquipamentosDetails, ImplementoDetails, OperadorPlantioDetails, 
	QuadroDetails, ServicoPlantioDetails){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.services.OrdemServicoPlantioService",{
		
		fetchData: function (oController){
			
			return new Promise(function (resolve, reject){
				
				var oView = oController.getView();
				var oModel = oController.getModel();
				var oDataModel = oView.getModel("dataModel");
				var oItemsModel = oView.getModel("itemsModel");
				
				oModel.read("/OrdemServicoPlantios(" + oController._id + ")", {
					groupId: "group",
					success: function (oData, oResponse){
						oData.Usuario = oController._UsuarioId;
						oData.UsuarioDetails = new UsuarioDetails(oController._UsuarioId);
						oDataModel.setData(oData);	
					}
				});
				
				oModel.read("/OrdemServicoPlantioProdutos", {
					groupId: "group",
					filters:[
						new sap.ui.model.Filter({
							path: "OrdemServico",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: oController._id
						})
					],
					
					success: function (oData){
						oItemsModel.setData(oData.results);
					}
				});
				
				oModel.submitChanges({
					groupId: "group",
					success: function(oResponse) {
						var erro = oResponse.__batchResponses[0].response;
						if (!erro) {
							resolve();
						} else {
							reject(erro);
						}
					}
				});
				
			});	

		},
		
		insert: function (oController) {
			var that = this;
			return new Promise(function (resolve, reject){
				var oView = oController.getView();
				var oModel = oController.getModel();
				var oEntry = that._getData(oController);
				var oItems = oView.getModel("itemsModel").getData();
				
				var EmpresaId = Session.get("EMPRESA_ID");
				var UsuarioId = Session.get("USUARIO_ID");
					
				for(var i = 0; i < oItems.length; i++){
					oItems[i].Usuario = UsuarioId;
					oItems[i].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItems[i].Empresa = EmpresaId;
					oItems[i].EmpresaDetails = new EmpresaDetails(EmpresaId);                         
					oItems[i].ProdutoDetails = new ProdutoDetails(oItems[i].Produto);
					oItems[i].UnidadeMedidaDetails = new UnidadeMedidaDetails(oItems[i].Unidade);                        
					oEntry.OrdemServicoPlantioProdutoDetails.push(oItems[i]);
				}
				                         
				oModel.create("/OrdemServicoPlantios", oEntry, {
					success: function (oData){
						resolve(oData);					
					},
					error: function(oError){
						reject(oError);
					}
				});		
			});
		},
		
		update: function (oController) {
			var that = this;
			return new Promise(function(resolve, reject){
				var oView  = oController.getView();
				var oModel = oController.getModel();
				var oEntry = that._getData(oController);
				var oItems = oView.getModel("itemsModel").getData();
				
				var sId = oController._id;
				var UsuarioId = Session.get("USUARIO_ID");
				
				for(var i = 0; i < oItems.length; i++){
					var sItemId = oItems[i].Id;
					oItems[i].Usuario = UsuarioId;
					oItems[i].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItems[i].ProdutoDetails = new ProdutoDetails(oItems[i].Produto);
					oItems[i].UnidadeMedidaDetails = new UnidadeMedidaDetails(oItems[i].Unidade);  
					
					if (sItemId === 0) {
						oModel.create("/OrdemServicoPlantioProdutos", oItems[i], {
							groupId: "group"
						});
					} else {
						oModel.update("/OrdemServicoPlantioProdutos(" + sItemId + ")", oItems[i], {
							groupId: "group"
						});
					}
				}
				
				oModel.update("/OrdemServicoPlantios(" + sId + ")", oEntry, {
					groupId: "group"
				});
			
				oModel.submitChanges({
					groupId: "group",
					success: function(oResponse) {
						var erro = oResponse.__batchResponses[0].response;
						if (!erro) {
							resolve();
						} else {
							reject(erro);
						}
					}
				});
			});
		},
		
		_getData: function (oController){
			var oView = oController.getView();
			var oEntry = oView.getModel("dataModel").getData();
			oEntry.EquipamentosDetails = new EquipamentosDetails(oEntry.Equipamento);
			oEntry.ImplementoDetails = new ImplementoDetails(oEntry.Implemento);
			oEntry.OperadorPlantioDetails = new OperadorPlantioDetails(oEntry.Operador);
			oEntry.QuadroDetails = new QuadroDetails(oEntry.Quadro);
			oEntry.ServicoPlantioDetails = new ServicoPlantioDetails(oEntry.Servico);
			
			return oEntry;
		}
		
	});
	
});