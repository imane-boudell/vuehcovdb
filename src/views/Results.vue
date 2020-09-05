<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  <a href="#/search"><i class="fa fa-database"></i> HCoronavirusesDB</a>&nbsp;<i class="fas fa-chevron-right"></i>
  Found {{viruses ? viruses.length : "..."}} results <span v-if="search_type=='accession'">for the accession number {{accession_num}}</span></h5>
  <div v-if="search_type=='custom'">
        Search criteria: 
        <span class="badge badge-primary">{{specimen.split("_")[0]}}</span>&nbsp;
        <span class="badge badge-success">{{sequence_type == "prot" ? "Proteins" : "Genes"}}</span>
        <span class="badge badge-light">Gene Symbols:</span>&nbsp;<span class="crit">{{gene_symbols ? gene_symbols.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Proteins:</span>&nbsp;<span class="crit">{{proteins ? proteins.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Hosts:</span>&nbsp;<span class="crit">{{hosts ? hosts.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Countries:</span>&nbsp;<span class="crit">{{countries ? countries.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Collection Dates:</span>&nbsp;<span class="crit">{{years ? years.join(", ") : "(Any)"}}</span>
        </div>
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
    <span class="badge badge-success">Loading Results...</span>
</div>
<div v-if="!isLoadingResult">
<ul class="nav nav-tabs" id="mainTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Results (Table)</a>
  </li>
  
  <li class="nav-item">
    <a class="nav-link" id="hist-tab" data-toggle="tab" href="#hist" role="tab" aria-controls="hist" aria-selected="false">Collection Date Distribution</a>
  </li>
</ul>
<div class="tab-content" id="mainTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <br>
    <section>
    <table id="myTable" class="display nowrap table" style="width:100%">
        <thead>
        <tr>
            <th><input type="checkbox" id="selectAllGenes" /></th>
            <th>id</th>
            <th>Gene Product<br> Name</th>
            <th>Gene<br> Symbol</th>
            <th>GenBank Genome<br> Accession</th>
            <th>GenBank Protein<br> Aaccession</th>
            <th>Strain Name</th>
            <th>Collection<br> Date</th>
            <th>Host</th>
            <th>Country</th>
            <th>Sequence</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="virus in viruses" v-bind:key="virus.id">
            <td></td>
            <td>{{ virus.id }}</td>
            <td>{{ virus.gene_product_name }}</td>
            <td>{{ virus.gene_symbol }}</td>
            <td>{{ virus.genbank_genome_accession }}</td>
            <td>{{ virus.genbank_protein_accession }}</td>
            <td>{{ virus.strain_name }}</td>
            <td>{{ virus.collection_date }}</td>
            <td>{{ virus.host }}</td>
            <td>{{ virus.country }}</td>
            <td>{{ virus.fasta }}</td>
        </tr>
        </tbody>
    </table>
    <br>
    <br>

    <button @click="configureMview()" type="button" class="btn btn-primary">
      <i class="fas fa-align-center"></i> Multiple Sequence Alignment (ClustalOmega)
    </button>
    &nbsp;
    <button  @click="downloadSelected()" id="download" type="button" class="btn btn-primary">
      <i class="fa fa-download"></i> Download Selected Genes</button>
   </section>
   &nbsp;

   

  <!-- Modal -->
  <div class="modal fade" id="modalConfig" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Configure ClustalOmega Sequence Alignment</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input id="chkConsensus" type="checkbox" v-model="mview_consensus" />&nbsp;<label for="chkConsensus">Show Consensus</label>
          <div>Select the reference sequence:</div>
          <div v-for="r in selectedRows" v-bind:key="r.id">
            <input type="radio" v-bind:value="r.id" name="referenceForMview"> {{r.title}}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" @click="msaMuscleLink('mview')" class="btn btn-primary" data-dismiss="modal">Run Alignment</button>
        </div>
      </div>
    </div>
  </div>

  </div>
  <div class="tab-pane fade" id="map" role="tabpanel" aria-labelledby="map-tab" style="width:100%">
    <br>
    <div v-if="chartTableData" class="row">
        <div class="col-xs-12 col-sm-12 col-lg-9">
        <GChart ref="gchartMap" v-if="chartData" :resizeDebounce="500" type="GeoChart" :data="chartData" :options="chartOptions" :settings="{packages: ['corechart', 'table'], mapsApiKey:'AIzaSyCqaPSmctfwgNKG5GE2DN3JMMGYDFItgQQ'}"/>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-3">
            <table class="table table-sm" id="seqTable">
                <thead>
                    <tr>
                    <th>Country</th>
                    <th>Sequence Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, key) in chartTableData" v-bind:key="key" :class="{'table-secondary':(key == 'Unknown')}">
                        <td>{{key}} ({{country_codes[key]}})</td>
                        <td>{{val}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
  <div class="tab-pane fade" id="hist" role="tabpanel" aria-labelledby="hist-tab" style="width:100%">
    <br>
    <div v-if="yearData" class="row">
        <div class="col-xs-12 col-sm-12 col-lg-9">
        <GChart ref="gchartHist" v-if="yearData" type="ColumnChart" :data="yearData" :options="chartOptions" :settings="{packages: ['corechart']}"/>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-3">
            <table class="table table-sm" id="yearTable">
                <thead>
                    <tr>
                    <th>Year</th>
                    <th>Sequence Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in yearData.slice(1)" v-bind:key="data[0]" :class="{'table-secondary':(data[0] == 'N/A')}">
                        <td>{{data[0]}}</td>
                        <td>{{data[1]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</div>

</div>

</section>

</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { HollowDotsSpinner } from 'epic-spinners'
import { saveAs } from 'file-saver';

export default {
  name: "results",
  components: {
    GChart,
    HollowDotsSpinner
  },
  props: ['search_type', 'sequence_type', 'accession_num', 'specimen', 'gene_symbols', 'proteins', 'hosts', 'countries', 'years'],
  data () {
    return {
        mview_consensus: false,
        mview_reference: -1,
        selectedRows: [],
        viruses: null,
        genesTable: null,
        chartData: [['Country', 'Popularity']],
        chartTableData: false,
        chartOptions: {
          height: 600,
          datalessRegionColor: "#fcfcfc",
          colorAxis: {colors: ['lightblue', 'green']}
        },
        yearData: false,
        isLoadingResult: true,
        country_codes: {null: 'Unknown', 'Unknown': 'Unknown', 'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Angola': 'AO', 'Argentina': 'AR', 'Australia': 'AU', 
          'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 
          'Benin': 'BJ', 'Bolivia': 'BO', 'Bosnia_and_Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN', 'Bulgaria': 'BG',
          'Burkina_Faso': 'BF', 'Cambodia': 'CO', 'Cameroon': 'CM', 'Canada': 'CA', 'Central_African_Republic': 'CF', 'Chile': 'CL',
          'China': 'CN', 'Colombia': 'CO', 'Cote_dIvoire': 'CI', 'Croatia': 'HR', 'Cyprus': 'CY', 'Czech_Republic': 'CZ',
          'Democratic_Republic_of_the_Congo': 'CD', 'Denmark': 'DK', 'Dominican_Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'Equatorial_Guinea': 'GQ',
          'Estonia': 'EE', 'Ethiopia': 'ET', 'Finland': 'FI', 'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM', 'Germany': 'DE', 'Ghana': 'GH',
          'Gibraltar': 'GI', 'Greece': 'GR', 'Guam': 'GU', 'Guyana': 'GY', 'Honduras': 'HN', 'Hong_Kong': 'HK', 'Hungary': 'HU', 'India': 'IN',
          'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Japan': 'JP', 'Kazakhstan': 'KZ', 'Kenya': 'KE',
          'Korea': 'KP', 'Kyrgyzstan': 'KZ', 'Laos': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY', 'Lithuania': 'LT',
          'Luxembourg': 'LU', 'Macedonia': 'MK', 'Malawi': 'MW', 'Malaysia': 'MY', 'Mali': 'ML', 'Mauritania': 'MR', 'Mayotte': 'YT', 'Mexico': 'MX',
          'Moldova': 'MD', 'Mongolia': 'MN', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL',
          'New_Zealand': 'NZ', 'Niger': 'NE', 'Nigeria': 'NG', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Panama': 'PA',
          'Papua_New_Guinea': 'PG', 'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA', 'Republic_of_the_Congo': 'CD',
          'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Senegal': 'SN', 'Serbia': 'RS', 'Serbia_and_Montenegro': 'ME', 'Seychelles': 'SC',
          'Sierra_Leone': 'SL', 'Singapore': 'SG', 'Slovenia': 'SI', 'Somalia': 'SO', 'South_Africa': 'ZA', 'South_Korea': 'KR', 'Spain': 'ES',
          'Sri_Lanka': 'LK', 'Sudan': 'SD', 'Swaziland (Eswatani)': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW', 'Thailand': 'TH',
          'Togo': 'TG', 'Tunisia': 'TN', 'Turkey': 'TR', 'Uganda': 'UG', 'Ukraine': 'UA', 'United_Arab_Emirates': 'AE', 'United_Kingdom': 'GB', 'Uruguay': 'UY',
          'USA': 'US', 'Uzbekistan': 'UZ', 'Viet_Nam': 'VN', 'West_Bank': 'PS', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'},
    }
  },
  created () {
    this.fetchData();
  },
  updated: function () {
    $.fn.dataTable.ext.errMode = 'none';

    var genesTable = $('#myTable').DataTable({
      columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets: 0
      },
      {
        targets: [ 1, 10 ],
        visible: false,
        searchable: false
      }
      ],
      select: {
          style:    'multi',
          selector: 'td:first-child'
      },
      order: [[ 2, "asc" ]],
      responsive: true
    });

    this.genesTable = genesTable;

    $('#seqTable').DataTable({
      order: [[ 1, "desc" ]],
      "dom": '<"toolbar">',
      "paging": false,
    });

    $('#yearTable').DataTable({
      order: [[ 1, "desc" ]],
      "dom": '<"toolbar">',
      "paging": false,
    });


    $("#selectAllGenes").click( function(e) {
        if ($(this).is( ":checked" )) {
            genesTable.rows().select();
        } else {
            genesTable.rows().deselect(); 
        }
    });


    $('#hist-tab').on('click', e=> {
      setTimeout(()=>{
        this.$refs.gchartHist.drawChart();
      }, 500);
    })

    $('#map-tab').on('click', e=> {
      setTimeout(()=>{
        this.$refs.gchartMap.drawChart();
      }, 500);
    })
  },
  watch: {

  },
  methods: {
    fetchData(){
        switch(this.search_type)
        {
        case "accession":
            this.getVirusesByAccession(this.accession_num)
            break;
        case "custom":
            this.getVirusesCustom()
            break;
        }
    },
    msaMuscleLink(algo) {
      var ids = [];
      var selected = this.genesTable.rows('.selected').data();

      if(selected.length < 2) {
        alert("Please select at least 2 sequence from the table.")
        return false;
      } else if (selected.length > 10) {
        alert("You can select a maximum of 10 sequences for the alignment.")
        return false;
      }

      for (var i = 0; i < selected.length; i++) {
        ids.push(parseInt(selected[i][1]));
      }

      if(algo == "mview") {
        var refid = parseInt($("input:radio[name=referenceForMview]:checked").val());
        if(refid) {
          var index = ids.indexOf(refid);
          if (index !== -1) ids.splice(index, 1);
          ids.unshift(refid);
        }
      }

      var link;
      if(algo == "mview" && this.mview_consensus) {
        link = this.$router.resolve({ path: 'msa', query: {algo: algo, ids: ids, consensus: this.mview_consensus } });
      } else {
        link = this.$router.resolve({ path: 'msa', query: {algo: algo, ids: ids } });
      }
      window.open(link.href, '_blank');
    },
    configureMview(){
      var rows = [];
      var ids = [];
      var selected = this.genesTable.rows('.selected').data();

      if(selected.length < 2) {
        alert("Please select at least 2 sequence from the table.")
        return false;
      } else if (selected.length > 10) {
        alert("You can select a maximum of 10 sequences for the alignment.")
        return false;
      }

      for (var i = 0; i < selected.length; i++) {
        rows.push({id: parseInt(selected[i][1]), 
          title: selected[i][4]});
      }

      this.selectedRows = rows;

      $('#modalConfig').modal('toggle')
    },
    downloadSelected() {
      var fasta = [];
      var selected = this.genesTable.rows('.selected').data();

      if(selected.length == 0) {
        alert("Please select at least 1 sequence from the table.")
        return;
      }

      for (var i = 0; i < selected.length; i++) {
        fasta.push(selected[i][10].replace("&gt;", ">"));
      }

      var blob = new Blob([fasta.join("\n")], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "hCovdb_records.fasta");
    },
    getVirusesByAccession(accessionNum) {
        axios.get("http://127.0.0.1:8083/viruses/search/by_accession/" + accessionNum).then(response=>{
            this.viruses = response.data;
            this.isLoadingResult = false;
            this.buildGeoMap();
        })
    },
    getVirusesCustom() {
      axios.post("http://127.0.0.1:8083/viruses/search/by_criteria/" + this.sequence_type + "/" + this.specimen, {
        gene_symbol: this.gene_symbols,
        protein: this.proteins,
        host: this.hosts,
        country: this.countries,
        collection_date: this.years,
      }).then(response=>{  
        this.viruses = response.data;
        this.isLoadingResult = false;
        this.buildGeoMap();
      })
    },
    buildGeoMap() {
        var results = [['Country', 'Sequences']];
        var yearHist = [['Collection Date', 'Sequences']];
        var counts = {};
        var yearCounts = {};
        var tableCounts = {};

        for(var v of this.viruses) {
          var country_code = this.country_codes[v.country];
          var country_name = v.country == null ? "Unknown" : v.country;
          var year = v.collection_date;
          year = year == null ? "Unknown" : year;

          if(country_code in counts) {
            counts[country_code]++;
            tableCounts[country_name]++;
          }
          else
          {
            counts[country_code] = 1;
            tableCounts[country_name] = 1;
          }

          // Year data
          if(year in yearCounts) {
            yearCounts[year]++;
          } else {
            yearCounts[year] = 1;
          }
        }

        for(var k in counts) {
          results.push([k, counts[k]])
        }
        
        for(var k in yearCounts) {
          yearHist.push([k, yearCounts[k]])
        }

        this.chartData = results;
        this.chartTableData = tableCounts;
        this.yearData = yearHist;
    },
    getMapCounts(gene_symbols = null, proteins = null, hosts = null, countries = null, years = null) {
      axios.post("http://127.0.0.1:8083/map/by_criteria/" + this.specimen, {
        gene_symbol: this.gene_symbols,
        protein: this.proteins,
        host: this.hosts,
        country: this.countries,
        collection_date: this.years,
      }).then(response=>{  
          var results = [['Country', 'Sequences']];
          results = results.concat(response.data);
          this.chartData = results;
      })
    }
  }
};
</script>

<style>
.crit {
    font-size: 75%;
}
</style>

