



# Posibles errores

## 1.- Error de compatibilidad - rollup-plugin-babel
Error detectado:
`` -npm error node_modules/rollup/plugin-babel

> -npm error   dev rollup/plugin-babel@"^4.4.0" from the root project

> -npm error Fix the upstream dependency conflict, or retry

> -npm error this command with --force or --legacy-peer-deps

> -npm error to accept an incorrect (and potentially broken) dependency resolution.

Conflicto de dependencias debido a que rollup/plugin-babel (versión 4.4.0) requiere una versión de Rollup anterior a la 3, pero tienes instalado Rollup 3.30.0. Esto es porque los plugins antiguos no son compatibles con Rollup 3.

Para solucionarlo, debemos actualizar a los plugins modernos de Rollup, que sí funcionan con la versión 3.

Pasar de: 
"rollup/plugin-babel": "^4.4.0" -> "rollup/plugin-babel": "^6.0.4"

# Ante cualquier corrección de esta libreria
Para una mejor implementacion de cambios limbia la carpeta node_modules o package.json con el comando:
> rm -rf node_modules package-lock.json