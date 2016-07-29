import JSONModel from "sap/ui/model/json/JSONModel";

export default class Model extends JSONModel
{
    constructor(...args)
    {
        super(...args);
        this.init();
    }

    init()
    {

    }

    forceSetProperty(sPath, oValue, oContent, bAsyncUpate)
    {
        const result = this.setProperty(sPath, oValue, oContent, bAsyncUpate);
        this.checkUpdate(true, false);
        return result;
    }
}
