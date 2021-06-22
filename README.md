# GestionDeReservas - Consignas Generales
```python
- Link https://reservatulugar.herokuapp.com/

La Web Application 'Reserva tu Lugar' consiste basicamente en que un empleado de la compañia
pueda reservar un lugar dentro de la oficina el dia en que pueda asistir. Esto se debe a que la cantidad del personal sobrepasa los limites requeridos tanto por protocolos COVID-19 o tambien por el espacio del lugar que tal vez no sea lo suficientemente amplio para concentrar cierta cantidad de personas durante cada dia.

2. Funcionalidades (Endpoints) - mejorar
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
```

## Installation
Usar cualquier editor de texto (Visula Study Code) y ejecutar los siguientes comandos:

- crear una carpeta donde almacenaras el proyecto
- Clonar el repo en la carpeta creada
```bash
git clone https://github.com/jhoncar7/GestionDeReservas.git
```
- Una vez clonado el proyecto ubicarte dentro del proyecto ejecutar el comando para instalar todas las dependencias
```bash
npm install
```
- Una vez que hayas realizado los pasos anteriores, para poner en ejecucion la aplicacion ejecuta
```bash
npm start
```
## APIS
```python
1. /api/v1/users
- GET -> get all users

2. /api/v1/user
- GET : id -----> required
- PUT : id -----> required
- DELETE : id --> required
- POST : email, contrasena, area, perfil ---> all required

3. /api/v1/areas
- GET -> get all areas.

4. /api/v1/area
- GET : id ----> required. Get user by id.
- PUT : id ----> required. Update user by id.
- DELETE: id --> required. Remove user by id.
- POST : area -> required. Create new user.

5. /api/v1/profiles
- GET --> Get all profiles.

6. /api/v1/reservations
- GET --> Get all reservations.

7. /api/v1/reservation
- GET : id -----> required. Get reservation by id.
- POST ---------> Create new reservation.
- PUT : id -----> required. Update reservation by id.
- DELETE : id --> required. Remove reservation by id.
```

## Datos Adicionales
```python
1. Se podran realizar reservas para la semana en curso.
2. Solo se podran realizar un maximo de 3 reservas por empleado.
3. Cada Empleado pertenece a un area.
4. Cada Area tiene un maximo de puestos a ocupar.
5. No se podra exceder la cantidad de reservas por area.
6. No exceder la cantidad de reservas totales (el total se calcula con la suma de puestos de cada area)
7. Ademas tendra la opcion de poder reservar una cochera si posee un vehiculo -> feature.
```


