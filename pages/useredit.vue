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
                required
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
            <b-button
              type="submit"
              class="btn bhcare btn-block mt-3 mb-3 white border-0"
              >UPDATE</b-button
            >
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Edit User Information'
    }
  },
  data() {
    return {
      formName: this.$auth.user.name,
      formSurname: this.$auth.user.surname,
      formEmail: this.$auth.user.email,
      formCurrentPassword: null,
      formNewPassword: null,
      formNewEmail: null,
      formImageFilename: null,
      id: this.$auth.user.id
    }
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
          .dispatch('imageUploadAction', {
            formImageData: formImageData,
            headers: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
          .catch(err => {
            console.error(err)
          })
        if (res) {
          this.userUpdate()
        }
      }
    },
    async userUpdate() {
      let checkCurrentPassword = await this.$store.dispatch(
        'checkCurrentPasswordAction',
        {
          id: this.id,
          email: this.formEmail,
          password: this.formCurrentPassword
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
        .dispatch('updateUserAction', {
          id: this.id,
          name: this.formName,
          surname: this.formSurname,
          email: this.formNewEmail,
          password: this.formNewPassword
        })
        .catch(err => {
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
    }
  }
}
</script>
