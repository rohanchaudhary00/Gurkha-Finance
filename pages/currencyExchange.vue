<template>
<div>
    <v-row>
        <v-col align="center">
            <v-card class="mt-10 pb-5" width="600" elevation="5">
                <v-card-title>Currency Converter</v-card-title>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-text-field v-model="amount" outlined dense :rules="[validRules.required]" type="number" label="Amount" placeholder="Enter Amount"></v-text-field>
                        <v-row>
                            <v-col>
                                <v-autocomplete v-model="fromCurrency" outlined dense :rules="[validRules.required]" :items="from" label="Euro"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete v-model="toCurrency" outlined dense :rules="[validRules.required]" :items="to" label="USD"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-btn dense class="mx-2" @click="reset">Reset</v-btn>
                <v-btn dense :loading="loading" @click="convert">Convert</v-btn>
                <p v-if="exchangedRate != ''" class="text-h5 mt-4">{{ exchangedRate }}</p>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        loading: false,
        from: ['USD', 'EUR', 'GBP'],
        to: ['EUR', 'USD', 'GBP'],
        amount: null,
        fromCurrency: '',
        toCurrency: '',
        exchangedRate: '',
        validRules: {
            required: value => !!value || "Required.",
        },
    }),
    methods: {
        reset() {
            this.$refs.form.reset()
        },
        convert() {
            if (this.$refs.form.validate()) {
                this.loading = true
                const url = `https://open.er-api.com/v6/latest/${this.fromCurrency}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log('data', data)
                        const rate = data.rates[this.toCurrency];
                        const convertedAmount = (this.amount * rate).toFixed(2);
                        this.exchangedRate = `${this.amount} ${this.fromCurrency} is equal to ${convertedAmount} ${this.toCurrency}`;

                        console.log('exchangedRate', this.exchangedRate)
                        this.loading = false
                    })
                    .catch(error => {
                        this.exchangedRate = 'Error fetching exchange rate data.';
                    });
            }
        }
    }
}
</script>
