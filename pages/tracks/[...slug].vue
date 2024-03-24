<script lang="ts" setup>
import type { Track, Meta, TrackResponse } from '~/models/track.model';

const { findOne } = useStrapi4();
const route = useRoute();

const { data: track, pending } = useAsyncData('track', () => findOne<{
    data: Track,
    meta: Meta
    }>(`tracks/${route.params.slug}`, {
        populate: '*'}
    )
);  
</script>

<template>
    <div class="slugcontainer">
        <h1 class="title">{{ track.data.title }}</h1>
        <p class="linear">by</p>
        <p class="artist">{{ track.data.artist }}</p>
        <p class="linear">the</p>
        <p class="date">{{ track.data.createthe }}</p>
    </div>
</template>

<style lang="scss" scoped>
.slugcontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15vh;
    text-transform: uppercase;
    align-items: flex-start;
    border: 1px solid #E6E6E6;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    transition: all 0.5s;

    .title, .artist, .date{
        padding: 0.5rem;
        transition: all 0.5s;
        width: 100%;

        &:hover {
            color: black;
            background-color: #E6E6E6;
        }
    }

    .linear {
        font-size: 0.8rem;
        padding: 0 10px;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
        width: stretch;
        transition: all 0.5s;
        
        &:hover {
            color: black;
            background-color: #E6E6E6;
            padding: 0 0 0 85%;
        }
    }

    .artist {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .date {
        font-size: 0.8rem;
        font-weight: 400;
    }
}
</style>