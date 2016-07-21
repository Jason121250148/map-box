import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";

import ServiceClient from "../../gd/service/ServiceClient";

export default class ApplicationController extends AdaptiveApplicationController
{
    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            this.view.mapView.searchRoute([ [32.04389, 118.77881], [31.9790247, 118.7548884] ]);
        });
    }
}
