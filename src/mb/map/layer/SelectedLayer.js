import Layer from "sap/a/map/layer/Layer";

export default class SelectedLayer extends Layer
{
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true},
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
                const myIcon = L.icon({
                    iconUrl: 'vendor/leaflet/images/marker-icon.png',
                    iconAnchor: [14, 34],
                });
                this.selectedPoiMarker = L.marker(selectedPoi.location);
                this.selectedPoiMarker.setIcon(myIcon);
                this.markerGroup.addLayer(this.selectedPoiMarker);
            }
            else
            {
                this.selectedPoiMarker.setLatLng(selectedPoi.location);
                this.markerGroup.addLayer(this.selectedPoiMarker);
            }
        }
    }



}
