📘Prototipo Reque (Next.js + Supabase)
🚀 Descripción

Este proyecto está construido con:

Next.js (App Router)
React
HeroUI
Supabase (Auth + DB)
TailwindCSS

🧹 1. LIMPIAR PROYECTO (OBLIGATORIO)

En la raíz del proyecto ejecuta:

    rm -rf node_modules
    rm -f package-lock.json


📦 2. INSTALAR DEPENDENCIAS

Luego instala todo de nuevo:

    npm install


🔐 3. CONFIGURAR SUPABASE

3.1 Modificar archivo .env.local

En la raíz del proyecto:

prototipo-reque/.env.local

3.2 Cambiar las variables variables:
NEXT_PUBLIC_SUPABASE_URL=https://.....supabase.co  "Aca ponen su URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG... "Aca ponene su anon key"

Estos estan entro del proyecto de Supabase:

URL. Ir al apartado de busqueda y poner "url" y tocar la opcion que dice "COPY API | URL"

ANON KEY. En el panel izquierdo de "Settings" ir a API Keys Luego, dentro ir a "Legacy anon, service_role API keys" Copiar la "anon public"


⚠️ IMPORTANTE
No usar comillas
No agregar espacios
El archivo debe llamarse EXACTAMENTE .env.local


🧪 4. INICIAR PAGINA Y VERIFICAR CONEXIÓN

Finalmente, iniciar el servidor:

    npm run dev

En la página principal saldra el estatus de la conexion:

Estados posibles:

🟢 Usuario logueado
🟡 Conectado sin sesión (normal)
❌ Error de conexión
▶️ 6. EJECUTAR PROYECTO


🌐 5. ABRIR EN EL NAVEGADOR
http://localhost:3000


🧠 FLUJO COMPLETO
Limpiar proyecto (node_modules, lockfile)
npm install
Configurar .env.local
Conectar Supabase (supabase.ts)
npm run dev


6. Aca viene una base de datos que considero puede servir para lo que queremos hacer, igual se pueden agregar tablas y asi posteriormente. Deben borrar la tabla vieja de clientes por aquello para que no quede ahi de mas.

-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    rol_id INT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha TIMESTAMP NOT NULL,
    motivo VARCHAR(255),
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('reservada','cancelada','completada')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial de citas (auditoría)
CREATE TABLE historial_citas (
    id SERIAL PRIMARY KEY,
    cita_id INT NOT NULL REFERENCES citas(id) ON DELETE CASCADE,
    accion VARCHAR(50) NOT NULL, -- 'reservar', 'cancelar', 'actualizar'
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalle TEXT
);

-- Índices útiles
CREATE INDEX idx_usuario_email ON usuarios(email);
CREATE INDEX idx_citas_usuario ON citas(usuario_id);
CREATE INDEX idx_citas_fecha ON citas(fecha);


7. Recuerden que si pasa algun error con la base de datos o con la validacion de informacion mediante consultas a la base de datos esta puede ser por los permisos, peguen este script para que no les de problema las que van a poner

-- Activar RLS en cada tabla
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_citas ENABLE ROW LEVEL SECURITY;

-- Tabla roles
CREATE POLICY "Permitir inserts a todos"
ON roles
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir login"
ON roles
FOR SELECT
USING (true);

-- Tabla usuarios
CREATE POLICY "Permitir inserts a todos"
ON usuarios
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir login"
ON usuarios
FOR SELECT
USING (true);

-- Tabla citas
CREATE POLICY "Permitir inserts a todos"
ON citas
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir login"
ON citas
FOR SELECT
USING (true);

-- Tabla historial_citas
CREATE POLICY "Permitir inserts a todos"
ON historial_citas
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir login"
ON historial_citas
FOR SELECT
USING (true);
