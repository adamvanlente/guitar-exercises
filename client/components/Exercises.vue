<template>
  <div class="wrapper">

    <div class="available-modes">
      <span class="mode-name"
            v-bind:class="[mode == availableMode ? 'selected-mode' : '']"
            v-on:click="mode = availableMode"
            v-for="availableMode in availableModes">{{ availableMode }}</span>
    </div>

    <div class="refresh-wrapper">

      <button class="refresh-button" v-on:click="getExercise()">New {{ mode }}</button>

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
import Arpeggios from './Arpeggios'

import { getRandomScale } from '../services/scales'
import { getRandomChord } from '../services/chords'
import { getRandomArpeggios } from '../services/arpeggios'

export default {
  data() {
    return {
      mode: MODES.SCALE,
      availableModes: MODES,
      timerLength: 120,
      timerOn: false,
      timer: 0,
      timerCounter: undefined
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
    this.getExercise()
  },
  methods: {
    getExercise() {
      let exercise
      if (this.mode == this.availableModes.SCALE) exercise = getRandomScale()
      if (this.mode == this.availableModes.CHORD) exercise = getRandomChord()
      if (this.mode == this.availableModes.ARPEGGIO) exercise = getRandomArpeggios()

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
    color: #333;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.7;
    cursor: pointer;
  }

  .exercise-wrapper {
    margin-top: 48px;
    position: fixed;
    top: 150px;
    background: rgba(236, 236, 236, 0.3);
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 48px;
    border-top: 2px solid #d8d8d8;
    overflow: scroll;
  }
</style>
