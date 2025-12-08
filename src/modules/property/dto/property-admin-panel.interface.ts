export interface PropertyAdminPanel {
  agent: string;
  owner: string;
  operation: 'SELL' | 'RENT';
  type: 'haus' | 'wohnung' | 'gewerbe' | 'grundstueck' | 'sonstige';
  status: 'PUBLISHED' | 'RESERVED' | 'SOLD' | 'RENTED' | 'DRAFT' | 'HIDDEN';
  address_line: string;
  city: string;
  postal_code: string;
  built_area_m2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  price_amount: number;
  currency: string;
  main_image: string;
  category: 'haus' | 'wohnung' | 'gewerbe' | 'grundstueck' | 'sonstige';

  // --- Opcionales (Mehr anzeigen) ---

  country?: string;
  latitude?: number;
  longitude?: number;
  usable_area_m2?: number;
  plot_area_m2?: number;
  floor?: number;
  floors_total?: number;
  has_elevator?: boolean;
  parking_spaces?: number;
  garage?: boolean;
  storage_room?: boolean;
  kitchen_type?: string;
  heating?: string;
  air_conditioning?: boolean;
  furnished?: string;
  build_year?: number;
  renovation_year?: number;
  available_from?: Date;
  community_fees?: number;
  deposit?: number;
  commission_info?: string;
  energy_label?: string;
  energy_consumption_kwh_m2y?: number;
  balcony?: boolean;
  terrace?: boolean;
  garden?: boolean;
  pool?: boolean;
  fireplace?: boolean;
  sea_view?: boolean;
  mountain_view?: boolean;
  city_view?: boolean;
  solar_panels?: boolean;
  floor_heating?: boolean;
  concierge?: boolean;
  description?: string;
  notes_internal?: string;
  title?: string;
  is_new?: boolean;
}
