<template>
  <v-layout row wrap>
    <v-flex lg12 md12>
  <canvas ref="canvas" width="100%" height="20%"></canvas>
    </v-flex>
  </v-layout>
</template>
<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: 'LineChart',
  data () {
    return { }
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
      let color = ''
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
        if(i === 0) {
          color = 'rgba(86, 192, 230, 0.4)'
        }
        if(i === 1) {
          color = 'rgba(86, 192, 35, 0.4)'
        }
        if(i === 2) {
          color = 'rgba(9, 132, 227, 0.5)'
        }
        if(i === 3) {
          color = 'rgba(225, 112, 85, 0.4)'
        }
        if(i === 4) {
          color = 'rgba(253, 121, 168, 0.5)'
        }
        if(i === 5) {
          color = 'rgba(253, 203, 110, 1.0)'
        }
        if(i === 6) {
          color = 'rgba(255, 168, 1, 1.0)'
        }
        if(i === 7) {
          color = 'rgba(239, 87, 119, 1.0))'
        }
        if(i === 8) {
          color = 'rgba(44, 44, 84, 1.0)'
        }
        if(i === 9) {
          color = 'rgba(34, 112, 147, 1.0)'
        }
        if(i === 10) {
          color = 'rgba(51, 217, 178, 1.0)'
        }
        if(i === 11) {
          color = 'rgba(255, 218, 121, 1.0)'
        }
        if(i === 12) {
          color = 'rgba(165, 94, 234, 1.0)'
        }
        if(i === 13) {
          color = 'rgba(253, 114, 114, 1.0)'
        }
        if(i === 14) {
          color = 'rgba(234, 181, 67, 1.0)'
        }
        if(i === 15) {
          color = 'rgba(109, 33, 79, 1.0)'
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
  }
}
</script>
