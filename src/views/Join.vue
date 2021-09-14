<template>
    <v-container fill-height class="join">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar color="#895EF7">
                        <v-toolbar-title color="primary" class="font-weight-bold white--text">Create an Account</v-toolbar-title><v-icon color="secondary">mdi-circle-medium</v-icon>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                prepend-icon="mdi-at"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                data-cy="joinEmailField"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock-outline"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                v-model="password"
                                :rules="passwordRules"
                                data-cy="joinPasswordField"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="accent"
                            :disabled="!valid"
                            @click="submit"
                            data-cy="joinSubmitBtn"
                            >Join</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Join',
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
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
};
</script>

<style scoped>
.join {
    background-image: url("https://brand.teamwork.com/images/logos/usage/the-teamwork-dot-background-sliced.svg");
    }
</style>