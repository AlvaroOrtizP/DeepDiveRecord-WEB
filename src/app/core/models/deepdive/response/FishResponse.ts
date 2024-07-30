export class FishResponse {
    constructor(
        public id : number,
        public  name: string,
        public  site: string,
        public  firstSighting: string,
        public  firstLast: string,
        public  startSeason: string,
        public  endSeason: string,
        public  firstLifeWarning: string,
    ) { }
}