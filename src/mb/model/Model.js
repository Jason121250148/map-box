import AdaptiveModel from "sap/a/model/Model";

export default class Model extends AdaptiveModel
{
    constructor(...args)
    {
        super({
            selectedPoi: null,
            queryPoi: null
        });
    }
}
