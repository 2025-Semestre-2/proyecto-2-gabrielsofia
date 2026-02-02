USE SistemaHoteles;
GO

--Script para la creacion de los usuarios de la web/base de datos, sus roles y permisos.

--Rol del administrados
CREATE ROLE Administrador;
CREATE LOGIN AdminWeb WITH PASSWORD = 'Admin123!';
CREATE USER AdminWeb FOR LOGIN AdminWeb;
ALTER ROLE Administrador ADD MEMBER AdminWeb;
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo TO Administrador;
GRANT EXECUTE ON SCHEMA::dbo TO Administrador;


--Rol del cliente.
CREATE ROLE Usuario;
CREATE LOGIN UsuarioWeb WITH PASSWORD = 'User123!';
CREATE USER UsuarioWeb FOR LOGIN UsuarioWeb;
ALTER ROLE Usuario ADD MEMBER UsuarioWeb;
GRANT SELECT ON BusquedaHabitaciones TO Usuario;
GRANT EXECUTE ON BuscarHabitaciones TO Usuario;
GRANT EXECUTE ON InsertarReserva TO Usuario;
GRANT INSERT ON Reserva TO Usuario;
