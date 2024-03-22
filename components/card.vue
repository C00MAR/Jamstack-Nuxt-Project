<script setup lang="ts">
defineProps({
    track: {
        type: Object as PropType<Track>,
        required: true
    }
});
</script>

<template>
    <div>
        <img :src="track.cover.url" alt="Cover"/>
        <div class="infopart">
            <div class="toppart">
                <div class="title">
                    <p class="tracktitle">{{ track.title }}</p>
                    <p class="by">_by_</p>
                    <p class="trackartist">{{ track.artist }}</p>
                </div>
                <p class="genre">{{ track.styles.map(style => style.name).join(', ') }}</p>
            </div>
            <a :href="`/tracks/${track.slug}`" >
                <p class="text">
                    Go to Track
                </p>
                <p class="arrow">
                >
                </p>
            </a>
        </div>
    </div>
</template>

<style lang="scss">
img{
    height: 100%;
}

.infopart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 55%;
    position: relative;

    .toppart {
        display: flex;
        padding: 0 5px;
        width: 100%;
        position: relative;

        .title {
            width: min-content;
            display: flex;
            gap: 0.5rem;
            align-items: flex-start;
            margin-top: 1vh;

            .trackartist, .tracktitle {
                writing-mode: vertical-rl;
            }

            .by {
                font-style: italic;
                font-size: 0.7rem;
            }
        }

        .genre {
            font-size: 1rem;
            position: absolute;
            right: 1vh;
            top: 1vh;
        }
    }

    a {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        padding: 1vh;
        background-color: #E6E6E6;
        color: black;
        transition: all 0.3s ease;
        border-top: 1px solid transparent;
        display: flex;
        gap: 1rem;
        transition: 0.3s all ease;

        p {
            transition: 0.3s all ease;
            margin-left: 0;
        }

        &:hover {
            .text {
                margin-left: 13vw;
            }

            border-top: 1px solid #E6E6E6;
            border-bottom-right-radius: 0.2rem;
            color: #E6E6E6;
            background-color: #0b0b0b;
        }
    }
}
</style>
