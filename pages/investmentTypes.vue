<template>
<div>
    <h1 class="text-center">Types Of Investment Available In Gurkha Finance</h1>
    <v-row justify="center">
        <v-col align="center">
            <v-card flat class="mt-5" max-width="1200px">
                <v-data-table :headers="headers" :items="desserts" hide-default-footer class="elevation-5">
                    <template v-slot:item.info="{ item }">
                        <p v-if="item.id == '1'">
                            Maximum investment per year: £20 000 <br>
                            Minimum monthly investment: £50<br>
                            Minimum initial investment lump sum: N/A<br>
                            Predicted returns per year:<br>
                            • 1.2% to 2.4%.<br>
                            Estimated tax:<br>
                            • 0%.<br>
                            RBSX group fees per month:<br>
                            • 0.25%.<br>
                        </p>
                        <p v-if="item.id == '2'">
                            Maximum investment per year: £30 000<br>
                            Minimum monthly investment: £50<br>
                            Minimum initial investment lump sum: £300<br>
                            Predicted returns per year:<br>
                            • 3% to 5.5%.<br>
                            Estimated tax:<br>
                            • 10% on profits above £12 000.<br>
                            RBSX group fees per month:<br>
                            • 0.3%.<br>
                        </p>
                        <p v-if="item.id == '3'">
                            Maximum investment per year: Unlimited<br>
                            Minimum monthly investment: £150<br>
                            Minimum initial investment lump sum: £1000<br>
                            Predicted returns per year:<br>
                            • 4% to 23%.<br>
                            Estimated tax:<br>
                            • 10% on profits above £12 000<br>
                            • 20% on profits above £40 000.<br>
                            RBSX group fees per month:<br>
                            • 1.3%.<br>
                        </p>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            headers: [{
                    text: 'SN',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'Types Of Investment',
                    align: 'start',
                    sortable: false,
                    value: 'types'
                },
                {
                    text: 'Information',
                    align: 'start',
                    sortable: false,
                    value: 'info'
                },
            ],
            desserts: [{
                    id: '1',
                    types: 'Basic Savings Plan',
                    info: '',
                },
                {
                    id: '2',
                    types: 'Savings Plan Plus',
                    info: '',
                },
                {
                    id: '3',
                    types: 'Managed Stock Investments',
                    info: '',
                },
            ],
        }
    },
}
</script>
