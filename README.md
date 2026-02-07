# Liga MX

Sitio estático para ver los partidos de **Liga MX**: equipos, hora y canales de TV. Diseño minimalista y cuadrado (sin bordes redondeados).

- **Stack**: Astro, Tailwind CSS, TypeScript
- **Datos**: JSON en `src/data/liga-mx-hoy.json`

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Actualizar partidos

```bash
npm run update-data
```

Esto sobrescribe `src/data/liga-mx-hoy.json`. Si la estructura de la web cambia, puede ser necesario ajustar el script en `scripts/update-liga-mx.mjs`.

## Build y despliegue (GitHub Pages)

```bash
npm run build
```

La salida queda en `dist/`. Para publicar en GitHub Pages:

1. En el repo, ve a **Settings → Pages**.
2. **Source**: Deploy from a branch.
3. **Branch**: `gh-pages` (o `main`) y carpeta `/ (root)` o **docs** si configuraste `outDir: 'docs'` en Astro.

Si usas la rama `gh-pages`, sube el contenido de `dist/` a esa rama (por ejemplo con el paquete `gh-pages`: `npx gh-pages -d dist`).
# pitazo.github.io
