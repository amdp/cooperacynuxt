<template>
  <div class="votebar d-flex justify-content-center px-3 py-2 mb-2">
    <div class="single-project-button" id="equivalence">
      <img
        src="../assets/icons/equivalence.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div class="single-project-button" id="care">
      <img src="../assets/icons/care.svg" class="img-fluid img-responsive" />
    </div>
    <div class="single-project-button" id="diversity">
      <img
        src="../assets/icons/diversity.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div class="single-project-button" id="understanding">
      <img
        src="../assets/icons/understanding.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div class="single-project-button" id="freedom">
      <img src="../assets/icons/freedom.svg" class="img-fluid img-responsive" />
    </div>
    <div class="single-project-button" id="transparency">
      <img
        src="../assets/icons/transparency.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div class="single-project-button" id="trust">
      <img src="../assets/icons/trust.svg" class="img-fluid img-responsive" />
    </div>
  </div>
</template>

<style scoped>
.votebar {
  border-top: 1px solid black;
}
.single-project-button {
  height: 30px;
  width: 30px;
  border-radius: 50px;
  margin: 0.1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition-duration: 0.2s;
  padding: 0.35rem;
}
@media (max-width: 768px) {
  .single-project-button {
    margin: 0.15rem;
  }
}
/* colors */
.single-project-button#equivalence:hover {
  box-shadow: 0px 1px 1px var(--equivalence);
}
.single-project-button#care:hover {
  box-shadow: 0px 1px 1px var(--care);
}
.single-project-button#transparency:hover {
  box-shadow: 0px 1px 1px var(--transparency);
}
.single-project-button#freedom:hover {
  box-shadow: 0px 1px 1px var(--freedom);
}
.single-project-button#diversity:hover {
  box-shadow: 0px 1px 1px var(--diversity);
}
.single-project-button#trust:hover {
  box-shadow: 0px 1px 1px var(--trust);
}
.single-project-button#understanding:hover {
  box-shadow: 0px 1px 1px var(--understanding);
}
</style>
