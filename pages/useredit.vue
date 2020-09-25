<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <p class="care subheading">UPDATE YOUR INFO</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="userEdit" class="mt-3 was-validated">
            <b-form-group
              label-for="nameInput"
              label="Name:"
              description="Please insert your real name"
            >
              <b-form-input
                id="nameInput"
                v-model="formName"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="surnameInput"
              label="Surname:"
              description="Please insert your real surname"
            >
              <b-form-input
                id="surnameInput"
                v-model="formSurname"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="emailInput"
              label="Email:"
              description="Please insert your current account email"
            >
              <b-form-input
                id="emailInput"
                v-model="formEmail"
                size="sm"
                autocomplete="email"
                type="email"
                placeholder="Your email"
                class="form-control"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="newEmailInput"
              label="New Email:"
              description="Please insert in case a new email: 
              this will be your new login account!"
            >
              <b-form-input
                id="newEmailInput"
                v-model="formNewEmail"
                size="sm"
                type="email"
                placeholder="Your email"
                class="form-control"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="currentPasswordInput"
              label="Current Password:"
              description="Please insert your current password or passphrase"
            >
              <b-form-input
                id="currentPasswordInput"
                v-model="formCurrentPassword"
                size="sm"
                type="password"
                required
                autocomplete="current-password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="newPasswordInput"
              label="New Password:"
              description="In case, please insert your new password or passphrase"
            >
              <b-form-input
                id="newPasswordInput"
                v-model="formNewPassword"
                size="sm"
                type="password"
                autocomplete="current-password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="imageInput"
              label="Image:"
              description="Please choose an image for your account"
            >
              <b-form-file
                id="imageInput"
                v-model="formImageFilename"
                ref="formImageFile"
                size="sm"
                accept="image/*"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label-for="nicknameInput"
              label="Nickname:"
              description="Please insert your nickname if you have one"
            >
              <b-form-input
                id="nicknameInput"
                v-model="formNickname"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="sexInput"
              label="Sexual Identity:"
              description="Please insert your sex according to your current personal identity"
            >
              <b-form-select
                id="sexidentityInput"
                v-model="formSexidentity"
                size="sm"
                required
              >
                <b-form-select-option v-html="$t('login.female')" value="F">
                  F - Female
                </b-form-select-option>
                <b-form-select-option v-html="$t('login.male')" value="M">
                  M - Male
                </b-form-select-option>
                <b-form-select-option v-html="$t('login.intersex')" value="X">
                  X - Intersex
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label-for="sexInput"
              label="Biological Sex at Birth:"
              description="Please insert your biological sex at birth"
            >
              <b-form-select
                id="birthsexInput"
                v-model="formBirthsex"
                size="sm"
                required
              >
                <b-form-select-option v-html="$t('login.female')" value="F">
                  F - Female
                </b-form-select-option>
                <b-form-select-option v-html="$t('login.male')" value="M">
                  M - Male
                </b-form-select-option>
                <b-form-select-option v-html="$t('login.intersex')" value="X">
                  X - Intersex
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label-for="birthdateInput"
              label="Birthdate:"
              description="Please insert your birthdate"
            >
              <b-form-input
                id="brithdateInput"
                v-model="formBirthdate"
                size="sm"
                type="datetime-local"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="birthcountryInput"
              label="Country of birth:"
              description="Insert the country of birth"
            >
              <b-form-select
                id="birthcountryInput"
                v-model="formBirthcountry"
                required
              >
                <option
                  v-for="country in country"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label-for="birthplaceInput"
              label="Birthplace:"
              description="Insert the city or location of your birth"
            >
              <b-form-select
                id="birthplaceInput"
                v-model="formBirthplace"
                required
              >
                <option
                  v-for="place in place"
                  :key="place.id"
                  :value="place.id"
                >
                  {{ place.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <p class="it diversity">
              {{ $t('main.newplace') }}
              <a v-b-modal.placemodal class="ad finger b">
                {{ $t('main.one') }}
              </a>
            </p>

            <b-form-group
              label-for="nationalityInput"
              label="Country of nationality:"
              description="Insert the country of your nationality"
            >
              <b-form-select
                id="nationalityInput"
                v-model="formNationality"
                required
              >
                <option
                  v-for="country in country"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label-for="nationalitiesInput"
              label="Other countries of nationality:"
              description="Please insert the name of any other country in which you have a nationality"
            >
              <b-form-input
                id="nationalitiesInput"
                v-model="formNationalities"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="submit"
              class="btn bhcare btn-block mt-3 mb-3 white border-0"
              >UPDATE</b-button
            >
          </b-form>
        </div>
      </div>
    </div>
    <placemodal />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Edit User Information',
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
  },
  data() {
    return {
      country: this.$store.state.country.filter((country) => country.id != 1),
      formName: this.$auth.user.name,
      formSurname: this.$auth.user.surname,
      formEmail: this.$auth.user.email,
      formCurrentPassword: null,
      formNewPassword: null,
      formNewEmail: null,
      formImageFilename: null,
      id: this.$auth.user.id,
      formNickname: this.$auth.user.nickname,
      formSexidentity: this.$auth.user.sexidentity,
      formBirthsex: this.$auth.user.birthsex,
      formBirthdate: this.$auth.user.birthdate.substring(0, 16),
      formBirthcountry: this.$auth.user.birthcountry,
      formBirthplace: this.$auth.user.birthplace,
      formNationality: this.$auth.user.nationality,
      formNationalities: this.$auth.user.nationalities,
    }
  },
  computed: {
    place() {
      let place = this.$store.state.place.filter(
        (place) => place.country == this.formBirthcountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
  methods: {
    async userEdit() {
      if (!this.formImageFilename) {
        this.userUpdate() //if no new image has to be inserted, we proceed to update the user information
      } else {
        //alternatively, we upload the image: the server will name it with user id, resize it and transform it into a png
        //although the id is in the JWToken amongst the headers, we avoid decoding and append the id in the req.body
        //remember there is no image or video column/field in the database because we use the id as per the image name
        let formImageData = new FormData()
        formImageData.append('file', this.formImageFilename)
        formImageData.append('id', this.id)
        formImageData.append('proptype', 'user')
        let res = await this.$store
          .dispatch('imageUpload', {
            formImageData: formImageData,
            headers: { headers: { 'Content-Type': 'multipart/form-data' } },
          })
          .catch((err) => {
            console.error(err)
          })
        if (res) {
          this.userUpdate()
        }
      }
    },
    async userUpdate() {
      let checkCurrentPassword = await this.$store.dispatch(
        'checkCurrentPassword',
        {
          id: this.id,
          email: this.formEmail,
          password: this.formCurrentPassword,
        }
      )
      if (!checkCurrentPassword) {
        return alert(
          'Something went wrong. Please retry later, the server could have problems in processing your request.'
        )
      }
      if (!this.formNewPassword) {
        this.formNewPassword = this.formCurrentPassword
      }
      if (!this.formNewEmail) {
        this.formNewEmail = this.formEmail
      }
      var updateUser = await this.$store
        .dispatch('updateUser', {
          id: this.id,
          name: this.formName,
          surname: this.formSurname,
          email: this.formNewEmail,
          password: this.formNewPassword,
          nickname: this.formNickname,
          sexidentity: this.formSexidentity,
          birthsex: this.formBirthsex,
          birthdate: this.formBirthdate,
          birthcountry: this.formBirthcountry,
          birthplace: this.formBirthplace,
          nationality: this.formNationality,
          nationalities: this.formNationalities,
        })
        .catch((err) => {
          console.error(err)
        })
      if (updateUser) {
        this.userReload()
      } // reloads the updated user information
    },
    userReload() {
      try {
        this.$auth.fetchUser()
      } catch (err) {
        console.error(err)
      }
      location.href = process.env.URLHOME + '/user' // reloads the user page
    },
  },
}
</script>
