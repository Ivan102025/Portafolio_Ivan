const USERNAME = "Ivan102025"; 

async function inicializarPortafolio() {
    try {
        const [resUser, resRepos, resFollowers] = await Promise.all([
            fetch(`https://api.github.com/users/${USERNAME}`),
            fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10&type=owner&direction=desc`),
            fetch(`https://api.github.com/users/${USERNAME}/followers?per_page=20`)
        ]);

        const perfil = await resUser.json();
        const repos = await resRepos.json();
        const seguidores = await resFollowers.json();

        const header = document.getElementById('perfil-header');
        header.innerHTML = `
            <img src="${perfil.avatar_url}" alt="Avatar de ${perfil.name}" class="avatar">
            <h1>Ivan Bautista Martinez</h1>
            <p class="bio">Alumno de la UTHH</p>
            <span class="location">Huejutla de Reyes, Hidalgo</span>
        `;

        const reposContainer = document.getElementById('repos-container');
        reposContainer.innerHTML = repos.map(repo => {

            const livePagesUrl = `https://${USERNAME}.github.io/${repo.name}/`;
            
            return `
                <div class="repo-card">
                    <div class="repo-info">
                        <h4>${repo.name}</h4>
                        <p>${repo.description || "Practica disponible"}</p>
                    </div>
                    <a href="${livePagesUrl}" target="_blank" class="btn-link">Ver página</a>
                </div>
            `;
        }).join('');

        const followersContainer = document.getElementById('followers-container');
        if (seguidores.length > 0) {
            followersContainer.innerHTML = seguidores.map(follower => `
                <a href="${follower.html_url}" target="_blank">
                    <img src="${follower.avatar_url}" title="${follower.login}" alt="${follower.login}" class="follower-avatar">
                </a>
            `).join('');
        } else {
            followersContainer.innerHTML = "<p style='color: #8b949e;'>Esperando nuevos seguidores en GitHub...</p>";
        }

    } catch (error) {
        console.error("Error al conectar con la API de GitHub:", error);
        document.getElementById('perfil-header').innerHTML = "<p>Error al cargar los datos. Por favor, intenta más tarde.</p>";
    }
}

inicializarPortafolio();
