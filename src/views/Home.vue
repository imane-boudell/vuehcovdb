<template>
 <section class="jumbotron vertical-center main">
  <div class="container">
      <div class="card-deck">
      <div class="card" >
          <img src="../assets/card.png" width="348" height="325" class="card-img-top" >
          <div class="card-body">
          <h5 class="card-title hippy"><i class="fa fa-database"></i> HCoronavirusesDB</h5>
          <p class="card-text">Sequence data, sequence search, MSA alignment, Geo Charts, and more.</p>
          </div>
          <div class="card-footer">
              <router-link to="/search" class="btn btn-primary">Go to HCoronavirusesDB</router-link>
          </div>
      </div>
      <div class="card">
          <img src="../assets/blast.png" width="348" height="325" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title hippy"><i class="fa fa-search"></i> BLAST Search</h5>
          <p class="card-text">Nucleotide Blast and Protein Blast.</p>
          </div>
          <div class="card-footer">
              <a href="/blast/" target="_blank" class="btn btn-primary">Go to BLAST Search <i class="fas fa-external-link-square-alt"></i></a>
          </div>
      </div>

      <div class="card">
          <img src="../assets/epi.png" width="348" height="325" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title hippy"><i class="fa fa-dna"></i> Antigenic Epitopes</h5>
          <p class="card-text">B-cell epitopes, T-cell epitopes, linear epitopes and discontinuous epitopes.</p>
          </div>
          <div class="card-footer">
              <router-link to="/epitopes" class="btn btn-primary">Go to Antigenic Epitopes</router-link>
          </div>
      </div>
      </div>
  </div>
  </section>
</template>



<style>

.hippy {
  color: #cf4766;
}

</style>
