# Taxi 24 API

Taxi 24 API consiste en un conjunto de endpoints que permite a cualquier consumidor gestionar su flota de pasajeros.

## Requisitos previos

- Node.js (versión 18.6.0)
- MongoDB (versión 6)
- Docker compose (Opcional para ejecutar las pruebas de integración)

## Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/diangogav/taxi24-code-challenge.git
```

---

2. Instala las dependencias:

```bash
cd taxi24-code-challenge
npm install
```

---

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias, como la URL de conexión a la base de datos MongoDB, puertos, claves de API, etc. Tomar el archivo .env.example como referencia.

---

3. Seeds

Teniendo la base de datos iniciada.
Puedes poblar la base de datos con datos iniciales usando el comando:
```npm run seeds```

Esto creará un conjunto de datos de `drivers` y `passenger` en sus respectivas colecciones.

---

4. Iniciar la aplicación:

```bash
npm start
```

La aplicación estará disponible en http://localhost:3000 (o el puerto especificado en las variables de entorno).

---

5. Pruebas automáticas

Todas las pruebas automáticas.
```npm run tests```

Pruebas unitarias.
```npm run test:unit```

Pruebas de integración.

Para ejecutar las pruebas de integración es necesario tener docker compose para iniciar la base de datos
```npm run test:integration```

---

### Docker

Alternativamente se puede usar `docker compose` para ejecutar la base de datos de la aplicación.

También se puede usar el Dockerfile para realizar una imagen de docker de la aplicaciónn y ejecutarla.

```docker build -t <image-name>```

```docker run -p <local-port>:<docker-port> <docker container name>```

## Estructura del Proyecto

La estructura del proyecto sigue los principios de la Arquitectura Hexagonal para promover la escalabilidad y la realización de pruebas automáticas (unitarias, integración y e2e). Además de tener las ventajas de separar la lógica de negocio de la infraestructura y facilitar la reutilización de componentes. A continuación se muestra la estructura de directorios del proyecto:

```
├── src
│   ├── app.ts
│   ├── config
│   ├── modules
│   │   ├── bill
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   └── infrastructure
│   │   ├── driver
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   └── infrastructure
│   │   ├── passenger
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   └── infrastructure
│   │   ├── shared
│   │   │   ├── criteria
│   │   │   ├── database
│   │   │   ├── errors
│   │   │   ├── event-bus
│   │   │   ├── location
│   │   │   └── value-objects
│   │   └── trip
│   │       ├── application
│   │       ├── domain
│   │       └── infrastructure
│   └── server
│       └── routes
└── tests
    ├── docker-compose.yaml
    ├── globalSetup.ts
    ├── globalTeardown.ts
    ├── integration
    │   └── trip
    └── unit
        ├── location
        └── trip
```

## Endpoints
### Obtener información del conductor

```GET /drivers/{driverId}```

Endpoint para obtener información detallada de un conductor específico.

#### Path Params:

`driverId` (string, requerido): ID del conductor.

#### Respuesta exitosa:
Código de estado: 200 (OK)

Ejemplo de respuesta exitosa:

```json
{
	"id": "5bdb2b99-8040-41bd-84bd-a01037b70753",
	"name": "Ning Bailey",
	"isAvailable": false,
	"location": {
		"longitude": -43.749,
		"latitude": -68.817
	}
}
```
---
### Obtener conductores

```GET /drivers```

Endpoint para obtener una lista de todos los conductores

#### Respuesta exitosa
Código de estado: 200 (OK)

```json
[
	{
		"id": "e222297f-d6ce-4ab0-987a-943c4280e88d",
		"name": "Lalita Ólafsson",
		"isAvailable": true,
		"location": {
			"longitude": 90,
			"latitude": 85
		}
	},
	{
		"id": "0c373af4-4980-4a7f-b8ea-a86c625dd307",
		"name": "Vladimir Sigurðardóttir",
		"isAvailable": false,
		"location": {
			"longitude": 125.262,
			"latitude": 52.069
	    }
    }
]
```

---

### Obtener conductores disponibles

```GET /drivers/availables```

Endpoint para obtener una lista de conductores disponibles en función de la ubicación proporcionada.

#### Query Params
`latitude` (number, requerido): Latitud de la ubicación actual.

`longitude` (number, requerido): Longitud de la ubicación actual.

#### Respuesta exitosa
Código de estado: 200 (OK)

```json
[
	{
		"id": "e222297f-d6ce-4ab0-987a-943c4280e88d",
		"name": "Lalita Ólafsson",
		"isAvailable": true,
		"location": {
			"longitude": 90,
			"latitude": 85
		}
	},
	{
		"id": "0c373af4-4980-4a7f-b8ea-a86c625dd307",
		"name": "Vladimir Sigurðardóttir",
		"isAvailable": true,
		"location": {
			"longitude": 125.262,
			"latitude": 52.069
	    }
    }
]
```
---

### Obtener pasajeros
```GET /passengers```

Endpoint para obtener una lista de pasajeros.

#### Respuesta exitosa:

Código de estado: 200 (OK)

```json
[
	{
		"id": "86bf0eaa-1696-488a-850a-c7e5282b9c23",
		"name": "Somkiat Böttcher"
	},
	{
		"id": "8136f1e8-a122-4e9a-aac6-ed8311348534",
		"name": "Miykhael Novák"
	},
]
```
----

### Obtener información de un pasajero
```GET /passengers/{passengerId}```

Endpoint para buscar un pasajero específico por su ID.

#### Path Params:

`passengerId` (string, requerido): ID del pasajero.

#### Respuesta exitosa:

Código de estado: 200 (OK)

```json
{
	"id": "86bf0eaa-1696-488a-850a-c7e5282b9c23",
	"name": "Somkiat Böttcher"
}
```

---

### Obtener conductores disponibles para un pasajero
```GET /passengers/{passengerId}/drivers```

Endpoint para obtener una lista de máximo 3 conductores disponibles para un pasajero en función de la ubicación proporcionada.

#### Path Params:

`passengerId` (string, requerido): ID del pasajero.

#### Query Params:

`latitude` (number, requerido): Latitud de la ubicación actual del pasajero.

`longitude` (number, requerido): Longitud de la ubicación actual del pasajero.

#### Respuesta exitosa:

Código de estado: 200 (OK)

```json
[
	{
		"id": "2edefb8c-8903-4cd8-87d5-cd4e9489d190",
		"name": "John Óskarsson",
		"_isAvailable": true,
		"_location": {
			"longitude": -74.006,
			"latitude": 40.7128
		}
	},
	{
		"id": "104e33e3-eb9c-469b-bcd9-d95572e2a75a",
		"name": "Hideo Mohammed",
		"_isAvailable": true,
		"_location": {
			"longitude": -74.007,
			"latitude": 40.7125
		}
	},
	{
		"id": "9f769012-a565-4969-8861-90dcc037e21f",
		"name": "Kiran Pétursdóttir",
		"isAvailable": true,
		"location": {
			"longitude": -74.0055,
			"latitude": 40.711
		}
	}
]
```

---

### Crear viaje
```POST /trips```

Endpoint para crear un nuevo viaje.

```Body```

Ejemplo de solicitud:

```json
{
	"driverId": "e222297f-d6ce-4ab0-987a-943c4280e88d",
	"passengerId": "86bf0eaa-1696-488a-850a-c7e5282b9c23",
	"longitude": 45,
	"latitude": 45
}
```
#### Respuesta exitosa:
Código de estado: 200 (OK)

Cuerpo de respuesta: Respuesta vacía (objeto vacío {}).

---

#### Completar viaje
```POST /trips/{tripId}/complete```

Endpoint para marcar un viaje como completado.

#### Path Params:

`tripId` (string, requerido): ID del viaje.

#### Body

Coordenadas de la ubicación de finalización del viaje en formato JSON.
Ejemplo de solicitud:

```json
{
  "latitude": 37.3352,
  "longitude": -121.8811
}
```
#### Respuesta exitosa:

Código de estado: 200 (OK)
Cuerpo de respuesta: Respuesta vacía (objeto vacío {}).

---

### Obtener viajes

```GET /trips```

Endpoint para obtener una lista de viajes.

#### Query Params:

`status` (string): Estado del viaje para filtrar la lista de viajes (opciones: "pending", "completed", "cancelled").

#### Respuesta exitosa:

Código de estado: 200 (OK)

```json
[
  {
    "id": "trip1",
    "passengerId": "12345",
    "driverId": "67890",
    "status": "completed"
  },
  {
    "id": "trip2",
    "passengerId": "54321",
    "driverId": "09876",
    "status": "pending"
  }
]
```