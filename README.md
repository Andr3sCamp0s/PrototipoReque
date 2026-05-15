# PrototipoReque

Sistema prototipo desarrollado con React + Vite + Supabase.

---

# Requisitos

Antes de iniciar, asegúrese de tener instalado:

* Node.js
* npm
* Git
* Una cuenta en Supabase

Descargas:

* Node.js: [https://nodejs.org](https://nodejs.org)
* Git: [https://git-scm.com](https://git-scm.com)
* Supabase: [https://supabase.com](https://supabase.com)

---

# 1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta del proyecto:

```bash
cd PrototipoReque
```

---

# 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Esto instalará todas las dependencias necesarias del proyecto.

---

# 3. Iniciar sesión en Supabase

1. Entrar a:

[https://app.supabase.com](https://app.supabase.com)

2. Iniciar sesión o crear una cuenta.

3. Crear un nuevo proyecto.

4. Esperar a que Supabase termine de configurar la base de datos.

5. Poner el repositorio del proyecto en supabase

---

# 4. Obtener las credenciales de Supabase

Dentro del proyecto de Supabase:

1. Ir al apartado de busqueda y poner "url":

    tocar la opcion que dice "COPY API | URL"

2. En el panel izquierdo de "Settings" ir a API Keys
    Luego, dentro ir a "Legacy anon, service_role API keys"
    Copiar la "anon public"

3. Copiar:

* Project URL // https://...supabase.co y ponerlo en el archivo supabase.js en el apartado de const supabaseUrl
* anon public key // eyJ.... y ponerlo en el archivo supabase.js en el apartado de const supabaseKey

Igual hay unos comentarios en donde se deben de poner para evitar confusiones

---

---

# 5. Configurar la base de datos

Entrar al SQL Editor de Supabase y ejecutar el script correspondiente para crear las tablas.

Ejemplo:

```sql
CREATE TABLE clientes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT,
    correo TEXT,
    password TEXT
);
```

Luego tambien ejecutar el comando para quitar las resstricciones:

```sql
CREATE POLICY "Permitir inserts a todos"
ON clientes
FOR INSERT
TO public
WITH CHECK (true);
```

---

# 6. Ejecutar el proyecto

En la terminal ejecutar:

```bash
npm run dev
```

El proyecto iniciará normalmente y Vite mostrará una URL similar a:

```txt
http://localhost:5173
```

Abrir esa dirección en el navegador.

---

