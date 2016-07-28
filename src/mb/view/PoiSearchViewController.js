import ViewController from "sap/a/view/ViewController";
import PoiSearchView from "./PoiSearchView";

import ServiceClient from "../../gd/service/ServiceClient";

import CoordinateConvert from "../util/CoordinateConvert";

export default class PoiSearchViewController extends ViewController
{
    afterInit()
    {
        super.afterInit();
        this._initEvent();
    }
    createView(options)
    {
        const opts = $.extend({
            poi: "{/selectedPoi}",
            queryPoi: "{/queryPoi}"
        }, options);
        return new PoiSearchView(opts);
    }
    initView()
    {
        super.initView();
        // this.$input = this.view.$input;
    }
    _initEvent()
    {
        this.view.attachInput(() => {
            ServiceClient.getInstance().searchPoiAutoComplete(this.view.getKeyword()).then(results => {
                this.view.suggestionListView.setItems(results);
                this.view.showSuggestion();
            });
        });
        this.view.attachEnter(() => {
            ServiceClient.getInstance().searchPoiAutoComplete(this.view.getKeyword()).then(results => {
                const result = results[0];
                const location = CoordinateConvert.getInstance().gcj02towgs84(result.location.lng, result.location.lat);
                sap.ui.getCore().getModel().setProperty("/selectedPoi", {
                    name: result.name,
                    location: [ location[1], location[0] ]
                });
            });
        });

    }
}
