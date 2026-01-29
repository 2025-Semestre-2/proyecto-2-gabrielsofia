CREATE DATABASE SistemaHoteles;
USE SistemaHoteles;

CREATE TABLE THospedaje
(
	IdTipoCatalogo INT IDENTITY(1,1)PRIMARY KEY,
	Nombre Varchar(50) UNIQUE NOT NULL
);

CREATE TABLE RedesSociales
(
	IdRedSocial INT PRIMARY KEY IDENTITY(1,1),
	Red Varchar(50) NOT NULL UNIQUE,
	URLRed Varchar(100)
);

CREATE TABLE Servicios
(
	IdServicio INT PRIMARY KEY IDENTITY(1,1),
	Servicios Varchar(50) NOT NULL UNIQUE
);

CREATE TABLE TipoCama
(
	IdTipoCama INT PRIMARY KEY IDENTITY(1,1),
	Tipos varchar(100) NOT NULL UNIQUE
);

CREATE TABLE TipoIdentificacion
(
	IdTipoIdentificacion INT PRIMARY KEY IDENTITY(1,1),
	Tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE MetodoPago
(
	IdMetodo INT PRIMARY KEY IDENTITY(1,1),
	Metodos Varchar(50) NOT NULL UNIQUE
);

CREATE TABLE TipoActividad
(
	IdTipoActividad INT PRIMARY KEY IDENTITY(1,1),
	Tipo Varchar(50) NOT NULL UNIQUE,
	Descripcion VARCHAR(150)
);

CREATE TABLE Comodidades
(
	IdComodidades INT PRIMARY KEY IDENTITY(1,1),
	ListaComodidades Varchar(50) NOT NULL UNIQUE
);

CREATE TABLE Pais
(
	IdPais INT IDENTITY (1,1) PRIMARY KEY,
	Nombre VARCHAR(100)NOT NULL UNIQUE,
	CodigoTelefono VARCHAR(5)
);

CREATE TABLE Provincia 
(
    IdProvincia INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    IdPais INT NOT NULL FOREIGN KEY REFERENCES 
	    Pais(IdPais)
);

CREATE TABLE Canton 
(
    IdCanton INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    IdProvincia INT NOT NULL FOREIGN KEY REFERENCES 
	    Provincia(IdProvincia)
);

CREATE TABLE EstadoHabitacion (
	IdEstado INT IDENTITY(1,1) PRIMARY KEY,
	NombreEstado VARCHAR(15)NOT NULL UNIQUE
);

CREATE TABLE Hospedaje
(
	CedulaJuridica INT NOT NULL PRIMARY KEY,
	Nombre varchar(50) NOT NULL,
	Tipo INT NOT NULL FOREIGN KEY REFERENCES 
		THospedaje(IdTipoCatalogo),
	IdPais INT NOT NULL FOREIGN KEY REFERENCES
	    Pais(IdPais),
	IdProvincia INT FOREIGN KEY REFERENCES
	    Provincia(IdProvincia),
	IdCanton INT FOREIGN KEY REFERENCES
	    Canton(IdCanton),
	Barrio varchar(250) NOT NULL,
	Direccion varchar(250) NOT NULL,
	GPS varchar(100),
	Correo varchar(100) NOT NULL UNIQUE,
	URL varchar(100)
);

CREATE TABLE Cliente
(
	IdentificacionCliente INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	PApellido VARCHAR(50) NOT NULL,
	SApellido VARCHAR(50) NOT NULL,
	FNacimiento DATE NOT NULL,
	TipoId INT NOT NULL FOREIGN KEY REFERENCES
		TipoIdentificacion(IdTipoIdentificacion),
	IdPaisResidencia INT NOT NULL FOREIGN KEY REFERENCES
	    Pais(IdPais),
	IdProvincia INT FOREIGN KEY REFERENCES
	    Provincia(IdProvincia),
	IdCanton INT FOREIGN KEY REFERENCES
	    Canton(IdCanton),
	Direccion VARCHAR(250) NOT NULL,
	Correo VARCHAR(100) NOT NULL UNIQUE
	CONSTRAINT CK_IdentifiacionValida CHECK (IdentificacionCliente BETWEEN 100000000 AND 999999999)
);

CREATE TABLE TipoHabitacion
(
	IdTipo INT PRIMARY KEY IDENTITY (1,1),
	Nombre Varchar(50) NOT NULL,
	Descripcion Varchar(200),
	Precio DECIMAL(10,2) NOT NULL CHECK (Precio>0),
	IdTipoCama INT NOT NULL FOREIGN KEY REFERENCES
		TipoCama(IdTipoCama),
	IdHospedaje INT NOT NULL FOREIGN KEY REFERENCES
		Hospedaje(CedulaJuridica),
	CONSTRAINT CK_PrecioNegativo CHECK (Precio>0)
);

CREATE TABLE TipoHabitacionComodidad (
    IdTipoHabitacion INT NOT NULL,
    IdComodidad INT NOT NULL,
    PRIMARY KEY (IdTipoHabitacion, IdComodidad),
    FOREIGN KEY (IdTipoHabitacion) REFERENCES
	    TipoHabitacion(IdTipo),
    FOREIGN KEY (IdComodidad) REFERENCES 
	    Comodidades(IdComodidades)
);

CREATE TABLE TipoHabitacionFoto
(
	IdFoto INT IDENTITY(1,1) PRIMARY KEY,
	IdTipoHabitacion INT NOT NULL,
	URLFoto Varchar(150) NOT NULL,
	FOREIGN KEY(IdTipoHabitacion) REFERENCES 
	    TipoHabitacion(IdTipo)
);

CREATE TABLE HospedajeServicio
(
    IdHospedaje INT NOT NULL,
    IdServicio INT NOT NULL,
    PRIMARY KEY (IdHospedaje, IdServicio),
    FOREIGN KEY (IdHospedaje) REFERENCES 
	    Hospedaje(CedulaJuridica),
    FOREIGN KEY (IdServicio) REFERENCES 
	    Servicios(IdServicio)
);

CREATE TABLE HospedajeRedSocial 
(
    IdHospedaje INT NOT NULL,
    IdRedSocial INT NOT NULL UNIQUE,
    UsuarioURL VARCHAR(255) NOT NULL,
    PRIMARY KEY (IdHospedaje, IdRedSocial),
    FOREIGN KEY (IdHospedaje) REFERENCES 
	    Hospedaje(CedulaJuridica),
    FOREIGN KEY (IdRedSocial) REFERENCES 
	    RedesSociales(IdRedSocial)
);

CREATE TABLE HospedajeTelefono 
(
    IdTelefono INT IDENTITY(1,1) PRIMARY KEY,
    IdHospedaje INT NOT NULL,
    CodigoPais VARCHAR(5) NOT NULL DEFAULT '+506',
    Numero VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (IdHospedaje) REFERENCES 
	    Hospedaje(CedulaJuridica)
);

CREATE TABLE Habitacion
(
	IdHabitacion INT IDENTITY(1,1) PRIMARY KEY,
	NumeroHabitacion VARCHAR(10) NOT NULL,
	IdTipo INT FOREIGN KEY REFERENCES
		TipoHabitacion(IdTipo),
	IdEstado INT NOT NULL FOREIGN KEY REFERENCES 
	    EstadoHabitacion(IdEstado),
	IdTipoHabitacion INT FOREIGN KEY REFERENCES
		TipoHabitacion(IdTipo)
);

CREATE TABLE ClienteTelefono 
(
    IdTelefonoCliente INT IDENTITY(1,1) PRIMARY KEY,
    IdCliente INT NOT NULL FOREIGN KEY REFERENCES 
	    Cliente(IdentificacionCliente),
    CodigoPais VARCHAR(5) NOT NULL,
    Numero VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE Reservacion
(
	IdReservacion INT IDENTITY (1,1) PRIMARY KEY,
	Estado VARCHAR(50) NOT NULL,
	NumReservacion INT NOT NULL,
	IdCliente INT NOT NULL FOREIGN KEY REFERENCES
		Cliente(IdentificacionCliente),
	IdHabitacion INT NOT NULL FOREIGN KEY REFERENCES
		Habitacion(IdHabitacion),
	FechaHoraIngreso DATETIME NOT NULL,
	CantidadPersonas INT NOT NULL CHECK (CantidadPersonas>0),
	Vehiculo BIT NOT NULL DEFAULT 0,
	FechaSalida DATETIME NOT NULL,
	CONSTRAINT CK_Reservacion_Fechas CHECK (FechaSalida > FechaHoraIngreso)
);

CREATE TABLE Factura
(	
	IdFactura INT IDENTITY(1,1) PRIMARY KEY,
	Estado VARCHAR(50) NOT NULL,
	NumFactura VARCHAR(15) UNIQUE NOT NULL,
	FechaHora DATETIME NOT NULL DEFAULT GETDATE(),
	NumeroReserva INT FOREIGN KEY REFERENCES
		Reservacion(IdReservacion),
	CargoHabitacion INT,
	NumNoches INT NOT NULL,
	ImporteTotal DECIMAL(10,2) NOT NULL,
	MetodoPago INT NOT NULL FOREIGN KEY REFERENCES
		MetodoPago(IdMetodo)
);

CREATE TABLE ActividadRecreacion
(
	CedulaJuridica INT PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	Correo VARCHAR(100) NOT NULL UNIQUE,
	NombreContacto Varchar(50) NOT NULL, 
	IdPais INT NOT NULL FOREIGN KEY REFERENCES
	    Pais(IdPais),
	IdProvincia INT FOREIGN KEY REFERENCES
	    Provincia(IdProvincia),
	IdCanton INT FOREIGN KEY REFERENCES
	    Canton(IdCanton),
	Barrio varchar(250) NOT NULL,
	Direccion VARCHAR(250) NOT NULL,
	Descripcion VARCHAR(250),
	Precio DECIMAL(10,2) NOT NULL,
	CONSTRAINT CK_PrecioNegativo CHECK (Precio>0)
);

CREATE TABLE ActividadTelefono 
(
    IdTelefono INT IDENTITY(1,1) PRIMARY KEY,
    IdActividadRecreacion INT NOT NULL,
    CodigoPais VARCHAR(5) NOT NULL DEFAULT '+506',
    Numero VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (IdActividadRecreacion) REFERENCES 
	    ActividadRecreacion(CedulaJuridica)
);

CREATE TABLE ActividadRecreacionTipo 
(
    IdActividadRecreacion INT NOT NULL,
    IdTipoActividad INT NOT NULL,
    Precio DECIMAL(10,2),
    PRIMARY KEY (IdActividadRecreacion, IdTipoActividad),
    FOREIGN KEY (IdActividadRecreacion) REFERENCES 
	    ActividadRecreacion(CedulaJuridica),
    FOREIGN KEY (IdTipoActividad) REFERENCES 
	    TipoActividad(IdTipoActividad)
);

CREATE Table Usuarios
(
    UsuarioID INT Identity(1,1) Primary Key,
    NombreUsuario Varchar(100) Unique Not Null,
    TipoUsuario Varchar(50) Not Null
);

CREATE ROLE Administrador;
CREATE ROLE Usuario;

GO
GO
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

CREATE OR ALTER TRIGGER Factura_NoEliminar
ON Factura
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('No se permite eliminar facturas.', 16, 1);
    ROLLBACK TRANSACTION;
END;

GO
CREATE OR ALTER TRIGGER Reservacion_NoEliminar
ON Reservacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('No se permite eliminar reservaciones.', 16, 1);
    ROLLBACK TRANSACTION;
END;
GO

GO
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
        RAISERROR('No se permite eliminar un cliente asociado a una reservación.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    DELETE c
    FROM Cliente c
    JOIN deleted d
      ON d.IdentificacionCliente = c.IdentificacionCliente;
END;
GO


