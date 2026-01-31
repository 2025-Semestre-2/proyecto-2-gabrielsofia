USE SistemaHoteles;

--Script para la creación de las vistas e indices necesarios.

--Vista para facilitar la busqueda de habitaciones en la web.
GO
CREATE VIEW BusquedaHabitaciones
AS 
SELECT 
	h.Nombre AS NombreHospedaje,
	tho.Nombre AS TipoHospedaje,
	ta.Nombre AS NombreHabitacion,
	ta.Descripcion AS Descripcion,
	ta.Precio AS Precio,
	a.NumeroHabitacion AS NumeroHabitacion,
	a.CupoHuespedes AS CupoHuespedes,
	a.CantCamas AS CantidadCamas,
	a.CantBaños AS CantidadBaños,
	eh.NombreEstado AS Estado,
	fh.URLfoto AS Foto
	FROM Habitacion a
	JOIN TipoHabitacion ta ON ta.IdTipo=a.IdTipo
	JOIN Hospedaje h ON h.CedulaJuridica =ta.IdHospedaje
	JOIN TipoHospedaje tho ON tho.IdTipoCatalogo = h.Tipo
	JOIN EstadoHabitacion eh ON eh.IdEstado=a.IdEstado
	JOIN TipoHabitacionFoto fh ON fh.IdTipoHabitacion=ta.IdTipo;
GO
SELECT * FROM BusquedaHabitaciones;
GO

--Vista para facilitar la busqueda de actividades en la web.
CREATE VIEW BusquedaActividades
AS 
SELECT 
	ar.Nombre AS NombreActividad,
	ar.Descripcion,
	ar.NombreContacto,
	ar.Correo,
	CONCAT(ar.IdPais,' ',ar.IdProvincia,' ',ar.IdCanton,' ',ar.Barrio,'->',ar.Direccion) AS Direccion,
	ar.Precio,
	CONCAT(ate.CodigoPais,' ',ate.Numero) AS Numero,
	ta.Tipo AS TipoActividad
	FROM ActividadRecreacion ar
	JOIN ActividadTelefono ate ON ate.IdActividadRecreacion=ar.CedulaJuridica
	JOIN ActividadRecreacionTipo x ON x.IdActividadRecreacion=ar.CedulaJuridica
	JOIN TipoActividad ta ON ta.IdTipoActividad=x.IdTipoActividad
GO
	
SELECT * FROM BusquedaActividades;
GO
