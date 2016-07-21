import Layer from "sap/a/map/layer/Layer";

import ServiceClient from "../../../gd/service/ServiceClient";

import CoordinateConvert from "../../util/CoordinateConvert";

export default class NaviLayer extends Layer
{
    metadata = {
        properties: {
            startLocation: { type: "any" },
            endLocation: { type: "any" }
        }
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
        this.routeGroup = L.featureGroup();
        this.container.addLayer(this.routeGroup);
    }

    setStartLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("startLocation", loc);
        this._updateStartMarker();
    }

    setEndLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);
        this._updateEndMarker();
    }

    drawRoute(route)
    {
        this.routeGroup.clearLayers();
        const paths = route.steps.map(step => {
            return step.path.map(path => {
                let lnglat = CoordinateConvert.getInstance().gcj02towgs84(path.lng, path.lat);
                return [lnglat[1], lnglat[0]];
            });
        });
        this.multiPolyline = L.multiPolyline(paths);
        this.container.addLayer(this.multiPolyline);
    }

    _updateStartMarker()
    {
        if (!this.startMarker)
        {
            this.startMarker = L.circleMarker(this.getStartLocation());
            this.startMarker.setStyle({
                color: "green",
                opacity: 0.8,
                fillColor: "green",
                fillOpacity: 0.8
            });
            this.startMarker.setRadius(5);
            this.markerGroup.addLayer(this.startMarker);
        }
        else
        {
            this.startMarker.setLatLng(this.getStartLocation());
        }
    }

    _updateEndMarker()
    {
        if (!this.endMarker)
        {
            this.endMarker = L.circleMarker(this.getEndLocation());
            this.endMarker.setStyle({
                color: "red",
                opacity: 0.8,
                fillColor: "red",
                fillOpacity: 0.8
            });
            this.endMarker.setRadius(5);
            this.markerGroup.addLayer(this.endMarker);
        }
        else
        {
            this.endMarker.setLatLng(this.getEndLocation());
        }
    }
}
