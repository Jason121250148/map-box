import ListView from "sap/a/view/BaseListView";
export default class SuggestionListView extends ListView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("striped");
    }
}
