export interface OutGetData {
    month: number;
    day: number;
    year: number;
    site: string;
    timeOfDay: string;
    wind: number;
    windDirection: number; 
    gustsOfWind: number;
    waveHeight: string;
    wavePeriod: number;
    waveDirection: number;
    earthTemperature: number;
    waterTemperature: string;
    f1: number;
    descripcion1: string;

  }
  
  export interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface OutGetDataList {
    outGetDataList: OutGetData[];
    pagination: Pagination;
  }