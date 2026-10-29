(() => {
    if (window.__cemiaInicializada) return;
    window.__cemiaInicializada = true;

    const avatar = "data:image/jpeg;base64,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";
    const estilos = document.createElement("style");
    estilos.textContent = `
        .cemia-launcher{position:fixed;z-index:10000;right:24px;bottom:24px;display:flex;align-items:center;gap:10px;border:0;border-radius:999px;padding:9px 18px 9px 9px;background:linear-gradient(135deg,#e87845,#bc482c);color:#fff;font:700 15px system-ui,sans-serif;box-shadow:0 10px 28px #182d4a40;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .cemia-launcher:hover{transform:translateY(-3px);box-shadow:0 14px 32px #182d4a55}
        .cemia-launcher-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #fff}
        .cemia-panel{position:fixed;z-index:10001;right:24px;bottom:84px;width:min(380px,calc(100vw - 28px));height:min(540px,calc(100vh - 120px));display:none;flex-direction:column;overflow:hidden;border:1px solid #dbe7f4;border-radius:22px;background:#fff;box-shadow:0 20px 55px #14294440;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#20334b}
        .cemia-panel.abierto{display:flex;animation:cemia-entrada .18s ease-out}
        @keyframes cemia-entrada{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .cemia-cabecera{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(115deg,#dff1ff,#b9dcf4 55%,#f8d4c2);border-bottom:1px solid #d5e5f3}
        .cemia-cabecera img{width:52px;height:52px;flex:none;border:2px solid #fff;border-radius:50%;object-fit:cover;object-position:center 35%;box-shadow:0 3px 12px #173b5940}
        .cemia-identidad{flex:1;min-width:0}.cemia-identidad strong{display:block;font-size:16px;color:#17365a}.cemia-identidad span{font-size:12px;color:#516a80}
        .cemia-icono{width:36px;height:36px;border:0;border-radius:50%;background:#ffffffb8;color:#17365a;font-size:20px;cursor:pointer}
        .cemia-mensajes{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:16px;background:radial-gradient(ellipse at 5% 0%,#e6f5ff 0,transparent 44%),#f7f9fc}
        .cemia-mensaje{max-width:88%;padding:10px 13px;border-radius:15px;white-space:pre-wrap;overflow-wrap:anywhere;box-shadow:0 2px 8px #17365a0c}
        .cemia-mensaje.bot{align-self:flex-start;background:#fff;border:1px solid #e5edf5;border-bottom-left-radius:5px}
        .cemia-mensaje.usuario{align-self:flex-end;background:#dceeff;color:#143455;border-bottom-right-radius:5px}
        .cemia-estado{min-height:19px;padding:0 16px;color:#687c91;font-size:12px;background:#f7f9fc}
        .cemia-controles{display:flex;align-items:center;gap:8px;padding:12px;border-top:1px solid #e8edf3;background:#fff}
        .cemia-entrada{flex:1;min-width:0;padding:11px 13px;border:1px solid #d5e0eb;border-radius:14px;outline:none;font:inherit}
        .cemia-entrada:focus{border-color:#5c9bc9;box-shadow:0 0 0 3px #5c9bc922}
        .cemia-enviar,.cemia-micro,.cemia-voz{height:42px;min-width:42px;border:0;border-radius:13px;cursor:pointer;font-size:17px}
        .cemia-enviar{padding:0 14px;background:#bd4b30;color:#fff;font-size:14px;font-weight:700}
        .cemia-micro{background:#e8f4fc;color:#174e78}.cemia-micro[aria-pressed="true"]{background:#c94b39;color:#fff;animation:cemia-pulso 1s infinite}
        .cemia-micro:disabled{opacity:.45;cursor:not-allowed}.cemia-voz{background:#f4f1ff;color:#51448a}
        @keyframes cemia-pulso{50%{box-shadow:0 0 0 7px #c94b3925}}
        @media(max-width:520px){.cemia-launcher{right:14px;bottom:14px}.cemia-panel{right:10px;bottom:75px;height:min(560px,calc(100vh - 96px));width:calc(100vw - 20px)}}
        @media(prefers-reduced-motion:reduce){.cemia-panel.abierto,.cemia-launcher,.cemia-micro[aria-pressed="true"]{animation:none;transition:none}}
    `;
    document.head.appendChild(estilos);

    const lanzador = document.createElement("button");
    lanzador.className = "cemia-launcher";
    lanzador.type = "button";
    lanzador.setAttribute("aria-label", "Abrir asistente Ale");
    lanzador.innerHTML = `<img class="cemia-launcher-avatar" src="${avatar}" alt=""><span>Pregunta a Ale</span>`;

    const panel = document.createElement("section");
    panel.className = "cemia-panel";
    panel.setAttribute("aria-label", "Asistente de voz Ale");
    panel.innerHTML = `
        <header class="cemia-cabecera">
            <img src="${avatar}" alt="Asistente Ale">
            <div class="cemia-identidad"><strong>Ale</strong><span>Consulta precios y existencias</span></div>
            <button class="cemia-icono" type="button" data-cerrar aria-label="Cerrar asistente">×</button>
        </header>
        <div class="cemia-mensajes" role="log" aria-live="polite" aria-relevant="additions text">
            <div class="cemia-mensaje bot">¡Hola! Soy Ale. Pregúntame por el precio o las existencias de un producto.</div>
        </div>
        <div class="cemia-estado" aria-live="polite">Puedes escribir o tocar el micrófono.</div>
        <form class="cemia-controles">
            <input class="cemia-entrada" type="text" autocomplete="off" placeholder="Ej.: precio del taladro" aria-label="Escribe tu pregunta">
            <button class="cemia-micro" type="button" aria-label="Hablar" title="Hablar" aria-pressed="false">🎙️</button>
            <button class="cemia-enviar" type="submit" aria-label="Enviar pregunta">Enviar</button>
            <button class="cemia-voz" type="button" aria-label="Silenciar respuesta de voz" title="Silenciar o activar la voz">🔊</button>
        </form>
    `;
    document.body.append(lanzador, panel);

    const mensajes = panel.querySelector(".cemia-mensajes");
    const estado = panel.querySelector(".cemia-estado");
    const entrada = panel.querySelector(".cemia-entrada");
    const micro = panel.querySelector(".cemia-micro");
    const botonVoz = panel.querySelector(".cemia-voz");
    let vozActivada = true;
    let reconocimiento = null;

    function abrir() {
        panel.classList.add("abierto");
        lanzador.setAttribute("aria-expanded", "true");
        entrada.focus();
    }

    function cerrar() {
        panel.classList.remove("abierto");
        lanzador.setAttribute("aria-expanded", "false");
        lanzador.focus();
    }

    function agregarMensaje(texto, autor) {
        const burbuja = document.createElement("div");
        burbuja.className = `cemia-mensaje ${autor}`;
        burbuja.textContent = texto;
        mensajes.appendChild(burbuja);
        mensajes.scrollTop = mensajes.scrollHeight;
    }

    

function hablar(texto) {
    if (!vozActivada || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const voces = window.speechSynthesis.getVoices();

    const vozFemenina = voces.find(voz =>
        /^es[-_]/i.test(voz.lang) &&
        /sabina|helena|paulina|monica|zira|female|mujer/i.test(voz.name)
    );

    const frase = new SpeechSynthesisUtterance(texto);
    frase.lang = "es-GT";
    frase.rate = 0.96;

    if (vozFemenina) {
        frase.voice = vozFemenina;
        frase.lang = vozFemenina.lang;
    } else {
        console.warn(
            "No se encontró una voz femenina en español. Voces disponibles:",
            voces.map(voz => `${voz.name} (${voz.lang})`)
        );
    }

    window.speechSynthesis.speak(frase);
}



    

    function normalizar(texto) {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function leerProductos() {
        return Array.from(document.querySelectorAll("#lista-productos .producto-card"))
            .map(tarjeta => ({
                nombre: tarjeta.querySelector("h3")?.textContent?.trim() || "",
                sku: tarjeta.querySelector(".producto-sku")?.textContent?.trim() || "",
                precio: tarjeta.querySelector(".producto-precio")?.textContent?.trim() || "",
                departamento: tarjeta.querySelector(".producto-departamento")?.textContent?.trim() || "",
                existencias: tarjeta.querySelector(".producto-stock")?.textContent?.trim() || ""
            }))
            .filter(producto => producto.nombre);
    }

    function encontrarProducto(pregunta, catalogo) {
        const ignorar = new Set([
            "cemia", "asistente", "hola", "buenas", "buenos", "dias", "tardes", "noches",
            "cual", "que", "cuanto", "cuesta", "precio", "vale", "valen", "es", "el", "la",
            "los", "las", "un", "una", "de", "del", "al", "por", "favor", "me", "dime",
            "decir", "puedes", "podrias", "quisiera", "quiero", "saber", "hay", "tiene", "tienen",
            "disponible", "disponibles", "existencia", "existencias", "stock", "sucursal", "producto",
            "productos", "para", "en", "esta", "este", "mi", "su", "ahora", "cuantos", "cuantas"
        ]);
        const palabras = normalizar(pregunta).split(" ").filter(p => p.length > 2 && !ignorar.has(p));
        if (!palabras.length) return { producto: null, ambiguos: [] };

        const puntuar = producto => {
            const nombre = normalizar(`${producto.nombre} ${producto.sku} ${producto.departamento}`);
            const tokens = nombre.split(" ");
            let aciertos = 0;
            palabras.forEach(palabra => {
                if (tokens.some(token => token === palabra || (Math.min(token.length, palabra.length) >= 4 && (token.startsWith(palabra) || palabra.startsWith(token))))) {
                    aciertos += 1;
                }
            });
            return { producto, aciertos, cobertura: aciertos / palabras.length };
        };

        const ranking = catalogo.map(puntuar).filter(item => item.aciertos > 0).sort((a, b) => b.cobertura - a.cobertura || b.aciertos - a.aciertos);
        if (!ranking.length || ranking[0].cobertura < 0.5) return { producto: null, ambiguos: [] };
        const empatados = ranking.filter(item => item.cobertura === ranking[0].cobertura && item.aciertos === ranking[0].aciertos);
        if (empatados.length > 1 && palabras.length < 2) return { producto: null, ambiguos: empatados.map(item => item.producto) };
        return { producto: ranking[0].producto, ambiguos: [] };
    }

    function responder(pregunta) {
        const catalogo = leerProductos();
        if (!catalogo.length) {
            return "Todavía no veo productos cargados en esta sucursal. Espera a que termine de cargar el catálogo o selecciona otra sucursal.";
        }

        const resultado = encontrarProducto(pregunta, catalogo);
        if (resultado.ambiguos.length) {
            return `Encontré varios productos que coinciden: ${resultado.ambiguos.slice(0, 3).map(item => item.nombre).join(", ")}. Dime el nombre más completo para buscar el correcto.`;
        }
        if (!resultado.producto) {
            return "No encontré ese producto en la sucursal seleccionada. Prueba diciendo su nombre como aparece en el catálogo.";
        }

        const producto = resultado.producto;
        return `El precio de ${producto.nombre} es ${producto.precio}. ${producto.existencias || "Consulta las existencias en la tarjeta del producto."}`;
    }

    function procesarPregunta(pregunta) {
        const texto = pregunta.trim();
        if (!texto) return;
        agregarMensaje(texto, "usuario");
        entrada.value = "";
        const respuesta = responder(texto);
        agregarMensaje(respuesta, "bot");
        estado.textContent = "Respuesta basada en el catálogo de la sucursal seleccionada.";
        hablar(respuesta);
    }

    lanzador.addEventListener("click", abrir);
    panel.querySelector("[data-cerrar]").addEventListener("click", cerrar);
    panel.querySelector("form").addEventListener("submit", evento => {
        evento.preventDefault();
        procesarPregunta(entrada.value);
    });
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && panel.classList.contains("abierto")) cerrar();
    });
    botonVoz.addEventListener("click", () => {
        vozActivada = !vozActivada;
        botonVoz.textContent = vozActivada ? "🔊" : "🔇";
        botonVoz.setAttribute("aria-label", vozActivada ? "Silenciar respuesta de voz" : "Activar respuesta de voz");
        if (!vozActivada && "speechSynthesis" in window) window.speechSynthesis.cancel();
        estado.textContent = vozActivada ? "Las respuestas se leerán en voz alta." : "Respuestas de voz silenciadas.";
    });

    const ConstructorReconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!ConstructorReconocimiento) {
        micro.disabled = true;
        micro.title = "El reconocimiento de voz no está disponible en este navegador. Puedes escribir tu pregunta.";
        estado.textContent = "Escribe tu pregunta: el navegador no ofrece reconocimiento de voz.";
    } else {
        reconocimiento = new ConstructorReconocimiento();
        reconocimiento.lang = "es-GT";
        reconocimiento.continuous = false;
        reconocimiento.interimResults = false;
        reconocimiento.maxAlternatives = 1;

        reconocimiento.addEventListener("start", () => {
            micro.setAttribute("aria-pressed", "true");
            micro.setAttribute("aria-label", "Dejar de escuchar");
            estado.textContent = "Te escucho. Pregunta por un producto del catálogo.";
        });
        reconocimiento.addEventListener("end", () => {
            micro.setAttribute("aria-pressed", "false");
            micro.setAttribute("aria-label", "Hablar");
        });
        reconocimiento.addEventListener("result", evento => {
            const transcripcion = evento.results?.[0]?.[0]?.transcript || "";
            entrada.value = transcripcion;
            procesarPregunta(transcripcion);
        });
        reconocimiento.addEventListener("error", evento => {
            const mensajesError = {
                "not-allowed": "Permite el uso del micrófono en el navegador para hacer una pregunta por voz.",
                "service-not-allowed": "El navegador no permitió usar su servicio de reconocimiento de voz. Puedes escribir la pregunta.",
                "no-speech": "No alcancé a escuchar una pregunta. Toca el micrófono e inténtalo de nuevo.",
                "network": "No se pudo conectar con el servicio de voz del navegador. También puedes escribir tu pregunta."
            };
            estado.textContent = mensajesError[evento.error] || "No pude reconocer la voz. Puedes escribir tu pregunta.";
        });
        micro.addEventListener("click", () => {
            try {
                if (micro.getAttribute("aria-pressed") === "true") reconocimiento.stop();
                else reconocimiento.start();
            } catch (error) {
                estado.textContent = "No pude iniciar el micrófono. Revisa el permiso del navegador e inténtalo otra vez.";
            }
        });
    }
})();

