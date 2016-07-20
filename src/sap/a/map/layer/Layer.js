import ManagedObject from "sap/ui/base/ManagedObject";

export default class Layer extends ManagedObject
{
    constructor(...args)
    {
        super(...args);
        this.afterInit();
    }

    init()
    {
        this.container = L.layerGroup();
    }

    afterInit()
    {

    }

    isVisible()
    {
        return this.getParent() !== null && this.getParent().map.hasLayer(this.container);
    }

    removeFromParent()
    {
        if (this.getParent() !== null)
        {
            this.getParent().removeLayer(this);
        }
    }
}
