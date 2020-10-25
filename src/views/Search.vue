<template>
<section class="jumbotron vertical-center main">
<div class="container">
    <h6 class="jumbotron-heading tl-blue"><a href="/">Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp; hCoronaviruses DB</h6>
    <div class="accordion" id="accordionExample">
        <div class="card-blue">
            <div class="" id="headingTwo">
              <div class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
              <h1 class="tl-green card-title">hCoronaviruses DB</h1>
              <p class="card-text">Comprehensibe, up-to-date, genetic and proteomic database for the SARS-CoV, MERS-CoV-2. User-friendly interphase.</p>
              <p class="card-text">first data search and retrieval. Computational tools for the customized search analysis.</p>
              </div>
            </div>
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
                <form> 
                <div class="form-group row">
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label" style="text-align:left;">Virus Name</label>
                    <div class="col-sm-10">
                        <div id="virusSelector" class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label @click="setSpecimen('sarscov2_virus')" class="btn btn-primary active bg-white">
                                <input type="radio" name="options" id="opt-sarscov2" autocomplete="off" checked> SARS-COV-2
                            </label>
                            <label @click="setSpecimen('sars_virus')" class="btn btn-primary bg-white">
                                <input type="radio" name="options" id="opt-sars" autocomplete="off"> SARS
                            </label>
                            <label @click="setSpecimen('mers_virus')" class="btn btn-primary bg-white">
                                <input type="radio" name="options" id="opt-mers" autocomplete="off"> MERS
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label" style="text-align:left;">Sequence Type</label>
                    <div class="col-sm-10">
                        <div id="virusSelector" class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label @click="setSequenceType('nucl')" class="btn btn-secondary active bg-white">
                                <input type="radio" name="options" id="opt-sars" autocomplete="off" checked> Genes
                            </label>
                            <label @click="setSequenceType('prot')" class="btn btn-secondary bg-white">
                                <input type="radio" name="options" id="opt-sarscov2" autocomplete="off"> Proteins
                            </label>
                        </div>
                    </div>
                </div>
                <div id="containi">
                    <div class="row">
                    <div class="col-xs-12 col-sm-8 col-lg-4">
                        <label for="xyzw1" class="col-form-label tl-blue">Gene Product Name (Gene Symbol) <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selGeneSymbol" size="10">
                            <option>(Any)</option>
                            <option style="text-transform: capitalize;"  v-for="g in criteria.genes" :value="g[0]">{{g[1]}} ({{g[0]}})</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-lg-3">
                        <label for="xyzw1" class="col-form-label tl-blue">Host <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selHost" size="10">
                            <option>(Any)</option>
                            <option v-for="host in criteria.host" v-bind:key="host">{{host}}</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-3">
                        <label for="xyzw1" class="col-form-label tl-blue">Country <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selCountry"  size="10">
                            <option>(Any)</option>
                            <option v-for="country in criteria.country" v-if="country != null" v-bind:key="country">{{country}}</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-2">
                        <label for="xyzw1" class="col-form-label tl-blue">Collection Date <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selYear" size="10">
                            <option>(Any)</option>
                            <option v-for="year in criteria.collection_date" v-if="year != null" v-bind:key="year">{{year}}</option>
                        </select>
                    </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                    <router-link :to="{ 
                      name: 'results', 
                      params: {
                        specimen: specimen,
                        sequence_type: sequence_type,
                        search_type: 'custom', 
                        gene_symbols: criteria_selection.gene_symbols, 
                        hosts: criteria_selection.hosts, 
                        countries: criteria_selection.countries, 
                        years: criteria_selection.years, 
                        } 
                      }" class="btn btn-primary bg-blue">
                      <span>
                        <i class="fa fa-search"></i>  Search for {{specimen.replace("_", " ") + "es"}} 
                        <span style="font-weight: bold" v-if="!isLodaingResultsCount">({{num_virus}} results)</span>
                      <div v-if="isLodaingResultsCount" class="spinner-border text-light spinner-border-sm" role="status"></div>
                      </span>
                    </router-link>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class>
            <div class="" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed tl-blue" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Search by Accession Number
                </button>
            </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <form method="get" action="/results">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Accession Number</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="accession_num" class="form-control" id="exampleFormControlTextarea1"  placeholder="Enter the accession number here">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                        <router-link :to="{ name: 'results', params: {search_type: 'accession', accession_num: accession_num } }" class="btn btn-primary"><i class="fa fa-search"></i>  Search</router-link>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</div>
</section>
</template>

<script>
import axios from 'axios'
import {LoopingRhombusesSpinner} from 'epic-spinners'

// @ is an alias to /src
export default {
  name: "search",
  components: {
    LoopingRhombusesSpinner
  },
  data () {
    return {
      isLodaingCriteria: true,
      isLodaingResultsCount: true,
      accession_num: "",
      specimen: "sarscov2_virus",
      sequence_type: "nucl",
      num_virus: 0,
      criteria: {
        gene_symbols: null,
        hosts: null,
        countries: null,
        years: null,
      },
      criteria_selection: {
        gene_symbols: null,
        hosts: null,
        countries: null,
        years: null,
      },
    }
  },
  created () {
    this.fetchData()
  },
  updated () {
   /* $('.select2Crit').select2({
      "placeholder": "(Any)"
    });*/

    $('.select2Crit').on('change',e => {
      this.setCriteria();
    });
  },
  watch: {

  },
  computed: {
    username () {
      return ""
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    loadCriteria (sequence_type, specimen) {
      axios.post("http://127.0.0.1:8083/viruses/search_criteria/" + sequence_type + "/" + specimen).then(response=>{
        // Special handling for genes
        for (var i = 0; i < response.data.genes.length; i++)
        {
          var g = response.data.genes[i];
          if(g[0] == "P90") {
            g[1] = "RNA-Directed RNA Polymerase";
          } else {
            g[1] = g[1].toLowerCase();
          }
        }

        this.criteria = response.data;
        
         this.sleep(500).then( ()=>{
        this.isLodaingCriteria = false;});
      })
    },
    getCriteriaResultCount(gene_symbols = null, hosts = null, countries = null, years = null) {
      this.isLodaingResultsCount = true;
      axios.post("http://127.0.0.1:8083/viruses/search_criteria/result_count/" + this.sequence_type + "/" + this.specimen, {
        gene_symbol: gene_symbols,
        host: hosts,
        country: countries,
        collection_date: years,
      }).then(response=>{  
        this.num_virus = response.data
        this.sleep(500).then( ()=>{
          this.isLodaingResultsCount = false;});
      })
    },
    fetchData () {
      this.loadCriteria("nucl", "sarscov2_virus")
      this.getCriteriaResultCount()
      this.resetSelection()
    },
    setCriteria() {

      // If any is selected, remove all other selections
      var sym = this.getSelectedValue("#selGeneSymbol");
      var hos = this.getSelectedValue("#selHost");
      var con = this.getSelectedValue("#selCountry");
      var yea = this.getSelectedValue("#selYear");

      this.criteria_selection.gene_symbols = sym;
      this.criteria_selection.hosts = hos;
      this.criteria_selection.countries = con;
      this.criteria_selection.years = yea;
      
      this.getCriteriaResultCount(sym, hos, con, yea);
    },
    getSelectedValue(selector) {
      if($(selector).val().includes("(Any)")|| $(selector).val().length == 0)
      {
        $(selector + " option:selected").prop("selected", false);
        $(selector).val("(Any)");
        return null;
      }
      return $(selector).val();
    },
    resetSelection() {
      for(var selector of ["#selGeneSymbol", "#selHost", "#selCountry", "#selYear"])
      {
        $(selector + " option:selected").prop("selected", false);
        $(selector).val("(Any)");
      }
    },
    setSequenceType(sequence_type) {
      this.isLodaingCriteria = true;
      this.sequence_type = sequence_type;
      this.loadCriteria(sequence_type, this.specimen)
      this.getCriteriaResultCount()
      this.resetSelection()
      this.setCriteria()
    },
    setSpecimen(specimen) {
      this.isLodaingCriteria = true;
      this.specimen = specimen
      this.loadCriteria(this.sequence_type, specimen)
      this.getCriteriaResultCount()
      this.resetSelection()
      this.setCriteria()
    }
  }
};
</script>

<style>
.capitalize {
  text-transform:capitalize;
}
/* 
*  The .navi properties are for styling only
*  These properties can be changed or removed
*/
.navi {
  background-color: #eaeaea;
  height: 40px;
}


/*
*  Position the #infoi element in the top-right
*  of the .wrapper element
*/
#infoi {
  position: absolute;
  top: calc(50% - 35px);
  right: calc(50% - 35px);
  
  /*
  *  Styling only, the below can be changed or removed
  *  depending on your use case
  */
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}

.row {
  padding-bottom: 5px;
}

</style>

