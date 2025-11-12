// PRUEBA RÁPIDA: Copia y pega esto en la consola del navegador (F12) mientras estés en foro.html

// Mostrar todos los posts con sus respuestas
console.log("=== POSTS EN EL FORO ===");
const posts = JSON.parse(localStorage.getItem('foro_posts') || '[]');
posts.forEach((post, index) => {
    console.log(`\n📌 POST ${index + 1}: ${post.titulo}`);
    console.log(`   Autor: ${post.autor}`);
    console.log(`   Contenido: ${post.contenido.substring(0, 50)}...`);
    console.log(`   Fecha: ${new Date(post.fecha).toLocaleString('es-ES')}`);
    
    if (post.respuestas && post.respuestas.length > 0) {
        console.log(`   💬 ${post.respuestas.length} Respuesta(s):`);
        post.respuestas.forEach((resp, i) => {
            console.log(`      ${i + 1}. ${resp.autor}: "${resp.contenido.substring(0, 40)}..."`);
            console.log(`         ${new Date(resp.fecha).toLocaleString('es-ES')}`);
        });
    } else {
        console.log(`   (Sin respuestas aún)`);
    }
});

// Agregar un post de prueba
function agregarPostPrueba(titulo = "Test: Mi primer post", contenido = "Este es un post de prueba", autor = "Tester") {
    const posts = JSON.parse(localStorage.getItem('foro_posts') || '[]');
    const nuevoPost = {
        id: Date.now(),
        titulo: titulo,
        contenido: contenido,
        autor: autor,
        fecha: new Date(),
        respuestas: []
    };
    posts.unshift(nuevoPost);
    localStorage.setItem('foro_posts', JSON.stringify(posts));
    location.reload(); // Recarga la página para ver el nuevo post
    console.log("✓ Post agregado. La página se está recargando...");
}

// Agregar una respuesta de prueba
function agregarRespuestaPrueba(indexPost = 0, respuesta = "Mi respuesta", autor = "Respondedor") {
    const posts = JSON.parse(localStorage.getItem('foro_posts') || '[]');
    if (posts[indexPost]) {
        if (!posts[indexPost].respuestas) posts[indexPost].respuestas = [];
        posts[indexPost].respuestas.push({
            autor: autor,
            contenido: respuesta,
            fecha: new Date()
        });
        localStorage.setItem('foro_posts', JSON.stringify(posts));
        location.reload(); // Recarga la página para ver la nueva respuesta
        console.log("✓ Respuesta agregada. La página se está recargando...");
    } else {
        console.log("✗ Post no encontrado en índice", indexPost);
    }
}

// Limpiar todo y recargar posts de ejemplo
function limpiarYRecargarEjemplos() {
    localStorage.removeItem('foro_posts');
    location.reload();
    console.log("✓ localStorage limpiado. Se cargarán los posts de ejemplo.");
}

// Ver estadísticas del foro
function estadisticasForo() {
    const posts = JSON.parse(localStorage.getItem('foro_posts') || '[]');
    let totalRespuestas = 0;
    posts.forEach(post => {
        if (post.respuestas) totalRespuestas += post.respuestas.length;
    });
    
    console.log("\n=== ESTADÍSTICAS DEL FORO ===");
    console.log(`Total de posts: ${posts.length}`);
    console.log(`Total de respuestas: ${totalRespuestas}`);
    console.log(`Promedio de respuestas por post: ${(totalRespuestas / posts.length).toFixed(2)}`);
    
    const autores = new Set();
    posts.forEach(post => {
        autores.add(post.autor);
        post.respuestas?.forEach(resp => autores.add(resp.autor));
    });
    console.log(`Autores únicos: ${autores.size}`);
}

// COMANDOS DISPONIBLES:
console.log(`
╔════════════════════════════════════════════════════════════╗
║          COMANDOS DISPONIBLES EN LA CONSOLA               ║
╠════════════════════════════════════════════════════════════╣
║  1. Ver todos los posts y respuestas:                     ║
║     → Ya se mostró arriba                                 ║
║                                                            ║
║  2. Agregar un post de prueba:                            ║
║     → agregarPostPrueba("Mi título", "Mi contenido")      ║
║                                                            ║
║  3. Agregar una respuesta:                                ║
║     → agregarRespuestaPrueba(0, "Mi respuesta")           ║
║     (0 = índice del post, por defecto el primero)         ║
║                                                            ║
║  4. Ver estadísticas:                                     ║
║     → estadisticasForo()                                  ║
║                                                            ║
║  5. Limpiar todo y recargar ejemplos:                     ║
║     → limpiarYRecargarEjemplos()                          ║
║                                                            ║
║  💾 Todo se guarda en localStorage de tu navegador        ║
║  🔄 Los datos persisten entre recargas                    ║
╚════════════════════════════════════════════════════════════╝
`);

// Ejecutar automáticamente la primera vez
estadisticasForo();
