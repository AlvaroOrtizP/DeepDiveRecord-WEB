export class InEditFishing {
  constructor(
    public fishingId: number = 0,
    public fishId: number = 0,
    public caught: boolean = false,
    public name: string = '',
    public site: string = '',
    public notes: string = '',
    public weight: number = 0,
    public latG: number = 0,
    public longG: number = 0,
    public idDiveDay: number = 0,
    public sightingTime: string = '',
  ) {}
}
