# ReturnIQ — Portal Vendedor

Demo academica para INF-361 Innovacion Tecnologica.

---

## Opcion 1: Docker 

Solo necesitan tener Docker Desktop instalado.

```powershell
docker compose up --build
```

Esperar a que aparezca `Backend en http://localhost:3002` en los logs y abrir:

```
http://localhost:5173
```

Para detener:

```powershell
docker compose down
```

Para reiniciar desde cero (borra datos):

```powershell
docker compose down -v
docker compose up --build
```

## Opcion 2: Setup local

### 1. Base de datos

```powershell
createdb returniq_dev
psql -U postgres -d returniq_dev -f backend/database/schema.sql
psql -U postgres -d returniq_dev -f backend/database/seed.sql
```

### 2. Variables de entorno

Crea `backend/.env` (esta en el .gitignore, no se sube a GitHub):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=returniq_dev
DB_USER=postgres
DB_PASSWORD=tu_password_postgres
JWT_SECRET=cambia_esto_por_un_secreto_largo
PORT=3002
```

### 3. Instalar y correr

```powershell
# Terminal 1
cd backend
npm install
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

Abrir: http://localhost:5173

---

## Credenciales de demo

| Campo    | Valor                   |
|----------|-------------------------|
| Email    | vendedor@returniq.com   |
| Password | demo1234                |

---

## Flujo de la demo

1. Login con las credenciales de arriba
2. Devoluciones: lista con stats y 11 devoluciones en distintos estados
3. Detalle: click en cualquier fila, aprobar / rechazar / solicitar info
4. Timeline: tab "Seguimiento" muestra el historial de eventos
5. Catalogo: gestiona stock por talla de cada producto
6. Alertas: muestra Air Max 270 con alerta por 8 devoluciones en 30 dias

---

## Estructura del proyecto

```
returnIq/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── middleware/auth.js
│   │   ├── routes/           (auth, stores, products, returns)
│   │   ├── app.js
│   │   └── db.js
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── .env                  (no commitear, en .gitignore)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── src/
    │   ├── context/AuthContext.jsx
    │   ├── components/        (Badge, StatCard, ReturnRow, Timeline, BottomNav)
    │   ├── pages/seller/      (Login, Onboarding, Returns, ReturnDetail, Alerts, Catalog, ProductDetail)
    │   ├── styles/globals.css
    │   └── App.jsx
    └── package.json
```
