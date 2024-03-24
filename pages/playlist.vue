<script setup lang="ts">
const { find } = useStrapi();

const { data: playlists, pending: playlistsPending, error: playlistsError } = await useAsyncData('playlists', async () => {
    return await find<PlaylistsResponse>('playlists', {
        populate: '*',
    }).then(res => res.data);
});

</script>

<template>
    <div class="playlistcontainer">
        <div class="playlisttop">
            <h1>Playlist :</h1>
            <nuxt-link to="/create-playlist">Create Playlist +</nuxt-link>
        </div>

        <div v-if="playlistsPending">Chargement des pistes...</div>
        <div v-else-if="playlistsError">Une erreur s'est produite : {{ error }}</div>
        <div v-else v-for="playlist in playlists" :key="playlists.id" class="playlistcard">
            <p class="title">{{ playlist.title }}</p>
            <p class="nb">Number of song : {{ playlist.tracks.length }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.playlistcontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 93vw;
    margin: auto;

    .playlisttop {
        display: flex;
        justify-content: space-between;
        width: 100%;
        text-transform: uppercase;

        a {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 1px solid #E6E6E6;
            transition: all 0.3s ease;

            &:hover {
                background-color: #E6E6E6;
                color: black;
            }
        }
    }

    .playlistcard {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 15px;
        border: 1px solid #E6E6E6;
        margin-top: 10px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #E6E6E6;
            color: black;
        }

        .title {
            font-size: 1.5rem;
            font-weight: 500;
        }

        .nb {
            font-size: 1rem;
            font-weight: 400;
        }
    }
}
</style>