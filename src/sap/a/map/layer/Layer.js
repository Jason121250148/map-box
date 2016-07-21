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
        this.container = L.featureGroup();
    }

    getBounds()
    {
        return this.container.getBounds();
    }

    fitBounds()
    {
        if (this.getParent())
        {
            this.getParent().setBounds(this.getBounds());
        }
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
