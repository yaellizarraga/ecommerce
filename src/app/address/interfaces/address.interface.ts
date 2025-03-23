export interface Domicilio {
    Id_Persona_Direccion: number;
    Calle: string;
    Colonia: string;
    Estado: string;
    Pais: string;
    Num_Int?: string;
    Num_Ext?: string;
    Indicaciones?: string;
    Entre_Calle1?: string;
    Entre_Calle2?: string;
    Geolocalizacion?: string;
    Imagen_Domicilio?: string;
    Referencia?: string;
    Localidad: string;
    Municipio: string;
  }