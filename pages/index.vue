<script setup lang="ts">
import type { StylesResponse } from "~/models/style.model";

const { find } = useStrapi();
const filters = ref<String[]>([]);
const searchQuery = ref('');
const page = ref(1);
const pageSize = ref(2);

const { data: styles, pending: stylesPending, error: stylesError } = await useAsyncData('styles', async () => {
    return await find<StylesResponse>('styles', {
        populate: '*',
    }).then(res => res.data);
});

const { data: tracks, pending: tracksPending, error: tracksError, refresh: tracksRefresh } = useAsyncData('tracks', () => find<{
        data: Track[],
        meta: Meta
    }>('tracks', {
        populate: '*',
        pagination: { 
            page: page.value, 
            pageSize: pageSize.value 
        },
        filters: {
            styles: {
                name: {
                    $in: filters.value
                }
            }
        }
    }), {
        watch: [page, filters],
    }
)

const addFilter = (filter: string) => {
    if (!filters.value.includes(filter)) {
        filters.value.push(filter)
    } else {
        filters.value = filters.value.filter((f) => f !== filter)
    }

    tracksRefresh()
}

const filteredTracks = computed(() => {
    let tracksFiltered = tracks.value.data;

    if (filters.value.length) {
        tracksFiltered = tracksFiltered.filter((track) => {
            return track?.styles?.some((style) => filters.value.includes(style.name));
        });
    }

    if (searchQuery.value) {
        const lowerSearchQuery = searchQuery.value.toLowerCase();
        tracksFiltered = tracksFiltered.filter((track) => {
            return (
                track.title.toLowerCase().includes(lowerSearchQuery) ||
                track.artist.toLowerCase().includes(lowerSearchQuery)
            );
        });
    }

    return tracksFiltered;
});
</script>

<template>
    <div class="container">
        <div class="filter">
            <input type="text" v-model="searchQuery" placeholder="Filter tracks by title or track...">

            <div class="stylecontainer">
                <div class="loading" v-if="stylesPending">Loading Styles...</div>
                <div class="error" v-else-if="stylesError">Error: {{ stylesError.message }}</div>
                <div class="style" v-else>
                    <button v-for="style in styles" :key="style.slug"
                        :class="filters.includes(style.name) ? 'active' : 'desactive'"
                        @click="addFilter(style.name)">
                        {{ style.name }}
                    </button>
                </div>
            </div>
        </div>

        <div class="trackcontainer">
            <div class="loading" v-if="tracksPending">Loading Tracks...</div>
            <div class="error" v-else-if="tracksError">Error: {{ tracksError.message }}</div>
            <div class="track" v-else>
                <card
                    v-for="track in filteredTracks" 
                    :key="track.id"
                    :track="track"
                    class="cardtrack"
                />
            </div>
        </div>

        <UPagination
            v-if="tracks?.meta && tracks?.meta.pagination.pageCount > 1"
            v-model="page"
            class="pagination"
            :page-count="tracks?.meta.pagination.pageSize"
            :total="tracks?.meta.pagination.total"
        />
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 3vw;

    .filter {
        display: flex;
        gap: 2rem;
        justify-content: space-between;

        input {
            padding: 2vh 16vw 2vh 2vw;
            border-radius: 0.2rem;
            width: -webkit-fill-available;
        }

        .stylecontainer {
            display: flex;
            gap: 1rem;
            width: fit-content;

            .style {
                display: flex;
                width: 100%;
                gap: 1rem;
                justify-content: space-around;
                flex-direction: row;

                button {
                    width: 100%;
                    padding: 1vh 2vw;
                    border-radius: 0.2rem;
                    background-color: #f0f0f0;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &.active {
                        border: 1px solid #E6E6E6;
                        background-color: transparent;
                        color: #E6E6E6;
                    }

                    &.desactive {
                        background-color: #E6E6E6;
                        color: #000000;
                    }

                    &:hover {
                        letter-spacing: 3px;
                    }
                }
            }
        }
    }

    .trackcontainer {
        margin-top: 5vh;

        .track {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            align-items: center;
            justify-content: space-between;

            .cardtrack {
                border: 1px solid #E6E6E6;
                width: 49%;
                height: 50vh;
                border-radius: 0.2rem;
                display: flex;
            }
        }
    }

    .pagination {
        justify-content: center;
        filter: saturate(0)
    }
}
</style>