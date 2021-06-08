# GestionDeReservas - Consignas Generales

# Reserva tu Lugar
- Link https://reservatulugar.herokuapp.com/

1. Descripcion:
- La Web Application 'Reserva tu Lugar' consiste basicamente en que un empleado de la compañia
pueda reservar un lugar dentro de la oficina el dia en que pueda asistir. Esto se debe a que la cantidad del personal sobrepasa los limites requeridos tanto por protocolos COVID-19 o tambien por el espacio del lugar que tal vez no sea lo suficientemente amplio para concentrar cierta cantidad de personas durante cada dia.

2. Funcionalidades (Endpoints)
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

3. Listado de Actores / Roles
- Usuario Administrador
- Usuario Final

4. Listado de Entidades Principales:
- Areas
- Perfiles
- Reservas
- Users

5. Instrucciones Tecnicas:
5. 1.  Entorno de Desarrollo:
- Realizar en el CMD un "git clone https://github.com/jhoncar7/GestionDeReservas.git"
- Una vez clonado ejecutar el comando "npm install" para instalar todas las dependencias

5. 2. Ejecucion
- ejecutar dentro de la carpeta del proyecto una vez ejecutado los pasos anteriores y escribir el siguiente comando "npm start" para sus respectiva ejecucion.

# APIS

1. /api/v1/users
- GET -> obtener todos los usuarios


2. /api/v1/user
- GET : id -----> required   ---> hay un bug, cuando no existe el id rompe todo
- PUT : id -----> required   ---> hay un bug, cuando no existe el id rompe todo, funciona como post tambien OJO
- DELETE : id --> required   ---> hay un bug, cuando no existe el id rompe todo
- POST : email, contrasena, area, perfil ---> todos requeridos

3. /api/v1/areas
- GET -> obtener todos las areas

4. /api/v1/area
- GET : id ----> required   --->  hay un bug, cuando no existe el id rompe todo
- PUT : id ----> required   --->  hay un bug, cuando no existe el id rompe todo, funciona como post tambien OJO
- DELETE: id --> required   --->  hay un bug, cuando no existe el id rompe todo
- POST : area --> requerid ---> nombre del campo requerido es: area


# Datos Adicionales
1. Se podran realizar reservas para la semana en curso.
2. Solo se podran realizar un maximo de 3 reservas por empleado.
3. Cada Empleado pertenece a un area.
4. Cada Area tiene un maximo de puestos a ocupar.
5. No se podra exceder la cantidad de reservas por area.
6. No exceder la cantidad de reservas totales (el total se calcula con la suma de puestos de cada area)
7. Ademas tendra la opcion de poder reservar una cochera si posee un vehiculo -> feature.