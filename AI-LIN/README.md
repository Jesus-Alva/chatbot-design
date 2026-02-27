# chat-ai-lin

[![npm version](https://img.shields.io/npm/v/chat-ai-lin.svg)](https://www.npmjs.com/package/chat-ai-lin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Componente React para integrar un chatbot inteligente basado en **Rasa** en proyectos Next.js. Incluye estilos con Tailwind CSS y se conecta fácilmente a tu backend de Rasa.

---

## 📦 Instalación

```bash
npm install chat-ai-lin
```

# Uso 

**1. Importa el componente y los estilos en tu aplicación:**
```bash
import Chatbot from 'chat-ai-lin';
import 'chat-ai-lin/dist/styles.css';

function MyApp() {
  return (
    <div>
      <Chatbot backendUrl="http://localhost:5005" primaryColor="#3b82f6" />
    </div>
  );
}
```
**2. Si usas Tailwind CSS, agrega la ruta del paquete a tu tailwind.config.js**
``` bash
content: [
  // ...
  './node_modules/chat-ai-lin/**/*.js',
],
``` 

# Backend (Rasa + Docker)
El backend necesario para procesar las conversaciones está disponible en el repositorio aparte:

https://github.com/Jesus-Alva/chatbot-design.git

Sigue las instrucciones de ese repositorio para levantar los contenedores Docker con Rasa, las acciones personalizadas y Redis.

### Requisitos previos
Docker y Docker Compose instalados.

(Opcional) Python si deseas modificar las acciones.

**Pasos rápidos para levantar el backend**

``` 
# Clona el repositorio (si no lo has hecho)
git clone https://github.com/Jesus-Alva/chatbot-design.git
cd chatbot-design/backend

# Construye y levanta los contenedores
docker-compose up -d

# Entrena el modelo (primera vez)
docker-compose exec rasa rasa train

# Reinicia el contenedor de Rasa para cargar el modelo entrenado
docker-compose restart rasa
```  

### Props del componente
``` 

Prop	       | Tipo	   | Descripción	Valor por defecto
backendUrl	   | string	   | URL base del servidor Rasa	http://localhost:5005
primaryColor   | string	   | Color principal del botón y encabezado (código hex o nombre)	#3b82f6 (azul)
``` 

### Personalización

**Frontend**
Puedes modificar el comportamiento del componente sobrescribiendo estilos mediante CSS personalizado o pasando clases adicionales (si en el futuro se extiende). Por ahora, las props backendUrl y primaryColor te permiten adaptar la apariencia básica.

**Backend**
Las acciones del chatbot (consultas a APIs, reservas, etc.) se definen en el archivo actions/actions.py. Puedes modificarlas para conectar con tus sistemas de reservas, bases de datos o cualquier otra fuente de información.

# Solución de problemas comunes

### Error: "rollup/plugin-babel" conflict (solo durante el desarrollo del paquete)
Si encuentras errores como:
```text 
 -npm error node_modules/rollup/plugin-babel
 -npm error   dev rollup/plugin-babel@"^4.4.0" from the root project
 -npm error Fix the upstream dependency conflict, or retry
 -npm error this command with --force or --legacy-peer-deps
 -npm error to accept an incorrect (and potentially broken) dependency resolution.
``` 

Esto se debe a que el paquete rollup-plugin-babel antiguo no es compatible con Rollup 3. No afecta a los usuarios finales, pero si deseas contribuir al desarrollo, actualiza las dependencias en el package.json:

``` 
"devDependencies": {
  "@rollup/plugin-babel": "^6.0.4",
  "@rollup/plugin-commonjs": "^25.0.7",
  "@rollup/plugin-node-resolve": "^15.2.3"
}
``` 

# Ante cualquier corrección de esta libreria
Para una mejor implementacion de cambios limbia la carpeta node_modules o package.json con el comando:
> rm -rf node_modules package-lock.json

# 📝 Licencia
MIT © [Jesus Alva Bustamante ](#https://github.com/Jesus-Alva)