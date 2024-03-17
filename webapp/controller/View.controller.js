sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/NumberFormat",
  ],
  function (Controller, JSONModel, NumberFormat) {
    "use strict";

    return Controller.extend("googleimage.controller.View", {
      onInit: function () {
        // Tabela interna do Abap
        let ImageList = {
          imagens: [
            {
              iconUrl: "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
              name: "Bitcoin",
              symbol: "BTC",
              price: "69376.62171369082",
            },
          ],
        };

        // Criacao do modelo para exibir dados na tela.
        let ImageModel = new JSONModel(ImageList);
        let view = this.getView();
        view.setModel(ImageModel, "Modelo");

        // Criar uma instância do modelo JSON para armazenar os dados da API
        this.oModel = new JSONModel();
        this.getView().setModel(this.oModel, "coinModel");

        // Chamar o método fetchData quando a visualização for inicializada
        this.fetchData();
      },

      // Método para chamar a API e atualizar o modelo
      fetchData: function () {
        const settings = {
          async: true,
          crossDomain: true,
          url: "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "310deb8769mshd4841f6f405aa21p173e44jsn97839c1f6ff8",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        // Chamar a API
        $.ajax(settings)
          .done(
            function (response) {
              // Atualizar o modelo com os dados da API
              this.oModel.setData(response);
            }.bind(this)
          )
          .fail(function (jqXHR, textStatus, errorThrown) {
            // Lidar com erros de requisição
            console.error("Error fetching data:", textStatus, errorThrown);
          });
      },

      onPressBuscar: function () {
        let inputBusca = this.byId("inpBusca");
        let query = inputBusca.getValue();

        const settings = {
          async: true,
          crossDomain: true,
          url:
            "https://coinranking1.p.rapidapi.com/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl&query=" +
            query,
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "310deb8769mshd4841f6f405aa21p173e44jsn97839c1f6ff8",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        $.ajax(settings).done(
          function (response) {
            // instanciar o modelo
            let oImageModel = this.getView().getModel("Modelo");
            let oDadosImage = oImageModel.getData();

            // clear tabela interna = array
            oDadosImage.imagens = [];

            // loop que adiciona dados de uma tabela em outra tabela
            let listaResultados = response.data.coins;
            let newItem = "";

            // vamos ao loop = for
            for (var i = 0; i < listaResultados.length; i++) {
              //read table pelo indice
              newItem = listaResultados[i];
              //append dos dados na nova tabela
              oDadosImage.imagens.push(newItem);
            }

            oImageModel.refresh();
          }.bind(this)
        );
      },

      formatarPreco: function (price) {
        var oNumberFormat = NumberFormat.getCurrencyInstance({
          currencyCode: true,
          maxFractionDigits: 2,
          groupingEnabled: true,
          groupingSeparator: ",",
          decimalSeparator: ".",
        });

        return oNumberFormat.format(price, "$");
      },
    });
  }
);
