export class InCreateFishing {
    constructor(
        public fishId: number,
        public caught: boolean,
        public name: string,
        public site: string,
        public lat: number, //Norte - Sur
        public long: number, //Este - Oeste
        public notes: string,
        public weight: number,
        public idDiveDay: number,
    ) {}
}