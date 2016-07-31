import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";

import ODSearchViewController from "../view/ODSearchViewController";
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
        this._initODSearchViewController();
        this._initEvent();
    }

    _initMapViewController()
    {
        this.mapViewController = new MapViewController();
        this.addViewController(this.mapViewController);
    }

    _initODSearchViewController()
    {
        this.oDSearchViewController = new ODSearchViewController();
        this.addViewController(this.oDSearchViewController);
    }

    _initEvent()
    {
        this.oDSearchViewController.view.attachSearchClick(this._onSearchClick.bind(this));
        this.oDSearchViewController.view.attachSwitchClick(this._onSwitchClick.bind(this));
    }

    _onSearchClick(e)
    {
        const model = sap.ui.getCore().getModel();
        const startPoi = model.getProperty("/startPoi");
        const endPoi = model.getProperty("/endPoi");
        if (!this.oDSearchViewController.getStartKeyword || this.oDSearchViewController.getStartKeyword().trim() === "")
        {
            alert("起始点为空");
        }
        else if (!this.oDSearchViewController.getEndKeyword || this.oDSearchViewController.getEndKeyword().trim() === "")
        {
            alert("目的地为空");
        }
        else if (!startPoi || this.oDSearchViewController.getStartKeyword() !== startPoi.name)
        {
            alert("请在下拉框中选择起始点");
        }
        else if (!endPoi || this.oDSearchViewController.getEndKeyword() !== endPoi.name)
        {
            alert("请在下拉框中选择目的地");
        }
        else
        {
            const startLocation = startPoi.location;
            const endLocation = endPoi.location;
            this.mapViewController.searchRoute([ startLocation, endLocation ]);
        }
    }

    _onSwitchClick(e)
    {
        const model = sap.ui.getCore().getModel();
        const startPoi = model.getProperty("/startPoi");
        const endPoi = model.getProperty("/endPoi");
        model.setProperty("/startPoi", endPoi);
        model.setProperty("/endPoi", startPoi);
    }


    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            // this.mapViewController.searchRoute([ [32.04389, 118.77881], [31.9790247, 118.7548884] ]);
            // this.mapViewController.searchPlace("丰盛商汇");
        });

    }
}
