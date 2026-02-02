USE SistemaHoteles;
--BUSCARHABITACIONES DISPONIBLES
CREATE PROCEDURE sp_BuscarHabitacionesDisponibles
    @FechaInicio DATE,
    @FechaFin DATE,
    @IdProvincia INT = NULL,
    @IdCanton INT = NULL
AS
BEGIN
    SELECT DISTINCT
        h.Nombre AS Hotel,
        th.Nombre AS TipoHabitacion,
        th.Precio,
        ha.NumeroHabitacion,
        COUNT(ha.IdHabitacion) OVER(PARTITION BY th.IdTipo) AS Disponibles
    FROM Habitacion ha
    JOIN TipoHabitacion th ON ha.IdTipo = th.IdTipo
    JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
    WHERE ha.IdEstado = 1
        AND ha.IdHabitacion NOT IN (
            SELECT IdHabitacion 
            FROM Reservacion 
            WHERE Estado IN ('ACTIVO')
                AND (@FechaInicio BETWEEN FechaHoraIngreso AND FechaSalida
                     OR @FechaFin BETWEEN FechaHoraIngreso AND FechaSalida)
        )
        AND (@IdProvincia IS NULL OR h.IdProvincia = @IdProvincia)
        AND (@IdCanton IS NULL OR h.IdCanton = @IdCanton)
    ORDER BY th.Precio;
END;
GO

--CHECKOUT
CREATE PROCEDURE sp_HacerCheckOut
    @IdReservacion INT
AS
BEGIN
    UPDATE Reservacion SET Estado = 'CERRADO' WHERE IdReservacion = @IdReservacion;
    UPDATE Habitacion SET IdEstado = 1 
    WHERE IdHabitacion = (SELECT IdHabitacion FROM Reservacion WHERE IdReservacion = @IdReservacion);
END;
GO

--REGISTRAR UN CLIENTE
CREATE PROCEDURE sp_RegistrarCliente
    @IdentificacionCliente INT, 
    @Nombre VARCHAR(50), 
    @PApellido VARCHAR(50), 
    @SApellido VARCHAR(50), 
    @FNacimiento DATE, 
    @TipoId INT, 
    @IdPaisResidencia INT, 
    @Correo VARCHAR(100)
AS
BEGIN
    INSERT INTO Cliente (IdentificacionCliente, Nombre, PApellido, SApellido, FNacimiento, TipoId, IdPaisResidencia, Correo)
    VALUES (@IdentificacionCliente, @Nombre, @PApellido, @SApellido, @FNacimiento, @TipoId, @IdPaisResidencia, @Correo);
END;
GO

--CREAR UNA RESERVACION 
CREATE PROCEDURE sp_CrearReserva
    @IdCliente INT,
    @IdHabitacion INT,
    @FechaInicio DATETIME,
    @FechaFin DATETIME,
    @Personas INT
AS
BEGIN
    INSERT INTO Reservacion (IdCliente, IdHabitacion, FechaHoraIngreso, FechaSalida, CantidadPersonas, Estado)
    VALUES (@IdCliente, @IdHabitacion, @FechaInicio, @FechaFin, @Personas, 'ACTIVO');
    UPDATE Habitacion SET IdEstado = 2 WHERE IdHabitacion = @IdHabitacion;
END;
GO

--BUSCAR HABITACION POR TIPO
CREATE PROCEDURE sp_BuscarHabitacionesPorTipo
    @TipoCatalogo VARCHAR(100) = NULL,
    @PrecioMin DECIMAL(10,2) = NULL,
    @PrecioMax DECIMAL(10,2) = NULL,
    @IdHospedaje INT = NULL
AS
BEGIN
    SELECT 
        vthc.NombreHabitacion,
        vthc.TipoCatalogo,
        vthc.DescripcionHabitacion,
        vthc.Precio,
        vthc.NombreHospedaje,
        vthc.TipoCama,
        vthc.Comodidades,
        (SELECT COUNT(*) FROM Habitacion h 
         WHERE h.IdTipo = vthc.IdTipo AND h.IdEstado = 1) AS HabitacionesDisponibles
    FROM VistaTiposHabitacionCompleta vthc
    WHERE (@TipoCatalogo IS NULL OR vthc.TipoCatalogo = @TipoCatalogo)
      AND (@PrecioMin IS NULL OR vthc.Precio >= @PrecioMin)
      AND (@PrecioMax IS NULL OR vthc.Precio <= @PrecioMax)
      AND (@IdHospedaje IS NULL OR 
           vthc.NombreHospedaje IN (SELECT Nombre FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje))
    ORDER BY vthc.Precio, vthc.NombreHospedaje;
END;
GO

--ASIGNAR COMODIDADES A UNA HABITACION
CREATE PROCEDURE sp_AsignarComodidadesTipoHabitacion
    @IdTipoHabitacion INT,
    @ComodidadesList VARCHAR(MAX) 
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DELETE FROM TipoHabitacionComodidad 
        WHERE IdTipoHabitacion = @IdTipoHabitacion;
        
        INSERT INTO TipoHabitacionComodidad (IdTipoHabitacion, IdComodidad)
        SELECT @IdTipoHabitacion, c.IdComodidades
        FROM Comodidades c
        WHERE c.ListaComodidades IN (
            SELECT LTRIM(RTRIM(value)) 
            FROM STRING_SPLIT(@ComodidadesList, ',')
        );
        
        PRINT @ComodidadesList;
        
        COMMIT TRANSACTION;
        
        SELECT 
            1 AS Exito, 
            @IdTipoHabitacion AS IdTipoHabitacion,
            @@ROWCOUNT AS CantidadComodidadesAsignadas;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error: ' + ERROR_MESSAGE();
        SELECT 
            0 AS Exito, 
            ERROR_MESSAGE() AS Mensaje,
            @IdTipoHabitacion AS IdTipoHabitacion,
            0 AS CantidadComodidadesAsignadas;
    END CATCH
END;
GO

--OBTENER LAS COMODIDADES DE UNA HABITACION
CREATE PROCEDURE sp_ObtenerComodidadesPorTipoHabitacion
    @IdTipoHabitacion INT
AS
BEGIN
    SELECT 
        c.IdComodidades,
        c.ListaComodidades AS Comodidad
    FROM TipoHabitacionComodidad thc
    INNER JOIN Comodidades c ON thc.IdComodidad = c.IdComodidades
    WHERE thc.IdTipoHabitacion = @IdTipoHabitacion
    ORDER BY c.ListaComodidades;
END;
GO


--BUSCAR HABITACION
CREATE PROCEDURE dbo.BuscarHabitaciones
  @Destino NVARCHAR(100),
  @FechaIn DATE,
  @FechaFn DATE,
  @CupoPersonas INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT
    bh.*
  FROM BusquedaHabitaciones bh
  JOIN Hospedaje h ON h.CedulaJuridica = bh.CedulaJuridica
  JOIN Pais p ON p.IdPais = H.IdPais
  JOIN Provincia pr ON pr.IdProvincia = h.IdProvincia
  JOIN Canton c ON c.IdCanton = h.IdCanton
  WHERE
      bh.CupoHuespedes >= @CupoPersonas
      AND @FechaIn >= bh.FechaInicio
      AND @FechaFn <= bh.FechaFin
      AND (
           p.Nombre      LIKE '%' + @Destino + '%'
        OR pr.Nombre LIKE '%' + @Destino + '%'
        OR c.Nombre   LIKE '%' + @Destino + '%'
        OR h.Barrio    LIKE '%' + @Destino + '%'
      );
END;
GO

--REGISTRAR PAGO 
CREATE OR ALTER PROCEDURE sp_RegistrarPago
    @IdReservacion INT,
    @MetodoPago INT
AS
BEGIN
    DECLARE @Importe DECIMAL(10,2);
    
    SELECT @Importe = DATEDIFF(DAY, FechaHoraIngreso, FechaSalida) * th.Precio
    FROM Reservacion r
    JOIN Habitacion h ON r.IdHabitacion = h.IdHabitacion
    JOIN TipoHabitacion th ON h.IdTipo = th.IdTipo
    WHERE r.IdReservacion = @IdReservacion;
    
    INSERT INTO Factura (NumeroReserva, ImporteTotal, MetodoPago, Estado)
    VALUES (@IdReservacion, @Importe, @MetodoPago, 'PAGADO');
END;
GO

--SUBIR HOSPEDAJE
CREATE OR ALTER PROCEDURE sp_RegistrarHotel
    @CedulaJuridica INT,
    @Nombre VARCHAR(50),
    @Tipo INT,
    @IdProvincia INT,
    @IdCanton INT,
    @Direccion VARCHAR(250),
    @Correo VARCHAR(100)
AS
BEGIN
    INSERT INTO Hospedaje (CedulaJuridica, Nombre, Tipo, IdProvincia, IdCanton, Direccion, Correo)
    VALUES (@CedulaJuridica, @Nombre, @Tipo, @IdProvincia, @IdCanton, @Direccion, @Correo);
END;
GO


--REPORTE EDAD DE CLIENTE
CREATE OR ALTER PROCEDURE sp_ReporteEdadesClientes
AS
BEGIN
    SELECT 
        CASE 
            WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) < 18 THEN 'Menor 18'
            WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) <= 30 THEN '18-30'
            WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) <= 50 THEN '31-50'
            ELSE 'Mayor 50'
        END AS RangoEdad,
        COUNT(*) AS Cantidad
    FROM Cliente c
    JOIN Reservacion r ON c.IdentificacionCliente = r.IdCliente
    GROUP BY CASE 
        WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) < 18 THEN 'Menor 18'
        WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) <= 30 THEN '18-30'
        WHEN DATEDIFF(YEAR, FNacimiento, GETDATE()) <= 50 THEN '31-50'
        ELSE 'Mayor 50'
    END;
END;
GO

--REPORTE POR DEMANDA 
CREATE OR ALTER PROCEDURE sp_ReporteHotelesDemanda
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
    SELECT 
        h.Nombre AS Hotel,
        p.Nombre AS Provincia,
        COUNT(r.IdReservacion) AS Reservas
    FROM Hospedaje h
    JOIN Provincia p ON h.IdProvincia = p.IdProvincia
    JOIN TipoHabitacion th ON h.CedulaJuridica = th.IdHospedaje
    JOIN Habitacion ha ON th.IdTipo = ha.IdTipo
    JOIN Reservacion r ON ha.IdHabitacion = r.IdHabitacion
    WHERE r.FechaHoraIngreso BETWEEN @FechaInicio AND @FechaFin
    GROUP BY h.Nombre, p.Nombre
    ORDER BY Reservas DESC;
END;
GO

--BUSCAR ACTIVIDADES
CREATE PROCEDURE sp_BuscarActividades
    @TipoActividad INT = NULL,
    @PrecioMax DECIMAL(10,2) = NULL
AS
BEGIN
    SELECT 
        ar.Nombre,
        ar.Descripcion,
        ar.Precio,
        ta.Tipo AS TipoActividad
    FROM ActividadRecreacion ar
    JOIN ActividadRecreacionTipo art ON ar.CedulaJuridica = art.IdActividadRecreacion
    JOIN TipoActividad ta ON art.IdTipoActividad = ta.IdTipoActividad
    WHERE (@TipoActividad IS NULL OR art.IdTipoActividad = @TipoActividad)
        AND (@PrecioMax IS NULL OR ar.Precio <= @PrecioMax);
END;
GO

--ASIGNAR COMODIDADES
CREATE PROCEDURE sp_AsignarComodidades
    @IdTipoHabitacion INT,
    @Comodidades VARCHAR(MAX)
AS
BEGIN
    DELETE FROM TipoHabitacionComodidad WHERE IdTipoHabitacion = @IdTipoHabitacion;
    
    INSERT INTO TipoHabitacionComodidad (IdTipoHabitacion, IdComodidad)
    SELECT @IdTipoHabitacion, IdComodidades
    FROM Comodidades
    WHERE ListaComodidades IN (SELECT value FROM STRING_SPLIT(@Comodidades, ','));
END;
GO

--REGISTRAR ACTIVIDAD
CREATE PROCEDURE sp_RegistrarActividad
    @CedulaJuridica INT,
    @Nombre VARCHAR(50),
    @Descripcion VARCHAR(250),
    @Precio DECIMAL(10,2)
AS
BEGIN
    INSERT INTO ActividadRecreacion (CedulaJuridica, Nombre, Descripcion, Precio)
    VALUES (@CedulaJuridica, @Nombre, @Descripcion, @Precio);
END;
GO
