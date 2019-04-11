<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="row"><div class="col-12 d-flex justify-content-center"><p class="care subheading">OR REGISTER A NEW ACCOUNT:</p></div></div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="register" class="mt-3 was-validated">
            <b-form-group label-for="nameInput" label="Name:" description="Please insert your real name">
              <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="surnameInput" label="Surname:" description="Please insert your real surname">
              <b-form-input id="surnameInput" v-model="formSurname" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="emailInput" label="Email:" description="Please insert a valid email: it will be your future username">
              <b-form-input id="emailInput" v-model="formEmail" size="sm" required></b-form-input></b-form-group>
              <!-- add crypt password before sending it -->
            <b-form-group label-for="passwordInput" label="Password:" description="Please insert your password or passphrase">
              <b-form-input id="passwordInput" v-model="formPassword" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="imageInput" label="Image:" :description="imageUploadDesc"> 
              <b-form-file id="imageInput" v-model="formImageFilename" ref="formImageFile" size="sm" accept="image/*" @input="imageUpload()"></b-form-file>
            </b-form-group>
            <b-button type="submit" class="btn bhcare btn-block mt-3 white border-0">REGISTER</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formName: '',
      formSurname: '',
      formEmail: '',
      formPassword: '',
      formImageFilename: '',
      imageUploadDesc: 'Please choose an image for your account',
    }
  },
  methods: {
    register() {
      axios
        .post('/db/user', {
          name: this.formName,
          surname: this.formSurname,
          email: this.formEmail,
          password: this.formPassword,
          image: this.formImageFilename.name,
        })
        .then(res => {
          $auth.loginWith('local', { data: { email: this.formEmail, password: this.formPassword }})
        })
        .catch(err => {
          console.log(err)
        })
    },
    async imageUpload() {
        let formImageData = new FormData()
        formImageData.append('file', this.formImageFilename)
        axios.post(
          '/db/userimageupload', formImageData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          this.imageUploadDesc = 'Image uploaded. Please keep the image name in the textbox above as it is now.'
          console.log('SUCCESS!!');
        })
        .catch(err => {
          this.imageUploadDesc = 'Image failed to upload. Please retry.'
          console.log('FAILURE :(');
        })
    },
  }
}
</script>
