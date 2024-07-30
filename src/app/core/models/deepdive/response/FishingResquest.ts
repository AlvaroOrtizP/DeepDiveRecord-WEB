export class FishingResquest {
    constructor(
        public id: number,
        /*Tabla fish */
        public fish: Fish,
        public notes: string,
        public caught: boolean,
        public weight: number,
        public geographicalLocationResponse: GeographicalLocationResponse,
        public lat: number, //Norte - Sur
        public log: number, //Este - Oeste 

    ) {}
}
export class Fish {
    constructor(
        public id: number,
        public name: string,
        public site: string,
        public firstSighting: string,
        public firstLast: string,
        public startSeason: string,
        public endSeason: string,
        public firstLifeWarning: string,
    ) {}
}
export class GeographicalLocationResponse{
    constructor(
        public id: number,
        public name: string,
        public site: string,
    ){}
}  