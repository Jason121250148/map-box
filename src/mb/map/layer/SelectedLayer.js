import Layer from "sap/a/map/layer/Layer";

export default class SelectedLayer extends Layer
{
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true},
            queryPoi: { type: "object", bindable: true }
        }
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
    }

    setSelectedPoi(poi)
    {
        this.setProperty("selectedPoi", poi);
        if (poi)
        {
            this.updateMarker();
        }
    }

    setQueryPoi(queryPoi)
    {
        this.setProperty("queryPoi", queryPoi);
        if (queryPoi)
        {
            this.updatePopup();
        }
    }

    updateMarker()
    {
        const selectedPoi = this.getSelectedPoi();
        if (selectedPoi)
        {
            if (!this.selectedPoiMarker)
            {
                this.selectedPoiMarker = L.circleMarker(selectedPoi.location);
                this.selectedPoiMarker.setRadius(5);
                this.selectedPoiMarker.setStyle({
                    color: "red",
                    fillColor: "red",
                    fillOpacity: 0.9
                });
                this.markerGroup.addLayer(this.selectedPoiMarker);
                console.log(this.selectedPoiMarker);
            }
            else
            {
                this.selectedPoiMarker.setLatLng(selectedPoi.location);
                this.markerGroup.addLayer(this.selectedPoiMarker);
            }
        }
    }

    updatePopup()
    {
        if (!this.clickPoiMarker)
        {
            this.clickPoiMarker = L.popup();
            this.clickPoiMarker.setLatLng(this.getQueryPoi().location);
            this.clickPoiMarker.setContent(this.getQueryPoi().name);
            this.markerGroup.addLayer(this.clickPoiMarker);
        }
        else
        {
            this.clickPoiMarker.setLatLng(this.getQueryPoi().location);
            this.markerGroup.addLayer(this.clickPoiMarker);
        }
    }

}
