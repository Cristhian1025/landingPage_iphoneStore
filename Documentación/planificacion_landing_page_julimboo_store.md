# Planificación de Landing Page: Julimboo.store (Black Friday)

Documento maestro de planificación para desgranar el afiche promocional de **Julimboo.store** (*Black Friday · 27–30 de noviembre*) en una *landing page* narrativa con web semántica (**Schema.org / JSON-LD**) y movimiento fluido.

---

## 1. Desgranado de la Imagen (Estructura de Bloques)

La pieza gráfica original concentra todo el catálogo en un único lienzo vertical. Para lograr una experiencia legible y de alto impacto visual, se divide en **6 bloques** conectados mediante *scroll*:

1. **Hero / Portada (Black Friday + Marca):** Título *«Black Friday · 27–30 de noviembre»*, eslogan *«Tecnología que te conecta»*, identidad de **Julimboo.store** y emblema superior.
2. **Bloque 1 — iPhone Nuevos, Sellados:** Referencias iPhone 15 (128GB), iPhone 16 (128GB), iPhone 17 (256GB, destacado como *Best Seller*), iPhone 17 Pro (256GB) y iPhone 17 Pro Max (256GB), con precio anterior tachado, precio Black Friday y **1 año de garantía**.
3. **Bloque 2 — Nuevo iPhone 18:** Línea de lanzamiento iPhone 18 Pro y iPhone 18 Pro Max (256GB y 512GB) con **1 año de garantía**.
4. **Bloque 3 — Línea Dúo:** Equipo plegable iPhone Dúo en versiones de 256GB y 512GB con **1 año de garantía**.
5. **Bloque 4 — Open Box (Baterías 100%):** Catálogo de 9 referencias (14 Pro/Max, 15 Pro/Max, 16 Pro/Max, 17, 17 Pro y 17 Pro Max), resaltando **Baterías 100%** y **6 meses de garantía**.
6. **Bloque 5 — Beneficios incluidos y Cierre:** Accesorios incluidos (**cargador**, **forro** y **vidrio templado**) y llamado a la acción hacia `@julimboo.store`.

---

## 2. Decisión de Arquitectura Frontend (Enfoque Híbrido)

Se selecciona el **enfoque híbrido**: **CSS moderno + JavaScript nativo** para *scroll-linked animations*, *masking* (`clip-path`), *pinning* (`position: sticky`) y *hovers*, apoyado en **Lenis** para la inercia suave y **Swiper.js** (opcional) para el carrusel de variantes.

### Comparativa de Enfoques Evaluados

| Enfoque | Herramientas principales | Pros | Contras |
| :--- | :--- | :--- | :--- |
| **Híbrido (Seleccionado)** | CSS moderno (`sticky`, `clip-path`, `animation-timeline`) + JS nativo + **Lenis** (+ **Swiper.js** opcional) | Ideal para el alcance; excelente rendimiento delegando al navegador lo nativo; mantiene el JSON-LD limpio y desacoplado. | Requiere respaldo sencillo para propiedades *scroll-driven* puramente CSS y coordinar estilos base con Lenis. |
| **Todo con Librerías** | GSAP + ScrollTrigger + Lenis + Swiper | Control milimétrico de líneas de tiempo y consistencia entre navegadores. | Sobredimensionado para una *landing* de un solo lienzo; añade peso y curva de ajuste. |
| **100% Nativo** | HTML + CSS + JS vanilla (*Scroll Snap*) | Cero dependencias y máxima ligereza. | Inercia física más limitada en *desktop*/*touch* y carruseles más básicos. |

### Regla de Oro Semántica
El bloque `<script type="application/ld+json">` se mantiene independiente del árbol visual y de las animaciones, garantizando que los efectos de *scroll*, *sticky* o máscaras no alteren los datos estructurados.

---

## 3. Tabla Maestra de Productos y Precios (Extraída de la Imagen)

> **Nota para JSON-LD:** En el marcado estructurado de Schema.org los precios deben normalizarse como valores numéricos sin puntos de miles (ej. `2500000`) acompañados de `"priceCurrency": "COP"`.

| Sección del flyer | Línea / Modelo | Capacidad | Precio anterior | Precio Black Friday | Condición | Garantía | Destacado / Extras |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **iPhone Nuevos, Sellados** | iPhone 15 | 128GB | $2.600.000 | $2.500.000 | Nuevo, sellado | 1 año de garantía | — |
| **iPhone Nuevos, Sellados** | iPhone 16 | 128GB | $2.900.000 | $2.800.000 | Nuevo, sellado | 1 año de garantía | — |
| **iPhone Nuevos, Sellados** | iPhone 17 | 256GB | $3.450.000 | $3.350.000 | Nuevo, sellado | 1 año de garantía | Badge **Best Seller** |
| **iPhone Nuevos, Sellados** | iPhone 17 Pro | 256GB | $4.250.000 | $4.150.000 | Nuevo, sellado | 1 año de garantía | — |
| **iPhone Nuevos, Sellados** | iPhone 17 Pro Max | 256GB | $4.399.000 | $4.299.000 | Nuevo, sellado | 1 año de garantía | — |
| **Nuevo iPhone 18** | iPhone 18 Pro | 256GB | $4.600.000 | $4.500.000 | Nuevo iPhone 18 | 1 año de garantía | — |
| **Nuevo iPhone 18** | iPhone 18 Pro Max | 256GB | $5.100.000 | $5.000.000 | Nuevo iPhone 18 | 1 año de garantía | — |
| **Nuevo iPhone 18** | iPhone 18 Pro | 512GB | $5.360.000 | $5.260.000 | Nuevo iPhone 18 | 1 año de garantía | — |
| **Nuevo iPhone 18** | iPhone 18 Pro Max | 512GB | $6.000.000 | $5.900.000 | Nuevo iPhone 18 | 1 año de garantía | — |
| **Dúo** | iPhone Dúo | 256GB | $8.500.000 | $8.400.000 | Línea Dúo (plegable) | 1 año de garantía | — |
| **Dúo** | iPhone Dúo | 512GB | $9.150.000 | $9.050.000 | Línea Dúo (plegable) | 1 año de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 14 Pro | 256GB | $2.100.000 | $2.000.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 14 Pro Max | 256GB | $2.400.000 | $2.300.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 15 Pro | 256GB | $2.600.000 | $2.500.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 15 Pro Max | 256GB | $2.800.000 | $2.700.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 16 Pro | 256GB | $2.900.000 | $2.800.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 16 Pro Max | 256GB | $3.100.000 | $3.000.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 17 | 256GB | $2.900.000 | $2.800.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 17 Pro | 256GB | $3.750.000 | $3.650.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Open Box (Baterías 100%)** | iPhone 17 Pro Max | 256GB | $4.000.000 | $3.900.000 | Open Box · Baterías 100% | 6 meses de garantía | — |
| **Extras y Cierre** | Accesorios incluidos | Cargador, forro y vidrio templado | — | — | Beneficio de campaña | — | Canal: `@julimboo.store` |

---

## 4. Guion de Scrollytelling, Pinning y Máscaras (`clip-path`)

El recorrido aplica **inercia suave con Lenis** de principio a fin, **fijación de paneles (`position: sticky`)** en los bloques de catálogo de iPhone y **máscaras dinámicas (`clip-path`)** reservadas exclusivamente para **titulares e imágenes principales**.

### Acto 0 · Navegación y Progreso Global
* **Comportamiento:** Barra superior minimalista con enlaces ancla a cada línea (*Nuevos*, *iPhone 18*, *Dúo*, *Open Box*) y barra de progreso vinculada al *scroll*.
* **Herramienta:** **Lenis** para el desplazamiento suave con inercia + CSS `animation-timeline: scroll()` (con respaldo ligero en JS) para el indicador de avance.

### Acto 1 · Apertura y Promesa (Hero)
* **Comportamiento:** Entrada sobre fondo oscuro con contraste metálico/rojo presentando **Julimboo.store**, *«Tecnología que te conecta»* y las fechas **27–30 de noviembre**.
* **Máscara `clip-path`:** Revelado tipo cortina (`inset(...)` o `polygon(...)`) sobre el titular *Black Friday* y el emblema superior al cargar la vista.
* **Animación sutil:** Desplazamiento corto (`translateY`) y transición de opacidad en el sello de calendario.

### Acto 2 · iPhone Nuevos, Sellados (*Scrollytelling* con `sticky`)
* **Comportamiento:** Disposición en dos columnas: en una permanece fijada (`position: sticky`) la cabecera de categoría (*iPhone Nuevos, sellados*, sello de *1 año de garantía* e imagen grupal de los equipos), mientras en la otra columna desfilan las 5 referencias desde **iPhone 15 (128GB)** hasta **iPhone 17 Pro Max (256GB)**, destacando el **Best Seller** (iPhone 17 256GB).
* **Máscara `clip-path`:** Revelado progresivo sobre la imagen de los iPhone sellados al entrar al bloque.
* **Animación sutil:** *Hover* moderno en cada fila/tarjeta que ilumina el borde y resalta el precio de oferta frente al tachado.

### Acto 3 · Nuevo iPhone 18 (Enfoque de Lanzamiento)
* **Comportamiento:** Presentación destacada de **iPhone 18 Pro** y **iPhone 18 Pro Max** (256GB y 512GB, *1 año de garantía*), combinando panel informativo con carrusel o selector de capacidades.
* **Máscara `clip-path`:** Revelado circular o diagonal (`circle(...)` / `polygon(...)`) sobre la imagen de los iPhone 18 en acabado rojo/oscuro.
* **Animación sutil:** Transiciones suaves (`transform`, `opacity`) en tarjetas o diapositivas de **Swiper.js**.

### Acto 4 · Línea Dúo (Formato Plegable)
* **Comportamiento:** Bloque de respiro visual centrado en el **iPhone Dúo** (256GB y 512GB, *1 año de garantía*).
* **Máscara `clip-path`:** Apertura horizontal simétrica desde el centro (`inset(0 50% 0 50%)` $\rightarrow$ `inset(0 0% 0 0%)`) sobre la fotografía del teléfono plegable, evocando la apertura de su pantalla.
* **Animación sutil:** Entrada lateral suave en las tarjetas de precio.

### Acto 5 · Open Box · Baterías 100% (*Scrollytelling* con `sticky`)
* **Comportamiento:** Cabecera fijada (`position: sticky`) con el sello **Baterías 100%**, **6 meses de garantía** y la imagen del dispositivo Open Box, acompañando el recorrido de las 9 referencias (14 Pro/Max a 17 Pro Max).
* **Máscara `clip-path`:** Revelado vertical (`inset(100% 0 0 0)` $\rightarrow$ `inset(0 0 0 0)`) sobre la imagen lateral del equipo.
* **Animación sutil:** *Hover* limpio en cada tarjeta con elevación ligera y foco accesible (`:focus-visible`).

### Acto 6 · Regalos Incluidos y Cierre (`@julimboo.store`)
* **Comportamiento:** Cierre presentando los 3 accesorios incluidos (**cargador**, **forro** y **vidrio templado**) junto con el acceso directo a **@julimboo.store**.
* **Máscara `clip-path`:** Revelado horizontal en el titular de cierre.
* **Animación sutil:** Micro-elevación (`translateY`) en los tres bloques de accesorios al pasar el cursor.

### Reglas Técnicas de Diseño y Accesibilidad
* **Sin `overflow: hidden` en padres de elementos `sticky`:** Usar `overflow: clip` si se requiere recortar desbordamientos sin romper el contexto de fijación.
* **Respeto a `prefers-reduced-motion`:** Cuando esté activo, deshabilitar máscaras animadas (`clip-path: none`) y transiciones de desplazamiento largo.
* **Optimización de imágenes:** Aplicar `loading="lazy"` en las imágenes posteriores al *Hero*.

---

## 5. Arquitectura Semántica Planificada (8 `@type` de Schema.org)

Para superar el requisito mínimo de **7 tipos** y establecer relaciones semánticas mediante objetos anidados en JSON-LD (`@context: "https://schema.org"`):

1. **`Store` (o `ElectronicsStore`):** Entidad raíz para **Julimboo.store** (`name`, `slogan`, `sameAs` hacia `@julimboo.store`, `hasOfferCatalog`).
2. **`SaleEvent`:** Campaña **Black Friday** (`name`, `startDate: "2026-11-27"`, `endDate: "2026-11-30"`, `organizer` / `location` vinculados a la tienda).
3. **`OfferCatalog`:** Agrupación de líneas comerciales (*Nuevos Sellados*, *Nuevo iPhone 18*, *Dúo*, *Open Box*).
4. **`Product`:** Cada modelo y capacidad de iPhone (`name`, `category`, `brand`, `offers`).
5. **`Offer`:** Precio promocional y condiciones (`price`, `priceCurrency: "COP"`, `itemCondition` diferenciando `NewCondition` de `UsedCondition`/`RefurbishedCondition` en *Open Box*, y detalle de garantía).
6. **`Brand`:** Marca del fabricante (`Apple`) anidada en cada `Product`.
7. **`ImageObject`:** Descripción de las piezas visuales principales (`url`, `caption`).
8. **`ItemList` / `ContactPoint`:** `ItemList` para estructurar los beneficios incluidos (*cargador*, *forro*, *vidrio templado*) y `ContactPoint` para el canal `@julimboo.store`.