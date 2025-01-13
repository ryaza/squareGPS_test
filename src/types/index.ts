export interface IMarker {
  id: number;
  lat: number;
  lng: number;
  address: string;
}

export type FetchAddress = (lat: number, lng: number) => Promise<string | null>;
export type AddMarker = (lat: number, lng: number) => Promise<void>;
