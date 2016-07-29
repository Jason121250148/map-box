import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";

import PoiSearchViewController from "../view/PoiSearchViewController";
import MapViewController from "../map/MapViewController";

import ServiceClient from "../../gd/service/ServiceClient";

import Model from "../model/Model";

export default class ApplicationController extends AdaptiveApplicationController
{
    init()
    {
        super.init();
    }

    _initModel()
    {
        const model = new Model();
        sap.ui.getCore().setModel(model);
        this.setModel(model);
    }

    afterInit()
    {
        super.afterInit();
        this._initModel();
        this._initMapViewController();
        this._initPoiSearchViewController();
    }

    _initMapViewController()
    {
        this.mapViewController = new MapViewController();
        this.addViewController(this.mapViewController);
    }

    _initPoiSearchViewController()
    {
        this.poiSearchViewController = new PoiSearchViewController();
        this.addViewController(this.poiSearchViewController);
    }


    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            // this.mapViewController.searchRoute([ [32.04389, 118.77881], [31.9790247, 118.7548884] ]);
            this.mapViewController.searchPlace("丰盛商汇");
        });

    }
}
