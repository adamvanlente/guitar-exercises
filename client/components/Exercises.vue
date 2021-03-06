<template>
  <div class="wrapper">


    <div class="total-time-elapsed">{{ Number(totalTime / 60).toFixed(0) }} mins practicing</div>

    <div class="available-modes">
      <span class="mode-name"
            v-bind:class="[mode == availableMode ? 'selected-mode' : '']"
            v-on:click="mode = availableMode"
            v-for="availableMode in availableModes">{{ availableMode }}</span>
    </div>

    <div class="refresh-wrapper">

      <button class="refresh-button" v-on:click="getExercise()">New {{ mode }}</button>
      <div v-if="mode == 'Arpeggio Exercise'">
        <span class="arpeggio-type"
              v-bind:class="[selectedArpeggioScales.indexOf(scale) !== -1 ? 'selected-arpeggio' : '']"
              v-for="scale in allArpeggioScaleTypes" v-on:click="updateSelectedScales(scale)">{{ scale }}</span>
      </div>
      <div v-if="!timerOn" class="auto-refresh" v-on:click="timerOn = true">Turn on auto refresh </div>
      <div v-if="timerOn" class="auto-refresh">New exercise in {{ timerLength - timer }} seconds</div>
      <div v-if="timerOn" class="stop-refresh" v-on:click="timerOn = false">Stop auto refresh</div>

    </div>

    <div class="exercise-wrapper" v-if="currentExercise">
      <Scales v-if="mode == availableModes.SCALE"></Scales>
      <Chords v-if="mode == availableModes.CHORD"></Chords>
      <Arpeggios v-if="mode == availableModes.ARPEGGIO"></Arpeggios>
    </div>

  </div>
</template>

<script>

const MODES = {
  SCALE: 'Scale Exercise',
  // CHORD: 'Chord Exercise',
  ARPEGGIO: 'Arpeggio Exercise'
}

import Scales from './Scales'
import Chords from './Chords'
import Arpeggios from './Scales-Arpeggios'
// import Arpeggios from './Arpeggios'

import { getRandomScale } from '../services/scales'
import { getRandomChord } from '../services/chords'
// import { getRandomArpeggios } from '../services/arpeggios'
import { getRandomArpeggios, getAllScaleNames } from '../services/scales-arpeggios'

export default {
  data() {
    return {
      mode: MODES.SCALE,
      availableModes: MODES,
      timerLength: 120,
      timerOn: false,
      timer: 0,
      totalTime: 0,
      timerCounter: undefined,
      allArpeggioScaleTypes: [],
      selectedArpeggioScales: []
    }
  },
  components: {
    Scales,
    Chords,
    Arpeggios
  },
  mounted() {
    let storedMode = window.localStorage.getItem('guitarExerciseMode')
    if (storedMode) this.mode = storedMode

    this.allArpeggioScaleTypes = getAllScaleNames()
    this.resetArpeggioScales()

    this.getExercise()

    let self = this
    setInterval(() => {
      self.totalTime = self.totalTime + 1
    }, 1000)
  },
  methods: {
    getExercise() {
      let exercise
      if (this.mode == this.availableModes.SCALE) exercise = getRandomScale()
      if (this.mode == this.availableModes.CHORD) exercise = getRandomChord()
      if (this.mode == this.availableModes.ARPEGGIO) exercise = getRandomArpeggios(this.selectedArpeggioScales)

      if (exercise) this.$store.commit('setCurrentExercise', exercise)
    },
    setTimer() {
      let self = this
      this.timerCounter = setInterval(() => {
        self.timer = self.timer + 1
        if (self.timer == self.timerLength) {
          self.timer = 0
          self.getExercise()
        }
      }, 1000)
    },
    stopTimer() {
      window.clearInterval(this.timerCounter)
      this.timer = 0
      this.timerOn = false
    },
    updateSelectedScales(scale) {
      let index = this.selectedArpeggioScales.indexOf(scale)
      if (index == -1) {
        this.selectedArpeggioScales.push(scale)
      } else {
        this.selectedArpeggioScales.splice(index, 1)
      }

      window.localStorage.setItem('selectedArpeggioScales', this.selectedArpeggioScales)
    },
    resetArpeggioScales() {

      let selected = window.localStorage.getItem('selectedArpeggioScales')
      if (selected) {
        selected = selected.split(',')
        this.selectedArpeggioScales = selected
      } else {
        this.selectedArpeggioScales = JSON.parse(JSON.stringify(this.allArpeggioScaleTypes))
      }
    }
  },
  computed: {
    currentExercise() {
      return this.$store.state.currentExercise
    }
  },
  watch: {
    mode() {
      this.getExercise()
      this.stopTimer()
      window.localStorage.setItem('guitarExerciseMode', this.mode)
    },
    timerOn() {
      if (this.timerOn) {
        this.setTimer()
      } else {
        this.stopTimer()
      }
    }
  }
}
</script>

<style>

  .available-modes {
    display: block;
    padding: 12px;
    font-size: 12px;
  }

  .mode-name {
    color: gray;
    margin: 12px;
  }

  .selected-mode {
    color: #333;
    text-decoration: underline;
  }

  .refresh-button {
    border: 1px solid #c5cea4;
    border-radius: 2px;
    padding: 8px 16px;
    font-size: 12px;
    background: #f3eca0;
    margin-top: 48px;
    margin-bottom: 8px;
  }

  .auto-refresh {
    font-size: 12px;
    margin: 12px;
    color: gray;
    opacity: 0.7;
    cursor: pointer;
  }

  .stop-refresh {
    color: #f95454;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.7;
    cursor: pointer;
  }

  .exercise-wrapper {
    margin-top: 48px;
    position: fixed;
    top: 225px;
    background: rgba(236, 236, 236, 0.3);
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 48px;
    border-top: 2px solid #d8d8d8;
    overflow: scroll;
  }

  .total-time-elapsed {
    display: block;
    position: fixed;
    right: 10%;
    left: 10%;
    bottom: 0;
    padding: 6px;
    font-size: 12px;
    background: rgb(0 0 255 / 9%);
    margin: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .arpeggio-type {
    display: inline-block;
    font-size: 14px;
    margin: 0 4px;
    padding: 4px;
    border: 1px solid;
    border-radius: 1px;
    color: gray;
    opacity: 0.6;
    cursor: pointer;
  }

  .selected-arpeggio {
    background: #547dde;
    color: white;
  }

</style>
