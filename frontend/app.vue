<script lang="ts" setup>
import { initAlreadyVoted } from '~/helpers/initAlreadyVoted'

initAlreadyVoted()
</script>

<template>
  <div>
    <header>
      <h1>Lounasäänestyssysteemi</h1>
      <a href="#tulokset">Tulokset</a>
    </header>
    <main>
      <RestaurantsContainer />
      <ResultsContainer />
    </main>
  </div>
</template>

<style>
@font-face {
  font-family: 'GlassTTY';
  src: url('/assets/Glass_TTY_VT220.ttf')  format('truetype');
}

body {
  background-color: black;
  color: white;
  font-family: 'GlassTTY', serif;
}

header {
  margin: 1em;
}

header a {
  color: beige;
}

main {
  display: flex;
  align-content: stretch;
  flex-direction: column;
}

main > * {
  margin: 1em;
  flex: 1;
}

@media only screen and (min-width: 768px) {
  main {
    display: flex;
    align-content: stretch;
    flex-direction: row;
  }

  header a {
    display: none;
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
