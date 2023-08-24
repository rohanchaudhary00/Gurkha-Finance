<template>
<div>
    <v-dialog v-model="login" max-width="400">
        <v-card>
            <v-col align="center">
                <!-- <v-img :src="require('~/assets/images/logo.png')" max-width="150"></v-img> -->

                <v-card-title>
                    Login
                    <!-- <v-btn-toggle v-model="selected" rounded class="mx-auto">
                        <v-btn :color="selected==0?'secondary':''" @click="selected=0">
                            <span :class="selected==0?'white--text':''">Login</span>
                        </v-btn>
                        <v-btn :color="selected==1?'secondary':''" @click="selected=1">
                            <span :class="selected==1?'white--text':''">Signup</span>
                        </v-btn>
                    </v-btn-toggle> -->
                </v-card-title>
                <v-card-text>
                    <v-form v-if="selected==1" v-model="valid" ref="form">
                        <v-text-field dense outlined label="Full Name"></v-text-field>
                        <v-text-field dense outlined label="Email"></v-text-field>
                        <v-text-field dense outlined label="Password"></v-text-field>
                        <v-btn color="secondary"><span class="white--text">Signup</span></v-btn>
                    </v-form>
                    <v-form v-else v-model="valid" ref="form">
                        <v-text-field dense outlined label="Email"></v-text-field>
                        <v-text-field dense outlined label="Password"></v-text-field>
                        <v-btn color="secondary"><span class="white--text">Login</span></v-btn><br>
                        <!-- <small>Forgot Password</small> -->

                    </v-form>
                    <!-- <V-btn color="#DB4437" class="mt-5 mb-2">
                        <v-icon small color="white">mdi-google</v-icon>
                        <span class="white--text">Continue With Google</span>
                    </V-btn>
                    <V-btn color="#4267B2">
                        <v-icon small color="white">mdi-facebook</v-icon>
                        <span class="white--text">Continue With Facebook</span>
                    </V-btn> -->
                </v-card-text>
            </v-col>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            selected: 0
        }
    },
    computed: {
        login: {
            get() {
                return this.$store.state.user.login
            },
            set(value) {
                return this.$store.commit('user/setLogin', value)
            }
        }

    }
}
</script>
