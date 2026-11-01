# Cómo subir la web a Hostinger

Esta carpeta (`interno/`) **no se sube nunca**: son guiones, guías y anuncios de uso interno.
Aunque se suba por error, el `.htaccess` devuelve 404 para `interno/` y para cualquier `.md`.

## Qué subir a `public_html/`

```
.htaccess
404.html
index.html
robots.txt
sitemap.xml
llms.txt
llms-full.txt
assets/                      (entera)
casos/                       (entera)
diseno-web-fontaneros/
diseno-web-electricistas/
diseno-web-reformas/
posicionamiento-google-maps/
diseno-web-eibar/
diseno-web-durango/
diseno-web-bilbao/
```

No subir: `interno/`, `capturas de gemini/`, `.git/`, `.gitignore`, `.DS_Store`.

## Antes de subir

1. En el Administrador de archivos de Hostinger, abre el `.htaccess` que ya hay en `public_html/`.
   Si tiene reglas de Hostinger, pega las nuestras **debajo** en vez de sustituirlo.
2. Borra del servidor los `.md` antiguos de la raíz (`GUIA-*.md`, `GUION-*.md`) y la carpeta `assets/anuncios/`.

## Después de subir: comprobar (Terminal)

```sh
for u in / /casos/ /diseno-web-fontaneros/ /diseno-web-bilbao/ /index.html /noexiste /GUION-LOOM-PROSPECCION.md /interno/; do
  printf "%-32s " "$u"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "https://estudios.presupuesta.net$u"
done
```

Debe salir: 200 en las páginas, **301 → /** en `/index.html` y **404** en `/noexiste`, el `.md` e `interno/`.
Si `/index.html` da 200, el `.htaccess` no se está aplicando.

## Después: avisar a Google y Bing

- Google Search Console → Sitemaps → enviar `https://estudios.presupuesta.net/sitemap.xml`
  y pedir indexación de `/casos/` y de las páginas nuevas.
- Bing Webmaster Tools → importar desde Search Console (ChatGPT busca sobre todo en Bing).
