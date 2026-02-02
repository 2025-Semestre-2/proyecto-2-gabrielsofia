import { useState } from "react";

export function useHospedajeData() {
  const [hospedajeData, setHospedajeData] = useState({
    tipoHospedaje: "",
    stayType: "",
    ubicacion: {
      cedulaJuridica: 12345678,
      nombre: "",
      canton: "",
      distrito: "",
      barrio: "",
      direccion: "",
      gpsUrl: "",
      correo: "",
      url: "",
    },
    habitaciones: [],
    amenities: [],
  });

  return [hospedajeData, setHospedajeData];
}
