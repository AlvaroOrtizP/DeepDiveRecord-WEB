export class InCreateFishing {
    constructor(
        public fishId: number,
        public caught: boolean,
        public name: string,
        public site: string,
        public latG: string, //Norte - Sur
        public longG: string, //Este - Oeste
        public notes: string,
        public weight: number,
        public idDiveDay: number,
    ) {}
}