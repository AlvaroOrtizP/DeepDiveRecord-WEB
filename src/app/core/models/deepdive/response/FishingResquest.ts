export class FishingResquest {
    constructor(
        public id: number,
        public notes: string,
        public caught: boolean,
        public weight: number,
        public latG: number, //Norte - Sur
        public logG: number, //Este - Oeste 
        public fishId: number,
        public name: string,
        public site: string,
        public firstSighting: string,
        public firstLast: string,
        public startSeason: string,
        public endSeason: string,
        public firstLifeWarning: string,
        public geographieId: number,
        public geographieName: string,
        public geographieSite: string,
    ){}
}  