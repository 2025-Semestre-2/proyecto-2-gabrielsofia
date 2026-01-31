USE SistemaHoteles;
INSERT INTO Habitacion (NumeroHabitacion,CupoHuespedes,CantCamas,CantBaños,IdTipo,IdEstado)
VALUES (237,2,2,1,5,1)

INSERT INTO TipoHabitacion (Nombre,Descripcion,Precio,IdTipoCama,IdHospedaje)
VALUES ('Embrujada','Pasan cosas raras',23,1,1)

INSERT INTO Hospedaje (CedulaJuridica,Nombre,Tipo,IdPais,IdProvincia,IdCanton,Barrio,Direccion,GPS,Correo)
VALUES (1,'Hotel Cecil',1,1,1,1,'El InfiernoIllo','No se','No le voy a decir','Sapo')

INSERT INTO TipoHospedaje(Nombre)
VALUES ('Embrujado')

INSERT INTO Pais(CodigoTelefono,Nombre)
VALUES ('+506','Costa Rica')

INSERT INTO Provincia(IdPais,Nombre)
VALUES (1,'Alajuela')

INSERT INTO TipoCama(Tipos)
VALUES ('Ensangrentada')

INSERT INTO Canton(IdProvincia,Nombre)
VALUES (1,'La Guacima')

INSERT INTO EstadoHabitacion(NombreEstado)
VALUES ('Cerrado')

INSERT INTO TipoHabitacionFoto(IdTipoHabitacion,URLFoto)
VALUES (5,'FotoHotel')
SELECT * FROM BusquedaHabitaciones;