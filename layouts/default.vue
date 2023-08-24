<template>
<v-app dark>
    <sectionLayoutAppbar />
    <v-main>
        <v-container fluid>
            <Nuxt />
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
}
</script>

<style>
@import "~/assets/styles/general.css";
@import "~/assets/styles/main.css";
</style>
