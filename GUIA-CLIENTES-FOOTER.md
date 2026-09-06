# Guía de Implementación: Enlaces Footer "Hecho por" en Webs de Clientes

Esta guía explica cómo insertar el enlace de atribución en el pie de página (footer) de cada web que desarrolles para fontaneros, electricistas, empresas de reformas y gremios. 

El objetivo es **doble**:
1. **Transferencia de autoridad SEO limpia** hacia la landing de `Presupuesta Estudios`.
2. **Captación directa de nuevos clientes del sector**: cuando otro autónomo o contratista vea la web de un compañero de profesión (o su competencia), verá el enlace y querrá que tú le hagas la suya.

---

## 1. Estrategia de Textos de Anclaje (Anchor Texts)

> [!IMPORTANT]
> **No uses siempre exactamente el mismo texto de anclaje** en todas las webs de tus clientes para evitar que Google lo interprete como un patrón artificial. Ve rotando según el gremio del cliente.

### A. Para clientes de Reformas y Construcción (como `web-hakim` o `Web-moha`):
```html
<p class="footer-credit">
  Web y posicionamiento por 
  <a href="https://presupuestaestudios.com" target="_blank" rel="noopener" title="Especialistas en webs y Google Maps para reformas">
    Presupuesta Estudios
  </a> · Especialistas en empresas de reformas
</p>
```

### B. Para clientes de Fontanería y Desatascos:
```html
<p class="footer-credit">
  Diseño web y SEO local por 
  <a href="https://presupuestaestudios.com" target="_blank" rel="noopener" title="Webs de alta conversión para fontaneros">
    Presupuesta Estudios
  </a> · Páginas web para fontaneros
</p>
```

### C. Para clientes de Electricistas e Instaladores:
```html
<p class="footer-credit">
  Digitalización y Google Maps por 
  <a href="https://presupuestaestudios.com" target="_blank" rel="noopener" title="Posicionamiento y webs para instaladores electricistas">
    Presupuesta Estudios
  </a> · Clientes directos para instaladores
</p>
```

### D. Versión con Mención al Software Presupuesta (Sinergia Total):
```html
<p class="footer-credit">
  Desarrollado por 
  <a href="https://presupuestaestudios.com" target="_blank" rel="noopener">
    Presupuesta Estudios
  </a> · Presupuestos inteligentes con 
  <a href="https://presupuesta.net" target="_blank" rel="noopener">
    Presupuesta.net
  </a>
</p>
```

---

## 2. Snippet CSS Recomendado para el Footer del Cliente

Añade estas líneas al archivo CSS de la web del cliente para que el enlace quede perfectamente integrado, discreto y profesional:

```css
/* Crédito de agencia en footer de clientes */
.footer-credit {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 8px;
}

.footer-credit a {
  color: #cbd5e1;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-credit a:hover {
  color: #10b981; /* O el color de acento de tu marca */
  text-decoration: underline;
}
```

---

## 3. Parámetros UTM para Medir el Tráfico que te Llega

Si quieres rastrear exactamente qué cliente te está trayendo visitas a tu landing de agencia, puedes añadir parámetros UTM a los enlaces:

```html
<a href="https://presupuestaestudios.com/?utm_source=reforma-hakim&utm_medium=footer-credit&utm_campaign=client-referral" target="_blank" rel="noopener">
  Presupuesta Estudios
</a>
```

Así, en tus estadísticas podrás comprobar qué webs de clientes generan más clics de otros profesionales interesados.
