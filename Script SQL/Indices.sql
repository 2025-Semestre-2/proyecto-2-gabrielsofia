CREATE INDEX IX_Hospedaje_Nombre ON Hospedaje(Nombre);  --Buscar hotel por nombre
CREATE INDEX IX_Hospedaje_Tipo ON Hospedaje(Tipo);  --Buscar por tipo de hospedaje
CREATE INDEX IX_Hospedaje_Ubicacion ON Hospedaje(IdProvincia, IdCanton, IdDistrito);  --Buscar por ubicacion 
CREATE INDEX IX_Hospedaje_CedulaJuridica ON Hospedaje(CedulaJuridica);  --Buscar por cedula juridica
CREATE INDEX IX_Reservacion_Fechas ON Reservacion(FechaHoraIngreso, FechaSalida);  --Buscar disponibilidad entre fechas
CREATE INDEX IX_Reservacion_HabitacionEstado ON Reservacion(IdHabitacion, Estado);  --Saber estado de la habitacion 
CREATE INDEX IX_Reservacion_ClienteFecha ON Reservacion(IdCliente, FechaHoraIngreso);  --Historial de reservas del cliente
CREATE INDEX IX_Reservacion_Estado ON Reservacion(Estado);  --Ver el estado de las reservas
CREATE INDEX IX_Habitacion_Estado ON Habitacion(IdEstado);  --Mostrar habitaciones segun su estado
CREATE INDEX IX_Habitacion_Tipo ON Habitacion(IdTipo);  --Mostrar Habitacion segun tipo
CREATE INDEX IX_Habitacion_TipoEstado ON Habitacion(IdTipo, IdEstado);  --Ver tipo de habitacion segun su estado
CREATE INDEX IX_TipoHabitacion_Precio ON TipoHabitacion(Precio);  --Ver habitacion por precio
CREATE INDEX IX_TipoHabitacion_PrecioHospedaje ON TipoHabitacion(Precio, IdHospedaje);  --Ver habitaciones por precio en una enpresa de hospedaje
CREATE INDEX IX_Cliente_Identificacion ON Cliente(IdentificacionCliente);  --Buscar cliente por identificacion
CREATE INDEX IX_Cliente_Correo ON Cliente(Correo);  --correo del cliente
CREATE INDEX IX_Cliente_NombreApellido ON Cliente(Nombre, PApellido); --Buscar por nombre y apellido
CREATE INDEX IX_Factura_Fecha ON Factura(FechaHora); -- reporte por fecha
CREATE INDEX IX_Factura_Estado ON Factura(Estado);  --Estados de facturas
CREATE INDEX IX_Factura_NumeroReserva ON Factura(NumeroReserva);  --factura por reserva
CREATE INDEX IX_ActividadRecreacion_Nombre ON ActividadRecreacion(Nombre); --Actividad por nombre
CREATE INDEX IX_ActividadRecreacion_Precio ON ActividadRecreacion(Precio);  --Ordena Actividad por precio
CREATE INDEX IX_ActividadRecreacion_Ubicacion ON ActividadRecreacion(IdProvincia, IdCanton);  --Actividad por ubicacion
CREATE INDEX IX_TipoHabitacionComodidad_Tipo ON TipoHabitacionComodidad(IdTipoHabitacion);  --Habitaciones con una comididad
CREATE INDEX IX_TipoHabitacionComodidad_Comodidad ON TipoHabitacionComodidad(IdComodidad);  --Comodidades de una habitacion 
CREATE INDEX IX_ActividadRecreacionTipo_Actividad ON ActividadRecreacionTipo(IdActividadRecreacion);  --Tipo de actividad
CREATE INDEX IX_ActividadRecreacionTipo_Tipo ON ActividadRecreacionTipo(IdTipoActividad);  --empresas con una actividad especifica
CREATE INDEX IX_Reservacion_Completo ON Reservacion(IdHabitacion, Estado, FechaHoraIngreso, FechaSalida);   
CREATE INDEX IX_TipoHabitacion_Completo ON TipoHabitacion(IdHospedaje, Precio, IdTipo);
CREATE INDEX IX_Factura_Reporte ON Factura(FechaHora, Estado, NumeroReserva);
CREATE INDEX IX_Hospedaje_ReporteDemanda ON Hospedaje(IdProvincia, IdCanton); --buscar por ubicacion 