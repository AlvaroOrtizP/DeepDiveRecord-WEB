export class DiveDayResponse {
    constructor(
        /*Datos de dive_day */
        public dive_day_id: number,
        public day: number,
        public month: number,
        public year: number,
        public beginning: string,
        public end: string,
        public site: string,
        public assessment: string,
        public notes: string,
        
        /*Datos de geographical_location */
        public geographicalLocationResponse: GeographicalLocationResponse,

        /*Datos de tide_table */
        public tideTableResponse: TideTableResponse,

        /*Datos de wind_conditions (list) */
        public windConditionsList: WindCondition[],

        /*Tabla fishing */
        public fishingList: Fishing[],
    ) { }
}
export class GeographicalLocationResponse{
    constructor(
        public id: number,
        public name: string,
        public site: string,
    ){}
}     
export class TideTableResponse{
    constructor(
        public day: number,
        public month: number,
        public year: number,
        public site: string,
        public moonPhase: number,
        public coefficient0H: number,
        public coefficient12H: number,
        public morningHighTideTime: string,
        public morningHighTideHeight: string,
        public afternoonHighTideTime: string,
        public afternoonHighTideHeight: string,
        public morningLowTideTime: string,
        public morningLowTideHeight: string,
        public afternoonLowTideTime: string,
        public afternoonLowTideHeight: string,
    ){}
}
export class WindCondition {
    constructor(
        public year: number,
        public month: number,
        public day: number,
        public site: string,
        public timeOfDay: number,
        public wind: number,
        public windDirection: number,
        public windDirectionNM: string,
        public gustsOfWind: number,
        public waveHeight: string,
        public wavePeriod: number,
        public waveDirection: string,
        public waveDirectionNM: string,
        public earthTemperature: number,
        public waterTermperature: string,
        public conditionCode: number,
        public conditionDescription: string,
    ) {}
}
export class Fishing {
    constructor(
        public id: number,       
        public notes: string,
        public caught: boolean,
        public weight: number,
        public nameFish: string,
        public name: string,
        public site: string,
        public latG: number, //Norte - Sur
        public longG: number, //Este - Oeste
    ) {}
}
