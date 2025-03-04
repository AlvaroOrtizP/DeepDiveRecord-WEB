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
  export interface OutGetDataMedia {
    month: number;
    day: number;
    dayOfYear: number;
    year: number;
    site: string;
    timeOfDay: number;
    minWinter: number;
    maxWinter: number;
    windDirection: number; 
    minGustsOfWind: number; 
    maxGustsOfWind: number;
    minWaveHeight: number;
    maxWaveHeight: number;
    minWavePeriod: number;
    maxWavePeriod: number;
    waveDirection: number;
    minEarthTemperature: number;
    maxEarthTemperature: number;
    minWaterTemperature: number;
    maxWaterTemperature: string;
    category: string;
    f: number;
    descripcion: string;

  }
  
  export interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface OutGetDataList {
    outGetDataList: OutGetData[];
    outGetDataMediaList: OutGetDataMedia[];
    pagination: Pagination;
  }