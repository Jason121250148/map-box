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
            "selectedPoi": "{/selectedPoi}"
        },options);
        return new MapView(opts);
    }
    initView()
    {
        super.initView();

    }

    _initEvent()
    {
        this.view.attachMapClicked((e) => {
            const service = ServiceClient.getInstance();
            const location = e.getParameter("location");
            // service.convert84toGcj02([ location.lng, location.lat ]).then(loc => {
                service.doGeocoder(location).then(result => {
                    console.log(result);
                    sap.ui.getCore().getModel().setProperty("/queryPoi", {
                        name: result.regeocode.formattedAddress,
                        location: location
                    });
                });
            // });
        });
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

    searchPlace(keyword)
    {

    }


}