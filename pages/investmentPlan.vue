<template>
<div>
    <v-row>
        <v-col cols="7">
            <v-card class="mt-5 pb-5 px-2">
                <h1>How to use Calculator ?</h1>
                <h4 class="mt-3">
                    1. First select plan and according to your selected plan predicted
                    return rate, tax, RBXS fee are choosen actomatically.
                </h4>
                <h4 class="mt-3">
                    2. Enter amount of money that you want to calculate (option1:
                    maximum 20,000), (option2: maximum 30,000), (option3: Unlimited)
                </h4>
                <h4 class="mt-3">3. Choose year.</h4>
                <h4 class="mt-3">
                    4. Click on calculate and it will shows: RBXS Fee, Tax, Profit,
                    Total Return.
                </h4>
                <h4 class="mt-3">5. Click on clear to remove all result.</h4>
            </v-card>

            <v-card class="mt-5">
                <v-row>
                    <v-col align="center">
                        <p v-if="predictedReturns !== null" class="mt-5"> <span>Predicted Returns: </span><span><b>{{ predictedReturns }}</b></span></p>
                        <p v-if="payableTax !== null" class="mt-n3"> <span>Over all tax: </span><span><b>{{ payableTax }}</b></span></p>
                        <p v-if="payableRBXS !== null" class="mt-n3"> <span>Over all RBXS Fee: </span><span><b>{{ payableRBXS }}</b></span></p>
                        <p v-if="predictedReturns !== null" class="mt-n3"> <span>Total Returns: </span><span><b>{{ returnAbleAmount }}</b></span></p>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col align="cente">
            <v-card class="mt-5 pb-5" width="600" elevation="5">
                <v-card-title>Investment Plan Yearly Calculator</v-card-title>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <span>Plan:</span>
                        <v-select v-model="type" outlined dense class="mb-n3" :items="types" item-text="title" item-value="title" :rules="[validRules.required]" placeholder="Select a Plan">
                        </v-select>

                        <span>Year:</span>
                        <v-select v-model="year" outlined dense class="mb-n3" :items="years" item-text="title" item-value="title" :rules="[validRules.required]" type="number" placeholder="Select Year">
                        </v-select>

                        <span>Enter Pounds:</span>
                        <v-text-field v-model="amount" outlined dense class="mb-n3" :rules="[validRules.required]" :error-messages="error_message" type="number" placeholder="Enter Pounds">
                        </v-text-field>

                        <span>Predicted Return Per Year:</span>
                        <v-select v-model="perYearReturn" outlined dense class="mb-n3" :items="returns" item-text="title" item-value="title" :disabled="disabledReturn" :rules="[validRules.required]" type="number" placeholder="Select Predicted Return Per Year">
                        </v-select>

                        <span>Over all tax:</span>
                        <v-select v-model="tax" outlined dense class="mb-n3" :items="taxs" item-text="title" item-value="title" :disabled="disabledTax" :rules="[validRules.required]" type="number" placeholder="Select Over all tax">
                        </v-select>

                        <span>RBXS Fee Per Month:</span>
                        <v-select v-model="rbxs" outlined dense class="mb-n3" :items="rbxsFees" item-text="title" item-value="title" :disabled="disabledRbxs" :rules="[validRules.required]" type="number" placeholder="Select Fee Per Month">
                        </v-select>
                    </v-form>
                </v-card-text>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn dense class="mx-2" @click="reset">Reset</v-btn>
                    <v-btn dense :loading="loading" @click="calculate">Calculate</v-btn>
                    <v-spacer></v-spacer>
                </v-row>
                <!-- <v-row>
                    <v-col align="center">
                        <p v-if="predictedReturns !== null" class="mt-5"> <span>Predicted Returns: </span><span><b>{{ predictedReturns }}</b></span></p>
                        <p v-if="payableTax !== null" class="mt-n3"> <span>Over all tax: </span><span><b>{{ payableTax }}</b></span></p>
                        <p v-if="payableRBXS !== null" class="mt-n3"> <span>Over all RBXS Fee: </span><span><b>{{ payableRBXS }}</b></span></p>
                        <p v-if="predictedReturns !== null" class="mt-n3"> <span>Total Returns: </span><span><b>{{ returnAbleAmount }}</b></span></p>
                    </v-col>
                </v-row> -->
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
        disabledReturn: false,
        disabledTax: false,
        disabledRbxs: false,

        types: [
            { id: "1", title: "Basic Savings Plan" },
            { id: "2", title: "Savings Plan Plus" },
            { id: "3", title: "Managed Stock Investments" },
        ],
        years: [
            { id: "1", title: "1 Year" },
            { id: "2", title: "5 Years" },
            { id: "3", title: "10 Years" },
        ],
        returns: [
            { id: "1", title: "1.2% to 2.4%" },
            { id: "2", title: "3% to 5.5%" },
            { id: "3", title: "4% to 23%" },
        ],
        taxs: [
            { id: "1", title: "0%" },
            { id: "2", title: "10% on profits above £12 000." },
            { id: "3", title: " 20% on profits above £40 000." },
        ],
        rbxsFees: [
            { id: "1", title: "0.25%" },
            { id: "2", title: "0.3%" },
            { id: "3", title: "1.3%" },
        ],

        type: null,
        amount: 0,
        year: null,
        perYearReturn: null,
        tax: null,
        rbxs: null,

        plan: null,
        convertedAmount: null,

        predictedReturns: null,
        payableTax: null,
        payableRBXS: null,
        returnAbleAmount: null,
        error_message: '',

        // payableAmount: {
        //     return: null,
        //     tax: null,
        //     rbxs: null,
        // },
        validRules: {
            required: (value) => !!value || "Required.",
        },
    }),
    watch: {
        type(newVal) {
            if (newVal) {
                console.log(newVal)
                this.plan = newVal
                this.error_message = ""
                this.amount = null
                if (newVal === "Basic Savings Plan") {
                    this.perYearReturn = this.returns[0].title;
                    this.tax = this.taxs[0].title;
                    this.rbxs = this.rbxsFees[0].title;
                } else if (newVal === "Savings Plan Plus") {
                    this.perYearReturn = this.returns[1].title;
                    this.tax = this.taxs[1].title;
                    this.rbxs = this.rbxsFees[1].title;
                } else if (newVal === "Managed Stock Investments") {
                    this.perYearReturn = this.returns[2].title;
                    this.tax = this.taxs[2].title;
                    this.rbxs = this.rbxsFees[2].title;
                }
                this.disabledReturn = true;
                this.disabledTax = true;
                this.disabledRbxs = true;
            }
        },
        amount(newVal) {
            if (newVal != null || newVal != 0) {
                if (this.plan === "Basic Savings Plan") {
                    this.error_message = ""
                    if (this.year === "1 Year") {
                        if (this.amount < 50 * 12) {
                            this.error_message = `Minimum Amount Should be ${50 * 12}`
                        } else if (this.amount > 20000) {
                            this.error_message = `Maximum Amount Should be ${20000}`
                        }
                    } else if (this.year === "5 Years") {
                        if (this.amount < 50 * 12 * 5) {
                            this.error_message = `Minimum Amount Should be ${50 * 12 * 5}`
                        } else if (this.amount > 20000) {
                            this.error_message = `Maximum Amount Should be ${20000}`
                        }
                    } else if (this.year === "10 Years") {
                        if (this.amount < 50 * 12 * 10) {
                            this.error_message = `Minimum Amount Should be ${50 * 12 * 10}`
                        } else if (this.amount > 20000 * 10) {
                            this.error_message = `Maximum Amount Should be ${20000 * 10}`
                        }
                    }
                }
                if (this.plan === "Savings Plan Plus") {
                    this.error_message = ""
                    if (this.year === "1 Year") {
                        if (this.amount < 50 * 12) {
                            this.error_message = `Minimum Amount Should be ${50 * 12}`
                        } else if (this.amount > 30000) {
                            this.error_message = `Maximum Amount Should be ${30000}`
                        }
                    } else if (this.year === "5 Years") {
                        if (this.amount < 50 * 12 * 5) {
                            this.error_message = `Minimum Amount Should be ${50 * 12 * 5}`
                        } else if (this.amount > 30000) {
                            this.error_message = `Maximum Amount Should be ${30000}`
                        }
                    } else if (this.year === "10 Years") {
                        if (this.amount < 50 * 12 * 10) {
                            this.error_message = `Minimum Amount Should be ${50 * 12 * 10}`
                        } else if (this.amount > 30000 * 10) {
                            this.error_message = `Maximum Amount Should be ${30000 * 10}`
                        }
                    }
                }
                if (this.plan === "Managed Stock Investments") {
                    this.error_message = ""
                    if (this.year === "1 Year") {
                        if (this.amount < 150 * 12) {
                            this.error_message = `Minimum Amount Should be ${150 * 12}`
                        }
                    } else if (this.year === "5 Years") {
                        if (this.amount < 150 * 12 * 5) {
                            this.error_message = `Minimum Amount Should be ${150 * 12 * 5}`
                        }
                    } else if (this.year === "10 Years") {
                        if (this.amount < 150 * 12 * 10) {
                            this.error_message = `Minimum Amount Should be ${150 * 12 * 10}`
                        }
                    }
                }
            }
        },
        year(newVal) {
            console.log(newVal)
            this.error_message = ""
            this.amount = null
        },

    },
    methods: {
        reset() {
            this.predictedReturns = null
            this.convertedAmount = null
            this.payableTax = null
            this.payableRBXS = null
            this.returnAbleAmount = null
            this.error_message = null
            this.$refs.form.reset();
            this.loading = false
        },
        calculate() {
            if (this.$refs.form.validate()) {
                this.loading = true
                console.log("type:", this.type);
                console.log("amount:", this.amount);
                console.log("year:", this.year);
                console.log("perYearReturn:", this.perYearReturn);
                console.log("tax:", this.tax);
                console.log("rbxs:", this.rbxs);
                const url = `https://open.er-api.com/v6/latest/GBP`;
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("data", data);
                        const rate = data.rates['GBP'];
                        this.convertedAmount = (this.amount * rate).toFixed(2);
                        let year = this.year
                        if (this.year === "1 Year") {
                            year = 1
                        } else if (this.year === "5 Years") {
                            year = 5
                        } else if (this.year === "10 Years") {
                            year = 10
                        }

                        let rbxs = this.rbxs

                        if (this.plan === "Basic Savings Plan") {
                            if (this.year === "1 Year") {
                                rbxs = parseFloat(0.25) * 12
                            } else if (this.year === "5 Years") {
                                rbxs = parseFloat(0.3) * 60
                            } else if (this.year === "10 Years") {
                                rbxs = parseFloat(1.3) * 120
                            }
                        } else if (this.plan === "Savings Plan Plus") {
                            if (this.year === "1 Year") {
                                rbxs = parseFloat(0.25) * 12
                            } else if (this.year === "5 Years") {
                                rbxs = parseFloat(0.3) * 60
                            } else if (this.year === "10 Years") {
                                rbxs = parseFloat(1.3) * 120
                            }
                        } else if (this.plan === "Managed Stock Investments") {
                            if (this.year === "1 Year") {
                                rbxs = parseFloat(0.25) * 12
                            } else if (this.year === "5 Years") {
                                rbxs = parseFloat(0.3) * 60
                            } else if (this.year === "10 Years") {
                                rbxs = parseFloat(1.3) * 120
                            }
                        }

                        // Option 1 – Basic Savings Plan
                        // Maximum investment per year: £20 000
                        // Minimum monthly investment: £50
                        // Minimum initial investment lump sum: N/A
                        // Predicted returns per year:
                        //  1.2% t♥o 2.4%.
                        // Estimated tax:
                        //  0%.
                        // RBSX group fees per month:
                        //  0.25%.
                        if (this.type === "Basic Savings Plan") {
                            console.log('type 1', )
                            this.predictedReturns = (((parseFloat(this.convertedAmount) * 2.4) / 100) * year).toFixed(2)
                            this.payableTax = ((parseFloat(this.predictedReturns) * 0) / 100).toFixed(2)
                            this.payableRBXS = ((parseFloat(this.predictedReturns) * (rbxs)) / 100).toFixed(2)
                            let totalAmount = parseFloat(this.predictedReturns) + parseFloat(this.convertedAmount)
                            console.log("totalAmount:", totalAmount);
                            let tax = parseFloat(this.payableTax) + parseFloat(this.payableRBXS)
                            console.log("tax:", tax);
                            console.log("taxtotalAmount:", totalAmount - tax);
                            this.returnAbleAmount = (parseFloat(totalAmount) - parseFloat(tax)).toFixed(2)
                            console.log('predictedReturns:', this.predictedReturns)
                            console.log('payableTax:', this.payableTax)
                            console.log('payableRBXS:', this.payableRBXS)
                        }
                        // Option 2 – Savings Plan Plus
                        // Maximum investment per year: £30 000
                        // Minimum monthly investment: £50
                        // Minimum initial investment lump sum: £300
                        // Predicted returns per year:
                        //  3% to 5.5%.
                        // Estimated tax:
                        //  10% on profits above £12 000.
                        // RBSX group fees per month:
                        //  0.3%.
                        else if (this.type === "Savings Plan Plus") {
                            console.log('plan 2')
                            this.predictedReturns = (((parseFloat(this.convertedAmount) * 5.5) / 100) * year).toFixed(2)
                            this.payableTax = ((parseFloat(this.predictedReturns) * 10) / 100).toFixed(2)
                            this.payableRBXS = ((parseFloat(this.predictedReturns) * (rbxs)) / 100).toFixed(2)
                            let totalAmount = parseFloat(this.predictedReturns) + parseFloat(this.convertedAmount)
                            console.log("totalAmount:", totalAmount);
                            let tax = parseFloat(this.payableTax) + parseFloat(this.payableRBXS)
                            console.log("tax:", tax);
                            console.log("taxtotalAmount:", totalAmount - tax);
                            this.returnAbleAmount = (parseFloat(totalAmount) - parseFloat(tax)).toFixed(2)
                            console.log('predictedReturns:', this.predictedReturns)
                            console.log('payableTax:', this.payableTax)
                            console.log('payableRBXS:', this.payableRBXS)
                            console.log('predictedReturns:', this.predictedReturns)
                            console.log('payableTax:', this.payableTax)
                            console.log('payableRBXS:', this.payableRBXS)
                        }
                        // Option 3 – Managed Stock
                        // Investments
                        // Maximum investment per year: Unlimited
                        // Minimum monthly investment: £150
                        // Minimum initial investment lump sum: £1000
                        // Predicted returns per year:
                        //  4% to 23%.
                        // Estimated tax:
                        //  10% on profits above £12 000
                        //  20% on profits above £40 000.
                        // RBSX group fees per month:
                        //  1.3%.
                        else if (this.type === "Managed Stock Investments") {
                            console.log('plan 3')
                            this.predictedReturns = (((parseFloat(this.convertedAmount) * 23) / 100) * year).toFixed(2)
                            if (this.convertedAmount > 12000 && this.convertedAmount < 40000) {
                                this.payableTax = ((parseFloat(this.predictedReturns) * 10) / 100).toFixed(2)
                            } else if (this.convertedAmount > 40000) {
                                this.payableTax = ((parseFloat(this.predictedReturns) * 20) / 100).toFixed(2)
                            }
                            this.payableRBXS = ((parseFloat(this.predictedReturns) * (rbxs)) / 100).toFixed(2)
                            let totalAmount = parseFloat(this.predictedReturns) + parseFloat(this.convertedAmount)
                            console.log("totalAmount:", totalAmount);
                            let tax = parseFloat(this.payableTax) + parseFloat(this.payableRBXS)
                            console.log("tax:", tax);
                            console.log("taxtotalAmount:", totalAmount - tax);
                            this.returnAbleAmount = (parseFloat(totalAmount) - parseFloat(tax)).toFixed(2)
                            console.log('predictedReturns:', this.predictedReturns)
                            console.log('payableTax:', this.payableTax)
                            console.log('payableRBXS:', this.payableRBXS)
                            console.log('predictedReturns:', this.predictedReturns)
                            console.log('payableTax:', this.payableTax)
                            console.log('payableRBXS:', this.payableRBXS)
                        }
                        this.loading = false
                    })
            }
        },
    },
};
</script>
