# Sports Day English

Juego para practicar el examen de inglés de 2º grado (Present continuous, tabla de palabras del study guide), estilo Duolingo.

Jugar: https://ramontiveros.github.io/SportsDay/

No necesita instalación ni servidor: son archivos estáticos (HTML + CSS + JavaScript). Para probarlo localmente:

```sh
python3 -m http.server 8000   # luego abre http://localhost:8000
```

## ¿Qué archivo edito?

| Quiero cambiar…                                   | Archivo |
|---------------------------------------------------|---------|
| Las palabras de la tabla (verbos, lugares, vocab) | `js/data/words.js` |
| Los lugares / unidades y quién hace qué           | `js/data/scenes.js` |
| Qué ejercicios trae cada lección y cada nivel     | `js/lesson/exercises.js` |
| Cómo se ve/funciona cada tipo de ejercicio        | `js/lesson/widgets.js` |
| Vidas, CHECK/CONTINUE, errores que se repiten     | `js/lesson/lesson.js` |
| El camino de niveles, álbum, panel de papás       | `js/screens/home.js` |
| Pantallas de fin de lección, racha, estampa       | `js/screens/results.js` |
| XP, racha diaria, desbloqueo, guardado            | `js/core/progress.js` |
| Voz, micrófono y sonidos                          | `js/core/audio.js` |
| Dibujos (personas, objetos, iconos)               | `js/art/*.js` |
| Colores y estilos                                 | `css/base.css`, `css/home.css`, `css/lesson.css` |

Los scripts se cargan en orden desde `index.html` (sin módulos ni build), así que cada archivo puede usar lo que definen los anteriores.

## Niveles

1. **Rookie** – respuestas cortas y pocas fichas. Speaking: primero escucha, luego repite.
2. **Player** – oraciones completas. Speaking: escucha y repite.
3. **Champion** – fichas trampa (mala ortografía, verbo sin -ing). Speaking: solo texto, sin audio.
