# Julimboo.store — Landing Page Black Friday (Web Semántica & Scrollytelling)

Landing page narrativa de alto impacto para la campaña **Black Friday (27–30 de noviembre)** de **Julimboo.store** (*«Tecnología que te conecta»*), desarrollada bajo un **enfoque híbrido moderno** que combina **Web Semántica (Schema.org / JSON-LD)** con **Scrollytelling, inercia suave, enmascaramiento dinámico y micro-interacciones**.

---

## 1. Definición de Herramientas y Técnicas Visuales

| Categoría | Herramienta / Técnica | Implementación en la Landing Page |
| :--- | :--- | :--- |
| **Inercia suave (Smooth Scroll)** | **Lenis** (`@studio-freight/lenis`) | Desplazamiento con inercia física suave en rueda/trackpad sincronizado con `requestAnimationFrame` y navegación por anclas (`#nuevos-sellados`, `#iphone-18`, `#linea-duo`, `#open-box`, `#beneficios`). |
| **Scroll-Linked Animations** | CSS `animation-timeline: scroll(root)` + Variables CSS reactivas (`--scroll-progress`, `--hero-parallax`) | Barra de progreso global en el borde superior, paralaje del dispositivo en el *Hero* y actualización continua de máscaras acopladas a la posición de *scroll*. |
| **Scrollytelling & Scroll-Pinning** | CSS `position: sticky` + `overflow-x: clip` (sin `overflow: hidden` en ancestros) | **Acto 2 (Nuevos Sellados)** y **Acto 5 (Open Box · Baterías 100%)**: panel izquierdo fijado con vitrina interactiva que cambia de imagen y precio según la tarjeta enfocada mientras las referencias desfilan a la derecha. |
| **Enmascaramiento Dinámico (Masking)** | CSS `clip-path` (`inset`, `circle`) controlado por *scroll* y control interactivo | • **Acto 1 (Hero):** Revelado tipo cortina en titulares y showcase.<br>• **Acto 2 y 5:** Revelado progresivo `inset(...)` al entrar al bloque.<br>• **Acto 3 (iPhone 18):** Apertura circular `circle(...)` sobre el acabado rojo titanio.<br>• **Acto 4 (iPhone Dúo):** Apertura horizontal simétrica desde el centro (`inset(0 X% 0 X%)`) que simula el despliegue de la pantalla plegable (incluye control deslizable interactivo). |
| **Hovers Modernos** | **Cursor Radial Spotlight** (`--mouse-x`, `--mouse-y`) + **Botones Magnéticos** (`--mag-x`, `--mag-y`) | Halo de luz radial que sigue el puntero sobre bordes y superficie cristalina de cada tarjeta, micro-elevación 3D e iluminación del precio Black Friday frente al precio tachado. |
| **Carruseles y Transiciones en Tarjetas** | **Swiper.js v11** + Filtros reactivos por capacidad/generación | Carrusel táctil y con teclado en **Nuevo iPhone 18** con filtro instantáneo (`Todas`, `256GB`, `512GB`) y filtro por generación en **Open Box** (`Serie 14`, `15`, `16`, `17`). |

---

## 2. Arquitectura de Web Semántica (12 `@type` en Schema.org / JSON-LD)

El bloque `<script type="application/ld+json" id="julimboo-jsonld">` se encuentra desacoplado de las animaciones del DOM e implementa un grafo conectado con **12 tipos de Schema.org** (superando el requisito mínimo de 7 `@type`), además de contar con un **Inspector JSON-LD en vivo** dentro de la interfaz:

1. **`Store`**: Entidad raíz de **Julimboo.store** (`name`, `slogan`, `currenciesAccepted: "COP"`, `sameAs`, `hasOfferCatalog`, `event`, `subjectOf`).
2. **`SaleEvent`**: Campaña promocional **Black Friday · 27 al 30 de noviembre** (`startDate: "2026-11-27"`, `endDate: "2026-11-30"`, `organizer`).
3. **`OfferCatalog`**: Catálogo maestro anidado en 4 sub-catálogos (*iPhone Nuevos, Sellados*, *Nuevo iPhone 18*, *Línea Dúo*, *Open Box · Baterías 100%*).
4. **`Product`**: Las **20 referencias** del afiche promocional con `sku`, `category`, `description`, `image`, `brand` y `offers`.
5. **`Brand`**: Marca fabricante (`Apple`) vinculada a cada `Product`.
6. **`Offer`**: Precio Black Friday normalizado en COP (`price`, `priceCurrency: "COP"`), disponibilidad (`InStock`) y condición (`NewCondition` vs. `RefurbishedCondition` para Open Box).
7. **`ImageObject`**: Recursos visuales en formato `.webp` con `caption` y `contentUrl`.
8. **`ItemList`**: Lista estructurada de los 3 beneficios incluidos en la campaña.
9. **`ListItem`**: Cada accesorio de regalo (*Cargador*, *Forro protector*, *Vidrio templado*).
10. **`ContactPoint`**: Canal de atención oficial `@julimboo.store`.
11. **`WarrantyPromise`** y 12. **`QuantitativeValue`**: Promesa formal de garantía (12 meses en equipos nuevos y 6 meses en Open Box).

---

## 3. Estructura del Proyecto

```text
├── index.html          # Estructura HTML5 semántica + Grafo JSON-LD + Inspector interactivo
├── styles.css          # Sistema de diseño oscuro, sticky scrollytelling, clip-path y spotlight hovers
├── app.js              # Integración de Lenis, Swiper.js, motor de máscaras scroll-linked y filtros
├── Source/imgs/        # Fotografías de equipos (.webp y .jpg) e iconos de accesorios incluidos
└── Documentación/      # Documentos maestros de planificación y arquitectura semántica
```
