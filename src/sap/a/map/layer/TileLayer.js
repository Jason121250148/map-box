import Layer from "./Layer";

export default class TileLayer extends Layer
{
    metadata = {
        properties: {
            url: { type: "string" },
            opacity: { type: "float" }
        }
    };

    init()
    {
        this.container = L.tileLayer();
    }

    setUrl(url)
    {
        this.setProperty("url", url);
        if (url)
        {
            this.container.setUrl(url);
        }
    }

    serOpacity(opacity)
    {
        this.setProperty("opacity", opacity);
        this.container.setOpacity(opacity);
    }

}
