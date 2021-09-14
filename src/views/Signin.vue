<template>
        <v-container fill-height class="signin">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="#895EF7">
                            <v-toolbar-title color="primary" class="font-weight-bold white--text">Login</v-toolbar-title><v-icon color="secondary">mdi-circle-medium</v-icon>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                                <v-text-field
                                    prepend-icon="mdi-at"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                                    data-cy="signinEmailField"
                                >
                                </v-text-field>
                                <v-text-field
                                    prepend-icon="mdi-lock-outline"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    data-cy="signinPasswordField"
                                    v-model="password"
                                    :rules="passwordRules"
                                    required
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn outlined color="accent"><router-link to="/join">Create Account</router-link></v-btn>
                            <v-btn
                                color="accent"
                                :disabled="!valid"
                                @click="submit"
                                data-cy="signinBtn"
                                >Login</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
export default {
    name: 'Signin',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                 this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
};
</script>
<style>
    .signin {
    background-image: url("https://brand.teamwork.com/images/logos/usage/the-teamwork-dot-background-sliced.svg");
    }
</style>