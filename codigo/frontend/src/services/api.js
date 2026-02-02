// src/services/api.js
import axios from 'axios';

// Configuración base
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log("🔗 URL de API:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para logging
api.interceptors.request.use(
  (config) => {
    console.log(`➡️  ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log('📦 Payload:', JSON.stringify(config.data, null, 2));
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`⬅️  ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Error en response:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.response?.status === 400) {
      return Promise.reject(new Error(error.response.data.error || 'Datos inválidos'));
    }
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Tiempo de espera agotado. El servidor no responde.'));
    }
    
    if (!error.response) {
      return Promise.reject(new Error('Error de conexión. Verifica que el servidor esté corriendo.'));
    }
    
    return Promise.reject(error);
  }
);

// Servicios para Hospedajes
export const hospedajesService = {
  create: async (hospedajeData) => {
    try {
      console.log('🚀 Enviando datos al backend...');
      const response = await api.post('/hospedajes', hospedajeData);
      console.log('✅ Respuesta recibida:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al crear hospedaje:', error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/hospedajes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener hospedajes:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/hospedajes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener hospedaje:', error);
      throw error;
    }
  }
};

// Servicios para Actividades (si los necesitas)
export const actividadesService = {
  create: async (actividadData) => {
    try {
      const response = await api.post('/actividades', actividadData);
      return response.data;
    } catch (error) {
      console.error('Error al crear actividad:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/actividades');
      return response.data;
    } catch (error) {
      console.error('Error al obtener actividades:', error);
      throw error;
    }
  }
};

export default api;