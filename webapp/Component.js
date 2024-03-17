/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "googleimage/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("googleimage.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                $.ajaxSetup({
                    headers: {
                        'X-RapidAPI-Key':'310deb8769mshd4841f6f405aa21p173e44jsn97839c1f6ff8',
                        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                    }
                });
            }
        });
    }
);