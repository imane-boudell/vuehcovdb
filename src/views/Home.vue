<template>
  <div>
 <section id="first" class="jumbotron vertical-center main">
  <div class="container">
      <hr class="border-blue">
      <h1 class="tl-green card-title">hCoronaviruses DB</h1>
      <p class="card-text">Comprehensibe, up-to-date, genetic and proteomic database for the SARS-CoV, MERS-CoV-2. User-friendly interphase.</p>
      <p class="card-text">first data search and retrieval. Computational tools for the customized search analysis.</p>
      <div class="card-deck">
      <div class="col-md-4" >
      </div>
      <div class="col-md-4" >
        <div class="card" >
            <img src="../assets/card.png" width="150" height="150" class="card-img-top" >
            <router-link to="/search" class="btn btn-info bg-green">Go to HCoronavirusesDB</router-link>
        </div>
      </div>
      <div class="col-md-4" >
      </div>
      </div>
  </div>
  </section>
  <section id="blast" class="jumbotron vertical-center main">
  <div class="container">
        <hr class="border-blue">
        <h1 class="card-title tl-orange">BLAST Search</h1>
        <p class="card-text">Customized Basic Local Alignment Search Tool (BLAST). nucleotide/protein sequence</p>
        <p class="card-text">Comparison within the library of SARS-CoV, SARS-CoV-2, and MERS-CoV database</p>
      <div class="card-deck">
      <div class="col-md-4" >
      </div>
      <div class="col-md-4" >
      <div class="card">
            <img src="../assets/blast.png" width="150" height="150" class="card-img-top">
            <a href="/blast/" target="_blank" class="btn btn-info bg-orange">Go to BLAST Search <i class="fas fa-external-link-square-alt"></i></a>
      </div>
      </div>
      <div class="col-md-4" >
      </div>
      </div>
  </div>
  </section>
  <section class="jumbotron vertical-center main" id="epitopes">
  <div class="container">
      <hr class="border-blue">
      <h1 class="card-title tl-red">Antigenic Epitopes</h1>
      <p class="card-text">Experimentally verified data for B cell and T</p>
      <p class="card-text">cell epitopes related to SARS-CoV, MERS-CoV, and SARS-CoV-2</p>
      <div class="card-deck">
      <div class="col-md-4" >
      </div>
      <div class="col-md-4" >
        <div class="card">
            <img src="../assets/epi.png" width="150" height="150" class="card-img-top">
            <router-link to="/epitopes" class="btn btn-info bg-red">Go to Antigenic Epitopes</router-link>
        </div>
      </div>
      
      <div class="col-md-4" >
      </div>
      </div>
  </div>
  </section>
  </div>
</template>


