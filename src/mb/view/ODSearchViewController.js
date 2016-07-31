import ViewController from "sap/a/view/ViewController";

import ODSearchView from "./ODSearchView";
import PoiSearchViewController from "./PoiSearchViewController";

export default class ODSearchViewController extends ViewController
{
    afterInit()
    {
        super.afterInit();
    }
    createView(options)
    {
        return new ODSearchView(options);
    }
    initView()
    {
        super.initView();
        this._initController();
        this._initEvent();
    }

    _initController()
    {
        this.poiSearchViewControllerStart = new PoiSearchViewController({
            viewOptions: {
                selectedPoi: "{/startPoi}",
                content: "起点"
            }
        });
        this.poiSearchViewControllerEnd = new PoiSearchViewController({
            viewOptions: {
                selectedPoi: "{/endPoi}",
                content: "终点"
            }
        });
        this.addViewController(this.poiSearchViewControllerStart, this.view.$element.find(".od-position-block"));
        this.addViewController(this.poiSearchViewControllerEnd, this.view.$element.find(".od-position-block"));
    }

    _initEvent()
    {

    }

    setStartKeyword(value)
    {
        if (value)
        {
            this.poiSearchViewControllerStart.view.setKeyword(value);
        }
        else
        {
            this.poiSearchViewControllerStart.view.setKeyword("");
        }
    }

    getStartKeyword()
    {
        return this.poiSearchViewControllerStart.view.getKeyword();
    }

    setEndKeyword(value)
    {
        if (value)
        {
            this.poiSearchViewControllerEnd.view.setKeyword(value);
        }
        else
        {
            this.poiSearchViewControllerEnd.view.setKeyword("");
        }
    }

    getEndKeyword()
    {
        return this.poiSearchViewControllerEnd.view.getKeyword();
    }

}
