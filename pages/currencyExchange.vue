<template>
<div>
    <v-row>
        <v-col align="center">
            <v-card class="mt-10 pb-5" width="600" elevation="5">
                <v-card-title>Currency Converter</v-card-title>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-text-field v-model="amount" outlined dense :rules="[validRules.required]" type="number" label="Amount" :error-messages="error_message" placeholder="Enter Amount"></v-text-field>
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
                <p v-if="exchangedRate !== null" class="mt-5"> <span>Exchanged Currency: </span><span><b>{{ exchangedRate }}</b></span></p>
                <p v-if="payableFee !== null" class="mt-n3"> <span>Exchanged Currency Fees: </span><span><b>{{ payableFee }}</b></span></p>
                <p v-if="totalPayableAmount !== null" class="mt-n3"> <span>Total payable: </span><span><b>{{ totalPayableAmount }}</b></span></p>
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

        from: ["GBP", "USD", "EUR", "BRL", "JPY", "TRY"],
        to: ["GBP", "USD", "EUR", "BRL", "JPY", "TRY"],

        amount: 0,
        error_message: '',
        feeCharge: null,
        fromCurrency: "",
        toCurrency: "",
        exchangedRate: null,
        payableFee: null,
        totalPayableAmount: null,
        validRules: {
            required: (value) => !!value || "Required.",
        },
    }),
    watch: {
        amount(newVal, oldVal) {
            if (newVal > 300 && newVal < 5000) {
                this.error_message = ''
                if (newVal <= 500) {
                    this.feeCharge = 3.5
                    // console.log('upto500', newVal)
                } else if (newVal > 500 && newVal <= 1500) {
                    this.feeCharge = 2.7
                    // console.log('over 500')
                } else if (newVal > 1500 && newVal <= 2500) {
                    this.feeCharge = 2
                    // console.log('over 1500')
                } else if (newVal > 2500) {
                    this.feeCharge = 1.5
                    // console.log('over 2500')
                }
            } else if (newVal < 300 && newVal < 5000) {
                // console.log('Minimum', newVal)
                this.error_message = 'Minimum Amount Should be 300'
            } else if (newVal > 5000) {
                // console.log('Maximum', newVal)
                this.error_message = 'Maximum Amount Should be 5000'
            }
        }
    },
    mounted() {
        this.fromCurrency = this.from[0];
        this.toCurrency = this.to[0];
    },
    methods: {
        reset() {
            this.$refs.form.reset();
            this.loading = false
            this.amount = 0
            this.exchangedRate = null
            this.payableFee = null
            this.totalPayableAmount = null
        },
        convert() {
            if (this.$refs.form.validate()) {
                if (this.error_message !== 'Minimum Amount Should be 300') {
                    if (this.error_message !== 'Maximum Amount Should be 5000') {
                        this.loading = true;
                        let feeCharge = (parseFloat(this.amount) * parseFloat(this.feeCharge)) / 100
                        // console.log('this.feeCharge', feeCharge)
                        const url = `https://open.er-api.com/v6/latest/${this.fromCurrency}`;
                        fetch(url)
                            .then((response) => response.json())
                            .then((data) => {
                                // console.log("data", data);
                                const rate = data.rates[this.toCurrency];
                                const convertedAmount = (this.amount * rate).toFixed(2);
                                this.exchangedRate = `${this.amount} ${this.fromCurrency} is equal to ${convertedAmount} ${this.toCurrency}`;
                                this.payableFee = feeCharge.toFixed(2)
                                this.totalPayableAmount = parseFloat(this.payableFee) + parseFloat(convertedAmount)
                                // console.log("exchangedRate", this.exchangedRate);
                                // console.log("payableFee", this.payableFee);
                                // console.log("totalPayableAmount", this.totalPayableAmount);
                                this.loading = false;
                            })
                            .catch((error) => {
                                this.exchangedRate = "Error fetching exchange rate data.";
                            });
                    }
                }
            }
        },
    },
};
</script>
