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
