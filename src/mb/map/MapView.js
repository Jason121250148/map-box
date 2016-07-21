import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ExampleLayer from "./layer/ExampleLayer";

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
        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
        this.exampleLayer.setStartLocation([32.04389, 118.77881]);
        this.exampleLayer.setEndLocation([31.9790247, 118.7548884]);
        this.exampleLayer.drawRoute();
        this.exampleLayer.fitBounds();
    }
}
