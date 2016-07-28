import Layer from "sap/a/map/layer/Layer";

export default class SelectedLayer extends Layer
{

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
    }

    updateMarker()
    {
        const model = sap.ui.getCore().getModel();
        const selectedPoi = model.getProperty("/selectedPoi");
        if (selectedPoi)
        {
            if (!this.selectedPoiMarker)
            {
                this.selectedPoiMarker = L.circleMarker(selectedPoi.location);
                this.selectedPoiMarker.setRadius(5);
                this.selectedPoiMarker.setStyle({
                    color: "blue",
                    fillColor: "blue"
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

    }

}
