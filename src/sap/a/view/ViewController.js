import ManagedObject from "sap/ui/base/ManagedObject";

import View from "./View";

export default class ViewController extends ManagedObject
{
    metadata = {
        properties: {
            viewOptions: { type: "object" },
        },
        aggregations: {
            childViewControllers: { type: "sap.a.view.ViewController" }
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
        throw new Error("createView(options) must be override in the derived class.");
    }

    initView()
    {

    }

    addViewController(viewController, $container)
    {
        this.addAggregation("childViewControllers", viewController);
        this.view.addSubview(viewController.view, $container);
        return this;
    }

    removeViewController(viewController, neverUseAgain = false)
    {
        const result = this.removeAggregation("childViewControllers", viewController);
        if (result)
        {
            this.view.removeSubview(viewController, neverUseAgain);
        }
        return result;
    }

    removeAllViewControllers(neverUseAgain = false)
    {
        while (this.getChildViewControllers().length > 0) {
            this.removeViewController(this.getChildViewControllers()[0], neverUseAgain);
        }
    }

    removeFromParent()
    {

    }

}
