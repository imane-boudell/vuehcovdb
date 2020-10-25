<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
 Antigenic Epitopes</h5>
<br>

<div v-if="isLoadingResult" style="text-align: center">
    <br />
    <hollow-dots-spinner
        :animation-duration="1000"
        :dot-size="20"
        :dots-num="3"
        color="#00d961"
        style="margin-left: auto; margin-right: auto;"
    />
    <br />
    <span class="badge badge-success">Loading Data...</span>
</div>
<div v-if="!isLoadingResult">
<ul class="nav nav-tabs" id="mainTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="sarscov2-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">SARS-COV-2 Epitopes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="sars-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false">SARS Epitopes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="mers-tab" data-toggle="tab" href="#hist" role="tab" aria-controls="hist" aria-selected="false">MERS Epitopes</a>
  </li>
</ul>

<div class="tab-content" id="mainTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <br>
    <section>
    <table id="sarscov2_ep" class="display nowrap table" style="width:100%">
    </table>
    <br>
    <br>
   </section>
   &nbsp;

  </div>


  <div class="tab-pane fade" id="map" role="tabpanel" aria-labelledby="map-tab" style="width:100%">
    <br>
      <section>
      <table id="sars_ep" class="display nowrap table" style="width:100%">
      </table>
      <br>
      <br>
    </section>
    &nbsp;
  </div>


  <div class="tab-pane fade" id="hist" role="tabpanel" aria-labelledby="hist-tab" style="width:100%">
      <br>
      <section>
        <table id="mers_ep" class="display nowrap table" style="width:100%">
        </table>
        <br>
        <br>
      </section>
    &nbsp;
  </div>
</div>

</div>

</section>

</template>


<script>
import axios from 'axios'

import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: "epitopes",
  components: {
    HollowDotsSpinner
  },
  data () {
    return {
      isLoadingResult: true,
      alldata: {
        "sarscov2": null,
        "sars": null,
        "mers": null,
        }
    }
  },
  created () {
    this.fetchData();
  },
  updated: function () {

    for(var ep in this.alldata) {
      var cols = [];
      for(var k in this.alldata[ep][0]) {
        cols.push({"data":k, "title": k.replace(/_/g, " ")})
      }

      let epTable = $('#' + ep + "_ep").DataTable({
        columns: cols,
        data: this.alldata[ep],
        order: [[ 2, "asc" ]],
        responsive: true,
      });

      $('#' + ep + '-tab').on('click', e=> {
        setTimeout(()=>{
          epTable.columns.adjust().responsive.recalc();
        }, 500);
      });
    }
  },
  watch: {

  },
  methods: {
    fetchData(){
      this.getEpitopes();
    },
    getEpitopes() {
      var epitopes = ["sarscov2", "sars", "mers"];
      var tot = 0;
      
      for(let ep of epitopes){
        axios.get("http://127.0.0.1:8083/epitopes/" + ep).then(response=>{
          this.alldata[ep] = response.data;

          tot += 1;
          if(tot == 3){
            this.isLoadingResult = false;
          }
        });
      }
    },
  }
};
</script>

<style>
.crit {
    font-size: 75%;
}
</style>

