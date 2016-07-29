import ListView from "sap/a/view/BaseListView";
export default class SuggestionListView extends ListView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("striped");
    }

    $createItem(itemType = 0)
    {
        const $item = super.$createItem(itemType);
        $item.append(`
            <span class="district"></span>
        `);
        return $item;
    }

    renderItem(item, $item)
    {
        super.renderItem(item, $item);
        $item.find(".district").text(item.district);
    }
}
