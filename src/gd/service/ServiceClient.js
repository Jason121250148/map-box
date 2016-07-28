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
        AMap.service( ["AMap.Driving", "AMap.Autocomplete", "AMap.Geocoder"], (status, result) => {
            this.autoComplete = new AMap.Autocomplete({
                city: "南京市"
            });
            this.geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });

            setTimeout(() => {
                this.fireReady();
            });
        });
    }

    searchPoiAutoComplete(keyword)
    {
        return new Promise((resolve, reject) => {
            if (keyword)
            {
                this.autoComplete.search(keyword, (status, result) => {
                    if (status === "complete" && result.info === "OK")
                    {
                        resolve(result.tips);
                    }
                    else if (status === "no_data") {
                        resolve([]);
                    }
                    else
                    {
                        reject({
                            status,
                            info: result.info
                        });
                    }
                });
            }
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
                        reject({
                            status,
                            info: result.info
                        });
                    }
                });
            });
        });
    }


    convert84toGcj02(locations)
    {
        let arrLocations = locations;
        if (!Array.isArray(locations))
        {
            arrLocations = [ locations ];
        }
        const locs = arrLocations.map(loc => {
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
                    reject({
                        status,
                        info: result.info
                    });
                }
            });
        });
    }

    doGeocoder(location)
    {
        return new Promise((resolve, reject) => {
            this.geocoder.getAddress([ location.lng, location.lat ], (status, result) => {
                if (status === "complete" && result.info === "OK")
                {
                    resolve(result);
                }
                else
                {
                    reject({
                        status,
                        info: result.info
                    });
                }
            });
        });
    }
}
