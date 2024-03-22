<template>
    <main role="main">
        <header>
            <nuxt-link to="/"><img src="/public/logo_2.png" alt="" class="logo"></nuxt-link>
            <div class="link">
                <nuxt-link to="/">Home</nuxt-link>
                <nuxt-link to="/about">About</nuxt-link>
                <nuxt-link to="/product">Product</nuxt-link>
            </div>
            <div class="git">
                <a href="https://github.com/C00MAR/Jamstack-Strapi-Project" target="_blank">Back</a> / 
                <a href="https://github.com/C00MAR/Jamstack-Nuxt-Project" target="_blank">Front</a>
            </div>
        </header>
        <slot />
    </main>
</template>

<style lang="scss">
@import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: rgb(0, 0, 0);
    color: rgb(230, 230, 230);
    font-family: 'PP Neue Montreal', sans-serif;
}

h1 {
    font-size: 2.2rem;
    font-weight: 500;
    font-style: normal;
}

p {
    font-size: 1.4rem;
    font-weight: 400;
    font-style: normal;
}

.noise::before {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    content: '';
    opacity: 0.05;
    z-index: 1;
    pointer-events: none;
    background: url('/public/noise.gif');
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3vh 3vw;
    margin-bottom: 5vh;

    .logo {
        filter: invert(1);
        height: 13vh;
    }

    .link {
        display: flex;
        width: 5vw;
        flex-direction: column;
        align-items: flex-end;
    }

    .git {
        display: flex;
        width: 10vw;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
    }

    a {
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 2px;
        text-decoration: none;
        color: rgb(230, 230, 230);
        transition: all 0.25s ease;
        font-size: 1rem;
        
        &:hover {
            letter-spacing: 5px;
            font-size: 1.15rem;
        }
    }
}

main {
    position: relative;
    z-index: 2;
}
</style>
