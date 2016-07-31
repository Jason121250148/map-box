import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "../../gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";
import SelectedLayer from "./layer/SelectedLayer";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        properties: {
            queryPoi: { type: "object", bindable: true }
        },
        events: {
            mapClick: { parameters: { location: "object" } }
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
        this.naviLayer = new NaviLayer({
            startPoi: "{/startPoi}",
            endPoi: "{/endPoi}"
        });
        this.addLayer(this.naviLayer);
        this.selectedLayer = new SelectedLayer({
            selectedPoi: "{/selectedPoi}",
        });
        this.addLayer(this.selectedLayer);
    }

    _initEvent()
    {
        this.map.on("click", this._map_click.bind(this));
    }

    _map_click(e)
    {
        if (e.originalEvent.ctrlKey)
        {
            this.fireMapClick({
                location: e.latlng
            });
        }
    }

    setSelectedPoi(poi)
    {
        this.setProperty("selectedPoi", poi);
        if (poi)
        {
            this.setCenterLocation(poi.location);
        }
    }

    setQueryPoi(queryPoi)
    {
        this.setProperty("queryPoi", queryPoi);
        if (queryPoi)
        {
            this.updatePopup();
            console.log(queryPoi);
        }
    }

    updatePopup()
    {
        if (!this.clickPoiMarker)
        {
            this.clickPoiMarker = L.popup();
            this.clickPoiMarker.setLatLng(this.getQueryPoi().location);
            this.clickPoiMarker.setContent(this.getQueryPoi().name);
            this.map.addLayer(this.clickPoiMarker);
        }
        else
        {
            this.clickPoiMarker.setLatLng(this.getQueryPoi().location);
            this.clickPoiMarker.setContent(this.getQueryPoi().name);
            this.map.addLayer(this.clickPoiMarker);
        }
    }

}
