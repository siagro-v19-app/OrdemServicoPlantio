sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtec.OrdemServicoPlantio.model.OrdemServicoPlantio", {
		constructor: function(){
			this.Id = 0;
			this.Aplicacao = "";
			this.Data = new Date();
			this.Romaneio = "";
			this.Empresa = 0;
			this.Equipamento = 0;
			this.HoraFinal = null;
			this.HoraInicial = null;
			this.HorimetroFinal = 0;
			this.HorimetroInicial = 0;
			this.Implemento = 0;
			this.Observacoes = "";
			this.Operador = 0;
			this.Quadro = 0; 
			this.Servico = "";
			this.Usuario = 0;
			this.EmpresaDetails = {};
			this.EquipamentosDetails = {};
			this.ImplementoDetails = {};
			this.OperadorPlantioDetails = {};
			this.QuadroDetails = {};
			this.ServicoPlantioDetails = {};
			this.UsuarioDetails = {};
			this.OrdemServicoPlantioProdutoDetails = [];
		}
	});
});