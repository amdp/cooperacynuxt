<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="row"><div class="col-12 d-flex justify-content-center"><p class="care subheading">UPDATE YOUR INFO</p></div></div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="useredit" class="mt-3 was-validated">
            <b-form-group label-for="nameInput" label="Name:" description="Please insert your real name">
              <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="surnameInput" label="Surname:" description="Please insert your real surname">
              <b-form-input id="surnameInput" v-model="formSurname" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="emailInput" label="Email:" description="Please insert a valid email that will be your username">
              <b-form-input id="emailInput" v-model="formEmail" size="sm" required autocomplete="email"></b-form-input></b-form-group>
              <!-- add insert previous password and relative check -->
            <b-form-group label-for="passwordInput" label="Password:" description="Please insert your NEW password or passphrase">
              <b-form-input id="passwordInput" v-model="formPassword" size="sm" type="password" required autocomplete="current-password"></b-form-input></b-form-group>
            <b-form-group label-for="imageInput" label="Image:" description="Please choose an image for your account"> 
              <b-form-file id="imageInput" v-model="formImageFilename" ref="formImageFile" size="sm" accept="image/*"></b-form-file>
            </b-form-group>
            <b-button type="submit" class="btn bhcare btn-block mt-3 white border-0">UPDATE</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: ['auth'],
  data() {
    return {
      formName: this.$auth.user.name,
      formSurname: this.$auth.user.surname,
      formEmail: this.$auth.user.email,
      formPassword: '',
      formImageFilename: '',
      id: this.$auth.user.id,
    }
  },
  methods: {
    async useredit() {
      await new Promise((resolve, reject) => 
      function (){
        console.log('step II')
        if (this.formImageFilename.name) {
          let formImageData = new FormData()
          formImageData.append('file', this.formImageFilename)
          axios.post('/db/userimage', formImageData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(() => { resolve(); })
          .catch(err => {console.log(err)} )
        }

      })
      await new Promise((resolve, reject) => 
      axios.put(
        '/db/user', {
          id: this.id,
          name: this.formName,
          surname: this.formSurname,
          email: this.formEmail,
          password: this.formPassword,
          image: this.formImageFilename.name,
        })
        .then(() => { resolve(); })
      )
      await new Promise((resolve, reject) => 
        this.$auth.fetchUser()
        .catch(err => {console.log(err)})
      )
      await new Promise((resolve, reject) => 
      function () {
        if(this.$auth.user.image){axios.delete('/db/userimage', {data: {delimage: this.$auth.user.image}} )}
        console.log(this.$auth.user.image + ' deleted')
      }) 
    },
  }
}
</script>
