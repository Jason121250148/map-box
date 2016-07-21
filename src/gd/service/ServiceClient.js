import ManagedObject from "sap/ui/base/ManagedObject";



export default class ServiceClient extends ManagedObject
{
    static _instance = null;

    metadata = {
        events: {
            ready: {  }
        }
    };

    static getInstance()
    {
        if (gd.service.ServiceClient._instance === null)
        {
            gd.service.ServiceClient._instance = new gd.service.ServiceClient();
        }
        return gd.service.ServiceClient._instance;
    }

    init()
    {
        AMap.service( "AMap.Driving", (status, result) => {
            setTimeout(() => {
                this.fireReady();
            });
        });
    }

    searchRoute(locations, options)
    {
        return this.convert84toGcj02(locations).then(locs => {
            return new Promise((resolve, reject) => {
                const driving = new AMap.Driving();
                const searchLocs = locs.map(loc => {
                    return [ loc.lng, loc.lat ]
                });
                driving.search(searchLocs[0], searchLocs[1], (status, result) => {
                    if (status === "complete" && result.info === "OK")
                    {
                        resolve(result.routes[0]);
                    }
                    else
                    {
                        reject(status);
                    }
                });
            });
        });
    }


    convert84toGcj02(locations)
    {
        const locs = locations.map(loc => {
            let latlng = L.latLng(loc);
            return [latlng.lng, latlng.lat];
        });
        return new Promise((resolve, reject) => {
            AMap.convertFrom(locs, "gps", (status, result) => {
                if (status === "complete" && result.info === "ok")
                {
                    resolve(result.locations);
                }
                else
                {
                    reject(status);
                }
            });
        });
    }





}
