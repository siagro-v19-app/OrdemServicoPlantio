sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.OrdemServicoPlantioProduto", {
		constructor: function (){
			this.Id = 0;
			this.Empresa = 0;
			this.OrdemServico = 0;
			this.Produto = 0;
			this.Quantidade = 0;
			this.Unidade = 0;
			this.Usuario = 0;
			this.ValorTotal = 0;
			this.ValorUnitario = 0;
			this.EmpresaDetails = {};
			this.ProdutoDetails = {};
			this.UnidadeMedidaDetails = {};
			this.UsuarioDetails = {};
		}	
	});
	
});