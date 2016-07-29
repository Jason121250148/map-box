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
    }
    _initEvent()
    {
        this.view.attachInput(this._onInput.bind(this));
        this.view.attachEnter(this._onEnter.bind(this));
        this.view.suggestionListView.attachItemClick(this._onItemClick.bind(this));
    }

    _onInput(e)
    {
        ServiceClient.getInstance().searchPoiAutoComplete(this.view.getKeyword()).then(results => {
            this.view.suggestionListView.setItems(results);
            this.view.showSuggestion();
        });
    }

    _onEnter(e)
    {
        ServiceClient.getInstance().searchPoiAutoComplete(this.view.getKeyword()).then(results => {
            const result = results[0];
            const location = CoordinateConvert.getInstance().gcj02towgs84(result.location.lng, result.location.lat);
            sap.ui.getCore().getModel().setProperty("/selectedPoi", {
                name: result.name,
                location: [ location[1], location[0] ]
            });
        });
    }

    _onItemClick(e)
    {
        const item = e.getParameters().item;
        const location = CoordinateConvert.getInstance().gcj02towgs84(item.location.lng, item.location.lat);
        const name = item.name;
        sap.ui.getCore().getModel().setProperty("/selectedPoi", {
            name: name,
            location: [ location[1], location[0] ]
        });
    }
}
