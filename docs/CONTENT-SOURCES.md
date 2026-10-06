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
