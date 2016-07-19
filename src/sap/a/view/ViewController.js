import ManagedObject from "sap/ui/base/ManagedObject";

import View from "./View";

export default class ViewController extends ManagedObject
{
    metadata = {
        properties: {
            viewOptions: { type: "object", defaultValue: {} }
        }
    };

    constructor(...args)
    {
        super(...args);
        this.afterInit();
    }

    init()
    {

    }

    afterInit()
    {
        // this._view = this.createView(this.getViewOptions());
        // this.initView();
        this.view = this.createView(this.getViewOptions());
        if (this.view instanceof View)
        {
            this.initView();
        }
        else
        {
            throw new Error("createView(options) must return an instance of sap.a.view.View.");
        }
    }

    getView()
    {
        return this.view;
    }

    createView(options)
    {
        return new Error("CreateView(options) must be override in the derived class.");
    }

    initView()
    {

    }

}
