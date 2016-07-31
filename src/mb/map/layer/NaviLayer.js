import Layer from "sap/a/map/layer/Layer";

import ServiceClient from "../../../gd/service/ServiceClient";

import CoordinateConvert from "../../util/CoordinateConvert";

export default class NaviLayer extends Layer
{
    metadata = {
        properties: {
            startPoi: { type: "object", bindable: true },
            endPoi: { type: "object", bindable: true },
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

    setStartPoi(startPoi)
    {
        this.setProperty("startPoi", startPoi);
        this._updateStartMarker();
    }

    setEndPoi(endPoi)
    {
        this.setProperty("endPoi", endPoi);
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
        this.routeGroup.addLayer(this.multiPolyline);
    }

    _updateStartMarker()
    {
        if (this.getStartPoi())
        {
            const location = L.latLng(this.getStartPoi().location);
            if (!this.startMarker)
            {
                this.startMarker = L.circleMarker(location);
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
                this.startMarker.setLatLng(location);
            }
        }
    }

    _updateEndMarker()
    {
        if (this.getEndPoi())
        {
            const location = L.latLng(this.getEndPoi().location);
            if (!this.endMarker)
            {
                this.endMarker = L.circleMarker(location);
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
                this.endMarker.setLatLng(location);
            }
        }
    }
}
