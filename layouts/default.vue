<template>
    <main role="main">
        <header>
            <nuxt-link to="/">Home</nuxt-link> |
            <nuxt-link to="/about">About</nuxt-link>
        </header>
        <slot />
        <footer>FOOTER</footer>
    </main>
</template>