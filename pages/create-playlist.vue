<template>
    <div>
        <h1>Créer une nouvelle playlist</h1>
        <form @submit.prevent="submitForm">
            <input v-model="playlistName" type="text" placeholder="Nom de la playlist" required>
            <button type="submit">Créer la Playlist</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const playlistName = ref('');

const submitForm = async () => {
    const playlistData = {
        name: playlistName.value,
        // Vous pouvez ajouter d'autres champs selon le modèle de votre playlist
    };

    try {
        const response = await fetch('http://votre-domaine-strapi/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Ajoutez votre token d'authentification si nécessaire
        },
        body: JSON.stringify(playlistData),
        });

        if (!response.ok) {
        throw new Error('Une erreur s\'est produite lors de la création de la playlist');
        }

        const data = await response.json();
        console.log('Playlist créée avec succès:', data);
        // Rediriger l'utilisateur ou afficher un message de succès
    } catch (error) {
        console.error('Erreur lors de la création de la playlist:', error);
        // Gérer l'erreur, par exemple, en affichant un message à l'utilisateur
    }
};

</script>

<style scoped>
/* Styles du formulaire */
</style>
