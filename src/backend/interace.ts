export interface Pin {
  name: string;
  lat: number;
  flags: string[];
  lng: number;
}

export interface EnhancedPin extends Omit<Pin, "name"> {
  city: string;
  country: string;
}
export interface Response {
  language: string;
  username: string;
  places: EnhancedPin[];
}

export interface Stat {
  username: string;
  countries: number;
  cities: number;
}

export interface TransformedStat {
  date: number;
  countries: number;
  cities: number;
}

export interface RecordStat {
  string: TransformedStat;
}
