<template>
  <div style="text-align: center">  
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-blue"><a class="navbar-brand" href="/">
      <b>HCoronavirusesDB</b><span class="d-none d-sm-inline"> | SARS-COV-2, SARS, and MERS Viruses Database and Analysis Resource</span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav mr-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" onclick="document.getElementById('first').scrollIntoView();" v-bind:class="[$router.currentRoute.name == 'home' ? 'active' : '', 'nav-link']">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" v-bind:class="[$router.currentRoute.name == 'about' ? 'active' : '', 'nav-link']">About</router-link>
            </li>
            <li class="nav-item">
              
              <router-link to="/#blast" onclick="document.getElementById('blast').scrollIntoView();" v-bind:class="[$router.currentRoute.name == 'blast' ? 'active' : '', 'nav-link']">BLAST search</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/#epitopes" onclick="document.getElementById('epitopes').scrollIntoView();" v-bind:class="[$router.currentRoute.name == 'antigenic' ? 'active' : '', 'nav-link']">Epitopes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/submit" v-bind:class="[$router.currentRoute.name == 'submit' ? 'active' : '', 'nav-link']">Submit</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/links" v-bind:class="[$router.currentRoute.name == 'links' ? 'active' : '', 'nav-link']" class="nav-link">External Links</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cite" v-bind:class="[$router.currentRoute.name == 'cite' ? 'active' : '', 'nav-link']">Cite</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" v-bind:class="[$router.currentRoute.name == 'contact' ? 'active' : '', 'nav-link']" class="nav-link">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
        <div class="d-block d-sm-none" style="width: 100px; height: 50px;"></div>
        <div class="d-none d-sm-block" style="width: 100px; height: 20px;"></div>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>