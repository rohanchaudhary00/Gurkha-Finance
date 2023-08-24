<template>
<div>
    <v-row class="pa-5">
        <v-col cols="5">
            <v-card min-height="500" max-height="800">
                <v-card-text>
                    <h1 class="text-h2 mt-2"><b>Gurkha Finance</b></h1>
                    <h3 class="text-h5 mt-2"><b>provide best Finance Policy</b></h3>
                    <p class="text-h6 mt-2">Gurkha-Finances is a prominent financial organization that specializes in offering expert advice and services within the mortgage, savings, and investment sectors. Our comprehensive services include assessing clients' financial profiles, providing budgeting advice, debt consolidation solutions, and facilitating access to a range of savings and investment opportunities. With a focus on portfolio management, Gurkha-Finances caters to diverse financial needs. Our recent growth and increased demand reflect our commitment to excellence in the financial industry.</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="7">
            <v-carousel hide-delimiters>
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
            </v-carousel>
        </v-col>
    </v-row>
</div>
</template>

    
<script>
export default {
    data() {
        return {
            items: [{
                    src: 'https://www.inspiredlifehq.com/wp-content/uploads/2023/02/quotes-for-financial-freedom-11.jpg',
                },
                {
                    src: 'https://www.inspiredlifehq.com/wp-content/uploads/2023/02/quotes-for-financial-freedom-1.jpg',
                },
                {
                    src: 'https://www.inspiredlifehq.com/wp-content/uploads/2023/02/quotes-for-financial-freedom-6.jpg.webp',
                },
            ],
        }
    },
}
</script>
