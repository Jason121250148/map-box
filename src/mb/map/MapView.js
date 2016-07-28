import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "../../gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";
import SelectedLayer from "./layer/SelectedLayer";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        events: {
            mapClicked: { parameters: { location: "object" } }
        }
    };
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
        this._initLayers();
        this._initEvent();
    }

    _initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);
        this.naviLayer = new NaviLayer();
        this.addLayer(this.naviLayer);
        this.selectedLayer = new SelectedLayer();
        this.addLayer(this.selectedLayer);
    }

    _initEvent()
    {
        this.map.on("click", this._map_click.bind(this));
    }

    _map_click(e)
    {
        this.fireMapClicked({
            location: e.latlng
        });
    }
}
