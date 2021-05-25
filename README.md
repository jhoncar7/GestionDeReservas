# GestionDeReservas

# Reserva tu Lugar
# Link https://reservatulugar.herokuapp.com/

# OBJETIVO

Desarrollar una aplicacion que permita administrar la cantidad de reservas por semana de cada empleado de la compañia y por area,
la misma no debera superar la cantidad de puestos provistos a ocupar, el total de puestos se debera calcular con la suma de asientos
disponibles por area (IT, FInanzas, RRHH, entre otros...)

# ENUNCIADO

La Web Application 'Reserva tu Lugar' consiste basicamente en que un empleado de la compañia
pueda reservar un lugar dentro de la oficina el dia en que pueda asistir.

1. Se podran realizar reservas para la semana en curso.
2. Solo se podran realizar un maximo de 3 reservas por empleado.
3. Cada Empleado pertenece a un area.
4. Cada Area tiene un maximo de puestos a ocupar.
5. No se podra exceder la cantidad de reservas por area.
6. No exceder la cantidad de reservas totales (el total se calcula con la suma de puestos de cada area)
7. Ademas tendra la opcion de poder reservar una cochera si posee un vehiculo -> feature.

Endpoints
- Crear Empleado (post)
- Consultar Empleado (get)
- Eliminar Empleado (delete)
- Modificar Empleado (put / patch)
- Crear area (post)
- Consultar disponibilidad del area (get)
- Eliminar area (delete)
- Modificar el maximo del area (put / patch)
- Reservar lugar de empleado (post) -> validar tope de 3.
- Eliminar lugar de empleado (delete)

Dudas
Como enviamos la pass y el id del empleado? Viene en el token de autenticacion o por el body ?

# APIS

1. /api/v1/users
- GET -> obtener todos los usuarios


2. /api/v1/user
- GET : id -----> required   ---> hay un bug, cuando no existe el id rompe todo
- PUT : id -----> required   ---> hay un bug, cuando no existe el id rompe todo, funciona como post tambien OJO
- DELETE : id --> required   ---> hay un bug, cuando no existe el id rompe todo

3. /api/v1/areas
- GET -> obtener todos las areas

4. /api/v1/area
- GET : id ----> required   --->  hay un bug, cuando no existe el id rompe todo
- PUT : id ----> required   --->  hay un bug, cuando no existe el id rompe todo, funciona como post tambien OJO
- DELETE: id --> required   --->  hay un bug, cuando no existe el id rompe todo