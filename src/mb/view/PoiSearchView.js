import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class PoiSearchView extends View
{
    metadata = {
        properties: {
            keyword: {  },
            poi: { type: "object", bindable: true },
            queryPoi: { type: "object", bindable: true }
        },
        events: {
            input: {  },
            enter: {  },
            geocoder: {  }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-poi-search-view");
        this._initLayout();
        this._initEvent();

        this._initSuggestionListView();
    }

    _initSuggestionListView()
    {
        this.suggestionListView = new SuggestionListView("mb-suggestion-list-view");
        this.addSubview(this.suggestionListView);
    }

    _initLayout()
    {
        this.$input = $(`
            <input class="search" type="search" placeholder="请输入搜索地址">
        `);
        this.$element.append(this.$input);

        this.$searchIcon = $(`
            <span class='icon iconfont icon-search'>
        `);
        this.$element.append(this.$searchIcon);
    }

    _initEvent()
    {
        let timeout = null;
        this.$input.on("input", (e) => {
            if (timeout)
            {
                window.clearTimeout(timeout);
                timeout = null;
            }
            timeout = window.setTimeout(() => {
                this.fireInput();
            }, 200);
        });
        this.$searchIcon.on("click", this._onIconClick.bind(this));
        this.$input.on("keydown", this._onEnter.bind(this));

        this.$input.on("focus", this._onFocus.bind(this));
        this.$input.on("blur", this._onBlur.bind(this));
    }

    _onEnter(e)
    {
        if (e.keyCode === 13)
        {
            this.fireEnter();
        }
    }

    _onIconClick(e)
    {
        this.fireEnter();
    }

    getKeyword()
    {
        return this.$input.val();
    }

    setKeyword(value)
    {
        this.$input.val(value);
    }

    setPoi(poi)
    {
        this.setProperty("poi", poi);
        if (poi)
        {
            this.setKeyword(poi.name);
        }
    }

    setQueryPoi(queryPoi)
    {
        this.setProperty("queryPoi", queryPoi);
        if (queryPoi)
        {
            this.setKeyword(queryPoi.name);
        }
    }

    hideSuggestion()
    {
        this.suggestionListView.$element.hide();
    }

    showSuggestion()
    {
        this.suggestionListView.$element.show();
    }

    toggleSuggestion(shown)
    {
        if (shown)
        {
            this.showSuggestion();
        }
        else {
            this.hideSuggestion();
        }
    }

    _onFocus(e)
    {
        this.toggleSuggestion(this.getKeyword() && this.suggestionListView.getItems() && this.suggestionListView.getItems().length > 0);
    }

    _onBlur(e)
    {
        this.hideSuggestion();
    }
}
