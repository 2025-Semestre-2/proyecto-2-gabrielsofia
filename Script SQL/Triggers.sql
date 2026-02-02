USE SistemaHoteles;

--Triggers de la base de datos.

GO
--Trigger para Cerrar la Reserva y Generar su correspondiente factura.
CREATE OR ALTER TRIGGER CerrarReservaGenerarFactura
ON Reservacion
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Factura
    (
        Estado,
        NumeroReserva,
        CargoHabitacion,
        NumNoches,
        ImporteTotal,
        MetodoPago
    )
    SELECT 
        'PENDIENTE',
        i.IdReservacion,
        0,
        DATEDIFF(DAY, i.FechaHoraIngreso, i.FechaSalida),
        0,
        1
    FROM inserted i
    JOIN deleted d ON d.IdReservacion = i.IdReservacion
    WHERE i.Estado = 'CERRADO'
      AND d.Estado <> 'CERRADO'
      AND NOT EXISTS (
          SELECT 1 FROM Factura f WHERE f.NumeroReserva = i.IdReservacion
      );
END;
CREATE UNIQUE INDEX FacturaReserva ON Factura(NumeroReserva);
GO

--Trigger para evitar que se pueda eliminar una factura.
CREATE OR ALTER TRIGGER Factura_NoEliminar
ON Factura
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('No se permite eliminar facturas.', 16, 1);
    ROLLBACK TRANSACTION;
END;

GO
--Trigger para evitar que se pueda eliminar una reservacion.
CREATE OR ALTER TRIGGER Reservacion_NoEliminar
ON Reservacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('No se permite eliminar reservaciones.', 16, 1);
    ROLLBACK TRANSACTION;
END;
GO

--Trigger para evitar que se pueda eliminar un cliente si tiene una reserva activa.
CREATE OR ALTER TRIGGER ClienteNoEliminarSiTieneReserva
ON Cliente
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM deleted d
        JOIN Reservacion r
          ON r.IdCliente = d.IdentificacionCliente
    )
    BEGIN
        RAISERROR('No se permite eliminar un cliente asociado a una reservaci�n.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    DELETE c
    FROM Cliente c
    JOIN deleted d
      ON d.IdentificacionCliente = c.IdentificacionCliente;
END;
GO

--ACTUALIZAR ESTADO DE HABITACION
CREATE TRIGGER trg_ActualizarEstadoHabitacion
ON Reservacion
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Habitacion
    SET IdEstado = 2 
    WHERE IdHabitacion IN (
        SELECT i.IdHabitacion 
        FROM inserted i
        WHERE i.Estado IN ('ACTIVO', 'CHECK-IN')
    );
    UPDATE Habitacion
    SET IdEstado = 1 
    WHERE IdHabitacion IN (
        SELECT i.IdHabitacion 
        FROM inserted i
        WHERE i.Estado IN ('CANCELADA', 'NO-SHOW')
    );
END;
GO

--CALCULAR IMPORTE
CREATE OR ALTER TRIGGER trg_CalcularImporteFactura
ON Factura
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE f
    SET ImporteTotal = i.NumNoches * th.Precio
    FROM Factura f
    JOIN inserted i ON f.IdFactura = i.IdFactura
    JOIN Reservacion r ON i.NumeroReserva = r.IdReservacion
    JOIN Habitacion h ON r.IdHabitacion = h.IdHabitacion
    JOIN TipoHabitacion th ON h.IdTipo = th.IdTipo
    WHERE i.ImporteTotal = 0;
END;
GO

--NO MODIFICAR FACTURAS PAGAS
CREATE OR ALTER TRIGGER trg_NoModificarFacturaPagada
ON Factura
INSTEAD OF UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1 FROM deleted d
        WHERE d.Estado = 'PAGADO'
    )
    BEGIN
        RAISERROR('No se puede modificar una factura ya pagada.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
    UPDATE f
    SET 
        Estado = i.Estado,
        MetodoPago = i.MetodoPago,
        ImporteTotal = i.ImporteTotal,
        FechaHora = GETDATE()
    FROM Factura f
    JOIN inserted i ON f.IdFactura = i.IdFactura;
END;
GO