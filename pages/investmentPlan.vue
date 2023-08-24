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
        </v-col>
        <v-col align="cente">
            <v-card class="mt-5 pb-5" width="600" elevation="5">
                <v-card-title>Investment Plan Yearly Calculator</v-card-title>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <span>Plan:</span>
                        <v-select v-model="type" outlined dense class="mb-n3" :items="types" item-text="title" item-value="title" :rules="[validRules.required]" placeholder="Select a Plan">
                        </v-select>

                        <span>Enter Pounds:</span>
                        <v-text-field v-model="amount" outlined dense class="mb-n3" :rules="[validRules.required]" type="number" placeholder="Enter Pounds">
                        </v-text-field>

                        <span>Year:</span>
                        <v-select v-model="year" outlined dense class="mb-n3" :items="years" item-text="title" item-value="title" :rules="[validRules.required]" type="number" placeholder="Select Year">
                        </v-select>

                        <span>Predicted Return Per Year:</span>
                        <v-select v-model="perYearReturn" outlined dense class="mb-n3" :items="returns" item-text="title" item-value="title" :rules="[validRules.required]" type="number" placeholder="Select Predicted Return Per Year">
                        </v-select>

                        <span>Over all tax:</span>
                        <v-select v-model="tax" outlined dense class="mb-n3" :items="taxs" item-text="title" item-value="title" :rules="[validRules.required]" type="number" placeholder="Select Over all tax">
                        </v-select>

                        <span>RBXS Fee Per Month:</span>
                        <v-select v-model="rbxs" outlined dense class="mb-n3" :items="rbxsFees" item-text="title" item-value="title" :rules="[validRules.required]" type="number" placeholder="Select Fee Per Month">
                        </v-select>
                    </v-form>
                </v-card-text>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn dense class="mx-2" @click="reset">Reset</v-btn>
                    <v-btn dense :loading="loading" @click="calculate">Calculate</v-btn>
                    <v-spacer></v-spacer>
                </v-row>
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

        types: [
            { id: "1", title: "Basic Savings Plan" },
            { id: "2", title: "Savings Plan Plus" },
            { id: "3", title: "Managed Stock Investments" },
        ],
        years: [
            { id: "1", title: "1 Years" },
            { id: "2", title: "5 Years" },
            { id: "3", title: "10 Years" },
        ],
        returns: [
            { id: "1", title: "2.4%" },
            { id: "2", title: "5.5%" },
            { id: "3", title: "23%" },
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
        from: ["USD", "EUR", "GBP"],
        to: ["EUR", "USD", "GBP"],

        type: null,
        amount: null,
        year: null,
        perYearReturn: null,
        tax: null,
        rbxs: null,

        payableAmount: {
            return: null,
            tax: null,
            rbxs: null,
        },
        validRules: {
            required: (value) => !!value || "Required.",
        },
    }),
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        calculate() {
            if (this.$refs.form.validate()) {
                console.log("type:", this.type);
                console.log("amount:", this.amount);
                console.log("year:", this.year);
                console.log("perYearReturn:", this.perYearReturn);
                console.log("tax:", this.tax);
                console.log("rbxs:", this.rbxs);
            }
        },
    },
};
</script>
