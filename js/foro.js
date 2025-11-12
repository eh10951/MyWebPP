// Foro Funcional - Gestión de Posts con localStorage

class ForoManager {
    constructor() {
        this.postsKey = 'foro_posts';
        this.form = document.getElementById('nuevo-post-form');
        this.listaPostsContainer = document.getElementById('lista-posts');
        
        this.init();
    }

    init() {
        // Cargar posts al iniciar
        this.cargarPosts();
        
        // Escuchar envío del formulario
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.manejarSubmit(e));
        }

        // Mensaje inicial si no hay posts
        if (this.obtenerPosts().length === 0) {
            this.mostrarMensajeVacio();
        }
    }

    // Obtener posts del localStorage
    obtenerPosts() {
        const posts = localStorage.getItem(this.postsKey);
        return posts ? JSON.parse(posts) : [];
    }

    // Guardar posts en localStorage
    guardarPosts(posts) {
        localStorage.setItem(this.postsKey, JSON.stringify(posts));
    }

    // Manejar envío del formulario
    manejarSubmit(e) {
        e.preventDefault();

        const titulo = document.getElementById('post-titulo').value.trim();
        const contenido = document.getElementById('post-contenido').value.trim();
        let autor = document.getElementById('post-autor').value.trim();

        // Validar campos
        if (!titulo || !contenido) {
            alert('Por favor completa el título y el mensaje.');
            return;
        }

        // Si no hay autor, asignar "Anónimo"
        if (!autor) {
            autor = 'Anónimo';
        }

        // Crear nuevo post
        const nuevoPost = {
            id: Date.now(),
            titulo: titulo,
            contenido: contenido,
            autor: autor,
            fecha: new Date(),
            respuestas: []
        };

        // Agregar el nuevo post al inicio
        const posts = this.obtenerPosts();
        posts.unshift(nuevoPost);
        this.guardarPosts(posts);

        // Limpiar formulario
        this.form.reset();

        // Recargar la lista de posts
        this.cargarPosts();

        // Mostrar notificación
        this.mostrarNotificacion('¡Tema publicado exitosamente!');
    }

    // Cargar y mostrar posts
    cargarPosts() {
        const posts = this.obtenerPosts();
        
        // Limpiar contenedor
        this.listaPostsContainer.innerHTML = '';

        if (posts.length === 0) {
            this.mostrarMensajeVacio();
            return;
        }

        // Renderizar cada post
        posts.forEach(post => {
            const postElement = this.crearElementoPost(post);
            this.listaPostsContainer.appendChild(postElement);
        });
    }

    // Crear elemento HTML para un post
    crearElementoPost(post) {
        const div = document.createElement('div');
        div.className = 'post';
        div.id = `post-${post.id}`;

        const fechaFormato = this.formatearFecha(new Date(post.fecha));

        div.innerHTML = `
            <div class="post-header">
                <h3 class="post-titulo">${this.escaparHTML(post.titulo)}</h3>
                <p class="post-meta">
                    Publicado por <span class="post-autor">${this.escaparHTML(post.autor)}</span> - 
                    <span class="post-fecha">${fechaFormato}</span>
                </p>
            </div>
            <div class="post-body">
                <p>${this.escaparHTML(post.contenido).replace(/\n/g, '<br>')}</p>
                ${post.respuestas && post.respuestas.length > 0 ? this.renderizarRespuestas(post.respuestas) : ''}
            </div>
            <div class="post-footer">
                <button class="responder-btn" onclick="foroManager.mostrarFormularioRespuesta(${post.id})">
                    <i class="fas fa-reply"></i> Responder
                </button>
                <button class="eliminar-btn" onclick="foroManager.eliminarPost(${post.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
                <div id="formulario-respuesta-${post.id}" class="formulario-respuesta"></div>
            </div>
        `;

        return div;
    }

    // Renderizar respuestas de un post
    renderizarRespuestas(respuestas) {
        let html = '<div class="respuestas-container">';
        
        respuestas.forEach(resp => {
            const fechaFormato = this.formatearFecha(new Date(resp.fecha));
            html += `
                <div class="respuesta">
                    <p class="respuesta-meta">
                        <span class="respuesta-autor">${this.escaparHTML(resp.autor)}</span> - 
                        <span class="respuesta-fecha">${fechaFormato}</span>
                    </p>
                    <p class="respuesta-contenido">${this.escaparHTML(resp.contenido).replace(/\n/g, '<br>')}</p>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Mostrar formulario para responder
    mostrarFormularioRespuesta(postId) {
        const formularioContainer = document.getElementById(`formulario-respuesta-${postId}`);
        
        // Si ya existe, ocultarlo
        if (formularioContainer.innerHTML !== '') {
            formularioContainer.innerHTML = '';
            return;
        }

        formularioContainer.innerHTML = `
            <div class="respuesta-form">
                <input type="text" placeholder="Tu nombre (opcional)" id="nombre-respuesta-${postId}" maxlength="50">
                <textarea placeholder="Tu respuesta..." id="contenido-respuesta-${postId}" rows="3"></textarea>
                <div class="respuesta-buttons">
                    <button class="btn-enviar-respuesta" onclick="foroManager.enviarRespuesta(${postId})">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                    <button class="btn-cancelar-respuesta" onclick="foroManager.mostrarFormularioRespuesta(${postId})">
                        Cancelar
                    </button>
                </div>
            </div>
        `;
    }

    // Enviar respuesta
    enviarRespuesta(postId) {
        const nombreInput = document.getElementById(`nombre-respuesta-${postId}`);
        const contenidoInput = document.getElementById(`contenido-respuesta-${postId}`);

        let nombre = nombreInput ? nombreInput.value.trim() : '';
        const contenido = contenidoInput ? contenidoInput.value.trim() : '';

        if (!contenido) {
            alert('Por favor escribe una respuesta.');
            return;
        }

        if (!nombre) {
            nombre = 'Anónimo';
        }

        // Obtener posts y encontrar el específico
        const posts = this.obtenerPosts();
        const post = posts.find(p => p.id === postId);

        if (post) {
            // Inicializar array de respuestas si no existe
            if (!post.respuestas) {
                post.respuestas = [];
            }

            // Agregar nueva respuesta
            post.respuestas.push({
                autor: nombre,
                contenido: contenido,
                fecha: new Date()
            });

            // Guardar cambios
            this.guardarPosts(posts);

            // Recargar posts
            this.cargarPosts();

            this.mostrarNotificacion('¡Respuesta agregada!');
        }
    }

    // Eliminar post
    eliminarPost(postId) {
        if (confirm('¿Estás seguro de que deseas eliminar este tema?')) {
            let posts = this.obtenerPosts();
            posts = posts.filter(p => p.id !== postId);
            this.guardarPosts(posts);
            this.cargarPosts();
            this.mostrarNotificacion('Tema eliminado.');
        }
    }

    // Mostrar mensaje cuando no hay posts
    mostrarMensajeVacio() {
        const div = document.createElement('div');
        div.className = 'mensaje-vacio';
        div.innerHTML = `
            <i class="fas fa-inbox"></i>
            <p>No hay discusiones aún. ¡Sé el primero en iniciar una!</p>
        `;
        this.listaPostsContainer.appendChild(div);
    }

    // Mostrar notificación temporal
    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.className = 'notificacion';
        notif.textContent = mensaje;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.classList.add('mostrar');
        }, 10);

        setTimeout(() => {
            notif.classList.remove('mostrar');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // Formatear fecha en formato relativo
    formatearFecha(fecha) {
        const ahora = new Date();
        const diferencia = ahora - fecha;

        const segundos = Math.floor(diferencia / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (segundos < 60) return 'hace unos segundos';
        if (minutos < 60) return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        if (horas < 24) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
        if (dias < 7) return `hace ${dias} día${dias > 1 ? 's' : ''}`;
        
        return fecha.toLocaleDateString('es-ES');
    }

    // Escapar HTML para evitar XSS
    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}

// Inicializar el foro cuando el DOM esté listo
let foroManager;
document.addEventListener('DOMContentLoaded', function() {
    foroManager = new ForoManager();
});
