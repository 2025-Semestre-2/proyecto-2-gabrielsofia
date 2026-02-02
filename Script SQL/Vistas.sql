USE SistemaHoteles;

--Script para la creaci�n de las vistas e indices necesarios.

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
	a.CantBa�os AS CantidadBa�os,
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

CREATE VIEW RankingHoteles AS
SELECT 
    h.CedulaJuridica,
    h.Nombre AS Hotel,
    COUNT(r.IdReservacion) AS TotalReservas,
    AVG(th.Precio) AS PrecioPromedio,
    SUM(th.Precio * DATEDIFF(DAY, r.FechaHoraIngreso, r.FechaSalida)) AS IngresosTotales,
    AVG(DATEDIFF(DAY, r.FechaHoraIngreso, r.FechaSalida)) AS EstanciaPromedio,
    ROUND(COUNT(r.IdReservacion) * 1.0 / NULLIF(DATEDIFF(DAY, MIN(r.FechaHoraIngreso), GETDATE()), 0) * 30, 2) AS ReservasPorMes
FROM Hospedaje h
LEFT JOIN TipoHabitacion th ON h.CedulaJuridica = th.IdHospedaje
LEFT JOIN Habitacion ha ON th.IdTipo = ha.IdTipo
LEFT JOIN Reservacion r ON ha.IdHabitacion = r.IdHabitacion
GROUP BY h.CedulaJuridica, h.Nombre
HAVING COUNT(r.IdReservacion) > 0;
GO

--DETALLES DE LA HABITACION 
CREATE VIEW vw_DetalleHabitacion AS
SELECT 
    th.IdTipo,
    th.Nombre AS NombreHabitacion,
    th.Descripcion,
    th.Precio,
    tc.Tipos AS TipoCama,
    h.Nombre AS Hotel,
    h.Direccion,
    p.Nombre AS Provincia,
    c.Nombre AS Canton
FROM TipoHabitacion th
JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
JOIN TipoCama tc ON th.IdTipoCama = tc.IdTipoCama
JOIN Provincia p ON h.IdProvincia = p.IdProvincia
JOIN Canton c ON h.IdCanton = c.IdCanton;
GO 

--COMODIDADES DE LA HABITACION 
CREATE VIEW vw_ComodidadesHabitacion AS
SELECT 
    th.IdTipo,
    th.Nombre AS TipoHabitacion,
    STRING_AGG(c.ListaComodidades, ', ') AS Comodidades
FROM TipoHabitacion th
JOIN TipoHabitacionComodidad thc ON th.IdTipo = thc.IdTipoHabitacion
JOIN Comodidades c ON thc.IdComodidad = c.IdComodidades
GROUP BY th.IdTipo, th.Nombre;
GO

--RESERVACIONES ACTIVAS
CREATE VIEW vw_ReservacionesActivas AS
SELECT 
    r.IdReservacion,
    r.NumReservacion,
    c.Nombre + ' ' + c.PApellido AS Cliente,
    h.Nombre AS Hotel,
    ha.NumeroHabitacion,
    r.FechaHoraIngreso,
    r.FechaSalida,
    r.Estado
FROM Reservacion r
JOIN Cliente c ON r.IdCliente = c.IdentificacionCliente
JOIN Habitacion ha ON r.IdHabitacion = ha.IdHabitacion
JOIN TipoHabitacion th ON ha.IdTipo = th.IdTipo
JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
WHERE r.Estado IN ('ACTIVO');
GO

--VISTA FACTURAS
CREATE VIEW vw_Facturas AS
SELECT 
    f.IdFactura,
    f.NumFactura,
    f.FechaHora,
    r.NumReservacion,
    c.Nombre + ' ' + c.PApellido AS Cliente,
    h.Nombre AS Hotel,
    f.ImporteTotal,
    mp.Metodos AS MetodoPago,
    f.Estado
FROM Factura f
JOIN Reservacion r ON f.NumeroReserva = r.IdReservacion
JOIN Cliente c ON r.IdCliente = c.IdentificacionCliente
JOIN Habitacion ha ON r.IdHabitacion = ha.IdHabitacion
JOIN TipoHabitacion th ON ha.IdTipo = th.IdTipo
JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
JOIN MetodoPago mp ON f.MetodoPago = mp.IdMetodo;
GO

--VISTA ACTIVIDADES
CREATE VIEW vw_ActividadesRecreativas AS
SELECT 
    ar.CedulaJuridica,
    ar.Nombre AS Actividad,
    ar.Descripcion,
    ar.Precio,
    ar.NombreContacto,
    ar.Correo,
    p.Nombre AS Provincia,
    c.Nombre AS Canton,
    STRING_AGG(ta.Tipo, ', ') AS TiposActividad
FROM ActividadRecreacion ar
JOIN Provincia p ON ar.IdProvincia = p.IdProvincia
JOIN Canton c ON ar.IdCanton = c.IdCanton
LEFT JOIN ActividadRecreacionTipo art ON ar.CedulaJuridica = art.IdActividadRecreacion
LEFT JOIN TipoActividad ta ON art.IdTipoActividad = ta.IdTipoActividad
GROUP BY ar.CedulaJuridica, ar.Nombre, ar.Descripcion, ar.Precio, ar.NombreContacto, ar.Correo, p.Nombre, c.Nombre;
GO

--VISTA REPORTE FECHA
CREATE VIEW vw_ReporteDiario AS
SELECT 
    CONVERT(DATE, f.FechaHora) AS Fecha,
    h.Nombre AS Hotel,
    COUNT(f.IdFactura) AS CantidadFacturas,
    SUM(f.ImporteTotal) AS TotalFacturado
FROM Factura f
JOIN Reservacion r ON f.NumeroReserva = r.IdReservacion
JOIN Habitacion ha ON r.IdHabitacion = ha.IdHabitacion
JOIN TipoHabitacion th ON ha.IdTipo = th.IdTipo
JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
WHERE f.Estado = 'PAGADO'
GROUP BY CONVERT(DATE, f.FechaHora), h.Nombre;
GO

--VISTA DISPONIBILIDAD POR FECHAS
CREATE VIEW vw_DisponibilidadPorFecha AS
SELECT 
    ha.IdHabitacion,
    ha.NumeroHabitacion,
    th.Nombre AS TipoHabitacion,
    th.Precio,
    h.Nombre AS Hotel,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM Reservacion r 
            WHERE r.IdHabitacion = ha.IdHabitacion 
                AND r.Estado IN ('ACTIVO')
                AND GETDATE() BETWEEN r.FechaHoraIngreso AND r.FechaSalida
        ) THEN 'OCUPADA'
        ELSE 'DISPONIBLE'
    END AS EstadoActual
FROM Habitacion ha
JOIN TipoHabitacion th ON ha.IdTipo = th.IdTipo
JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica;
GO

--VISTA SERVICIOS
CREATE VIEW vw_ServiciosHotel AS
SELECT 
    h.CedulaJuridica,
    h.Nombre AS Hotel,
    STRING_AGG(s.Servicios, ', ') AS Servicios
FROM Hospedaje h
JOIN HospedajeServicio hs ON h.CedulaJuridica = hs.IdHospedaje
JOIN Servicios s ON hs.IdServicio = s.IdServicio
GROUP BY h.CedulaJuridica, h.Nombre;
GO

--HOTELES POR UBICACION
CREATE VIEW vw_HotelesPorUbicacion AS
SELECT 
    p.Nombre AS Provincia,
    c.Nombre AS Canton,
    COUNT(h.CedulaJuridica) AS CantidadHoteles,
    STRING_AGG(h.Nombre, ', ') AS ListaHoteles
FROM Hospedaje h
JOIN Provincia p ON h.IdProvincia = p.IdProvincia
JOIN Canton c ON h.IdCanton = c.IdCanton
GROUP BY p.Nombre, c.Nombre;
GO

--VISTA LOGIN
CREATE OR ALTER VIEW vw_UsuariosLogin AS
SELECT 
    UsuarioID,
    NombreUsuario,
    TipoUsuario
FROM Usuarios;
GO