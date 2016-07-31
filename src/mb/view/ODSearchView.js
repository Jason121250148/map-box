import View from "sap/a/view/View";
export default class ODSearchView extends View
{
    metadata = {
        events: {
            searchClick: {  },
            switchClick: {  }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("od-search-view");
        this._initLayout();
        this._initEvent();
    }

    _initLayout()
    {
        this.$element.append(`
            <div class="switch-block">
                <span id="switch" class="icon iconfont icon-switch">
            </div>
            <div class="od-position-block">

            </div>
            <div class="begin-search-block">
                <button id = "begin-search">搜索</button>
            </div>
        `);
        // this.$(".begin-search-block#begin-search").on("click");
    }

    _initEvent()
    {
        this.$("#switch").on("click", this._onSwitchClick.bind(this));
        this.$("#begin-search").on("click", this._onSearchClick.bind(this));
    }

    _onSwitchClick(e)
    {
        this.fireSwitchClick();
    }

    _onSearchClick(e)
    {
        this.fireSearchClick();
    }
}
