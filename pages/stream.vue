<template>
<b-container>
 

<div id="container">
	<video autoplay="true" id="videoElement">
	
	</video>
</div>

</b-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Test'
    }
  },
  async mounted() {
    var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(function (stream) {
      video.srcObject = stream;
      audio.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
  }
}
</script>
