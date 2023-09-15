<template>
<div>
    <v-app-bar color="secondary" app dense dark extended class="pt-2" extension-height="20">
        <v-img :src="require('~/assets/images/logo/gurkha.png')" max-width="70px" height="60px" background="secondary"></v-img>
        <span class="text-h2 link white--text" @click="$router.push({path: '/home'})"><b>Gurkha Finance</b></span>
        <v-spacer></v-spacer>
        <span class="menu-hover mx-2 link" :class="activeHome()" @click="$router.push({path: '/home'})">Home</span>
        <span class="menu-hover mx-2 link" :class="activeExchange()" @click="$router.push({path: '/currencyExchange'})">Currency Exchange</span>
        <span class="menu-hover mx-2 link" :class="activePlan()" @click="$router.push({path: '/investmentPlan'})">Investment</span>
        <span class="menu-hover mx-2 link" :class="activeTypes()" @click="$router.push({path: '/investmentTypes'})">Investment Types</span>
        <span class="menu-hover mx-2 link" :class="activeAbout()" @click="$router.push({path: '/about'})">About</span>

        <p class="text-right mt-4 ml-10">
            <span class="mx-2">Rohan Chaudhary</span> <br>
            <span class="mx-2">Admin</span>
        </p>
        <v-avatar class="profile-avatar link" size="60" @click="login = true">
        <v-img contain src="https://scontent.fktm16-1.fna.fbcdn.net/v/t39.30808-6/283905314_128176096525413_5124597618047793820_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=05bb41&_nc_ohc=iMky_R2FKvUAX_wn9TA&_nc_ht=scontent.fktm16-1.fna&oh=00_AfCHVeVTkqCR0RPkgB2x0okT-nlvcmryCmztPPIRq3nrCg&oe=650830A8"></v-img>
        </v-avatar>
    </v-app-bar>
    <v-dialog v-model="login" max-width="400">
        <v-card>
            <v-col align="center">
                <!-- <v-img :src="require('~/assets/images/logo.png')" max-width="150"></v-img> -->

                <v-card-title class="text-center">
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
            login: false,
            valid: true,
            selected: 0
        }
    },
    methods: {
        activeHome() {
            if (this.$route.name == 'home') {
                return 'menu-active'
            }
        },
        activeExchange() {
            if (this.$route.name == 'currencyExchange') {
                return 'menu-active'
            }
        },
        activePlan() {
            if (this.$route.name == 'investmentPlan') {
                return 'menu-active'
            }
        },
        activeAbout() {
            if (this.$route.name == 'about') {
                return 'menu-active'
            }
        },
        activeTypes() {
            if (this.$route.name == 'investmentTypes') {
                return 'menu-active'
            }
        }
    }
}
</script>

<style>
.profile-avatar {
    border: 2px solid white;
}

.menu-active {
    padding: 5px 15px;
    border-radius: 4px;
    border: 1px solid white;
    background-color: #2196F3 !important;
    color: white !important;
    transition: 0.5s;
}

.menu-hover:hover {
    padding: 5px 15px;
    border-radius: 4px;
    border: 1px solid white;
    background-color: #2196F3 !important;
    color: white !important;
    transition: 0.5s;
}
</style>
