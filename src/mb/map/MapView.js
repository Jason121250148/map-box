import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "../../gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";

export default class MapView extends AdaptiveMapView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
        this.initLayers();
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);
        this.naviLayer = new NaviLayer();
        this.addLayer(this.naviLayer);
        // this.naviLayer.fitBounds();
    }

    searchRoute(locations)
    {
        this.naviLayer.applySettings({
            startLocation: locations[0],
            endLocation: locations[1]
        });
        this.naviLayer.fitBounds();
        ServiceClient.getInstance().searchRoute(locations).then(route => {
            this.naviLayer.drawRoute(route);
        });
    }
}
