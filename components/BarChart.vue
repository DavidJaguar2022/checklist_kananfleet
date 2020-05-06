<template>
  <v-layout row wrap>
    <v-flex lg12 md12>
      <canvas ref="canvas" width="100%" height="20%"></canvas>
    </v-flex>
  </v-layout>
</template>
<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  name: 'BarChart',
  data () {
    return {}
  },
  props: {
    labelsData: {
      type: Array,
      required: true
    },
    dataInfo: {
      type: Array,
      required: true
    }
  },
  methods: {
    generaGrafica () {
      /* eslint-disable */
      const seen = {}
      const infoLines = []
      var color = ''
      const labels = this.dataInfo.filter((item) => {
        const k = item.Periodo
        return seen.hasOwnProperty(k) ? false : (seen[k] = true)
      })
      const titulos = labels.map((x) => {
        return x.Periodo
      })
      for (var i = 0; i < titulos.length; i++) {
        const valores = []
        for (var y = 0; y < this.dataInfo.length; y++) {
          if (titulos[i] === this.dataInfo[y].Periodo) {
            valores.push(this.dataInfo[y].cantidad)
          }
        }
        if(i==0){
          var color = '#1E88E5';
        }
        if(i == 1){
          var color = '#E5B898';
        }

        if(i==2){
          var color = '#9A98E5';
        }
        if(i==3){
          var color = '#0E8759';
        }
        if(i==4){
          var color = '#ffe75e';
        }
        if(i==5){
          var color = '#899857';
        }
        if(i==6){
          var color = '#00a8cc';
        }
        if(i==7){
          var color = '#ecdfc8';
        }
        if(i==8){
          var color = '#84142d';
        }
        if(i==9){
          var color = '#5b8c85';
        }
        if(i==10){
          var color = '#192965';
        }
        if(i==11){
          var color = '#b21f66';
        }
        if(i==12){
          var color = '#512b58';
        }
        infoLines.push({ 'label': titulos[i], 'backgroundColor': color , 'data': valores })
      }
      this.renderChart({
        labels: this.labelsData,
        datasets: infoLines
      })
    }
  },
  mounted () {
    this.generaGrafica()
    // this.renderChart(this.chartdata)
  }
}
</script>
