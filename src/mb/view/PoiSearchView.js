import View from "sap/a/view/View";


export default class PoiSearchView extends View
{
    metadata = {
        properties: {
            keyword: {  }
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
        this.initLayout();
        let timeout = null
        this.$input.on("input", () => {
            if (timeout)
            {
                window.clearTimeout(timeout);
                timeout = null;
            }
            timeout = window.setTimeout(() => {
                this.fireInput();
            }, 200);
        });
        this.$input.on("keydown", this._onEnter.bind(this));
    }

    initLayout()
    {
        this.$input = $(`<input class="search" type="search" placeholder="请输入搜索地址">`);
        this.$element.append(this.$input);
    }

    _onEnter(e)
    {
        if (e.keyCode === 13)
        {
            this.fireEnter();
        }
    }

    getKeyword()
    {
        return this.$input.val();
    }

    setKeyword(value)
    {
        this.$input.val(value);
    }
}
