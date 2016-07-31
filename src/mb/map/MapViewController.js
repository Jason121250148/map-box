import ViewController from "sap/a/view/ViewController";

import MapView from "./MapView";

import ServiceClient from "../../gd/service/ServiceClient";

export default class MapViewController extends ViewController
{
    init()
    {
        super.init();
    }

    afterInit()
    {
        super.afterInit();
        this._initEvent();
    }
    createView(options)
    {
        const opts = $.extend({
            // "startPoi": "{/startPoi}",
            // "endPoi": "{/endPoi}",
            queryPoi: "{/queryPoi}"
        },options);
        return new MapView(opts);
    }
    initView()
    {
        super.initView();
    }

    _initEvent()
    {
        this.view.attachMapClick(this._onMapClick.bind(this));
    }

    searchRoute(locations)
    {
        this.view.naviLayer.applySettings({
            startLocation: locations[0],
            endLocation: locations[1]
        });

        this.view.naviLayer.fitBounds();
        ServiceClient.getInstance().searchRoute(locations).then(route => {
            this.view.naviLayer.drawRoute(route);
        });
    }

    _onMapClick(e)
    {
        const service = ServiceClient.getInstance();
        const location = e.getParameter("location");
        service.doGeocoder(location).then(result => {
            sap.ui.getCore().getModel().forceSetProperty("/queryPoi", {
                name: result.regeocode.formattedAddress,
                location: location
            });
        });
    }


}
