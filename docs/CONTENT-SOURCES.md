# Fuentes Y Mantenimiento

El README es una presentacion publica. Sus archivos SVG son imagenes autonomas:
no contienen JavaScript, fuentes externas, iframes ni contenido interactivo.

## Contenido Verificado

- Formacion y experiencia: `src/data/cv.ts` en [CV profesional](https://github.com/koyarxs/Project-02-CV-Yerko-Barrera-Septiembre-2026).
- FraudShield: README y package.json del [repositorio publico](https://github.com/koyarxs/Project-01-FraudShield-Septiembre-2026). MVP academico con datos simulados; clasifica riesgo, no confirma fraude.
- Pawly: README y `apps/web/package.json` del [repositorio publico](https://github.com/koyarxs/Project-04-Pawly-Octubre-2026). Etapa inicial: frontend Next.js; el stack Full Stack restante es propuesto, no se presenta como implementado.
- FlyMaster: descripcion de proyecto aprobada por su propietario. Repositorio privado; no se publican codigo, capturas de consultas, credenciales ni datos de clientes.
- Iconos: [Simple Icons](https://simpleicons.org/), version fijada en package-lock.json. Las marcas pertenecen a sus titulares.
- Animacion de contribuciones: [Platane/snk](https://github.com/Platane/snk), action fijada por SHA.

## Animaciones

La propuesta local nueva es `Yerko's Developer World`. Se genera con
`scripts/build-world.mjs`: personajes vectoriales originales y doce escenarios
cartoon distintos. El generador anterior se conserva como `build:legacy`;
sus recursos no forman parte del nuevo recorrido visible.

La identidad academica adicional (Licenciado en Ingenieria), los hobbies y el
roadmap proceden del brief confirmado por el propietario. No se agregan anos
como desarrollador, seniority, certificaciones ni experiencia cloud/Kubernetes.
Vite, React Native, AWS/Azure/Cloudflare, Kubernetes y herramientas de testing
no acreditadas se separan del stack aplicado. MongoDB se presenta en
profundizacion, no como experiencia experta.

Las escenas tienen viewBox, title, desc y texto alternativo. Sus animaciones CSS
se detienen con prefers-reduced-motion. No hay enlaces interactivos dentro del
SVG: la exploracion utiliza enlaces Markdown y details/summary permitidos.
"Online" es un estado ficticio de videojuego, no presencia en tiempo real;
las barras Developer Energy se identifican como humor, no mediciones.

Ver `docs/DEVELOPER-WORLD-REVIEW.md` para el inventario completo, QA y limites.

`developer-workflow.svg` cuenta una secuencia de 12 segundos: boot, codigo,
terminal, arquitectura, proyectos y cierre. La escena de terminal dice
`ILLUSTRATIVE SESSION`: no es evidencia de una ejecucion real y no muestra
cantidades inventadas de tests, transacciones o porcentajes.

Hay una version movil, una portada estatica para movimiento reducido y una
vista de texto de la secuencia dentro del README. El terminal secundario esta
colapsado por defecto. Las barras de trabajo actual son indeterminadas, no una
medicion de avance.

Las previews WebP son diagramas conceptuales, explicitamente rotulados, no
capturas inventadas de una aplicacion terminada. No sustituyen demos reales.

## Generar Recursos

```sh
npm ci
npm run build:visuals
npm test
```

Los generadores son herramientas de desarrollo. Ningun script se ejecuta en
el README. El perfil sirve solo SVG, WebP, Markdown y HTML permitido por GitHub.

## Actividad Real

El workflow se ejecuta diariamente y bajo demanda. Solo utiliza GITHUB_TOKEN
temporal, con permiso de escritura restringido a este repositorio. Filtra
repositorios privados y genera estadisticas desde respuestas reales de GitHub.
El calendario usa las contribuciones visibles con los permisos del workflow;
no afirma mostrar todo el trabajo privado ni una medicion de productividad.
Los snapshots muestran su fecha y no son widgets de estadisticas simuladas.

No configurar un PAT personal en Actions. Si falla una consulta, el proceso
falla y conserva el snapshot anterior en vez de reemplazarlo por ceros.

## Showreel

`assets/video/profile-showreel-thumbnail.webp` esta preparado, pero no hay
video publicado: el README lo indica y no utiliza un enlace vacio o ficticio.
Cuando exista una URL real, envolver su imagen en un enlace Markdown a esa URL.

## Comprobaciones

Revisar el render real de GitHub en escritorio, movil, tema claro y oscuro,
la animacion tras Camo/raw, el movimiento reducido y las imagenes generadas.
El codigo de otros repositorios no se modifica desde este proyecto.

La entrega inicial se hizo sin commit ni push; el propietario autorizo
posteriormente su publicacion en GitHub. La vista previa usa el HTML
saneado por POST /markdown de GitHub, CSS github-markdown-css y SVG locales.
La version anterior ya demostro movimiento SVG en el perfil publicado, pero
esta version nueva requiere una comprobacion final tras autorizar publicacion.
