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
        this._initModel();
    }

    _initModel()
    {
        sap.ui.getCore().setModel(new Model());
    }

    afterInit()
    {
        super.afterInit();
        this._initMapViewController();
        this._initPoiSearchViewController();
        this._initEvent();
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

    _initEvent()
    {
        sap.ui.getCore().getModel().bindProperty("/selectedPoi").attachChange(() => {
            this.mapViewController.view.selectedLayer.updateMarker();
            const selectedPoi = sap.ui.getCore().getModel().getProperty("/selectedPoi");
            this.mapViewController.view.setCenterLocation(selectedPoi.location);
            this.poiSearchViewController.view.setKeyword(selectedPoi.name);
        });

        sap.ui.getCore().getModel().bindProperty("/queryPoi").attachChange(() => {
            const name = sap.ui.getCore().getModel().getProperty("/queryPoi").name;
            this.poiSearchViewController.view.setKeyword(name);
            this.mapViewController.view.updatePopup();
        });


    }

    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            this.mapViewController.searchRoute([ [32.04389, 118.77881], [31.9790247, 118.7548884] ]);
            this.mapViewController.searchPlace("丰盛商汇");
        });

    }
}
