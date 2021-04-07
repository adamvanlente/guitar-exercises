<template>
  <div class="chord-wrapper" v-if="currentExercise">

    <div class="chord-heading">
      <div class="chord-key-label">chord</div>
      <div class="chord-key-name">{{ currentExercise.key }} {{ currentExercise.chord.symbol }} </div>
    </div>

    <div class="chord-notes">
      <span>NOTES:</span>
      <label v-for="note in currentExercise.notes">{{ note }}</label>
    </div>

    <div class="chord-progressions">
      <div class="chord-progressions-header">Suggested Chord Progressions</div>
      <div class="chord-progressions-wrapper" v-for="progression in currentExercise.progressions">
        <div class="chord-progressions-name">{{ progression.name }}</div>
        <div class="chord-progressions-chords-wrapper">
          <label class="chord-progressions-chord" v-for="chord in progression.chords">{{ chord }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {
    currentExercise() {
      return this.$store.state.currentExercise
    }
  }
}
</script>

<style>

  .chord-key-label {
    color: gray;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .chord-key-name {
    background: #f1f1f1;
    margin: 12px auto;
    display: block;
    max-width: 150px;
    padding: 9px;
    color: #333;
    border-radius: 4px;
    font-size: 38px;
    border: 1px solid #d0d0d0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
  }

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

  .chord-notes {
    font-size: 12px;
    margin-top: 24px;
  }

  .chord-notes label {
    display: inline-block;
    background: #eceaea;
    margin: 0px 5px;
    padding: 2px 7px;
    border-radius: 4px;
    color: #4a4747;
  }

  .chord-labels label {
    background: #333;
    color: white;
  }

  .chord-progressions {

  }

  .chord-progressions-header {
    font-size: 12px;
    margin: 16px;
    color: gray;
    opacity: 0.5;
  }

  .chord-progressions-wrapper {
    display: block;
    font-size: 14px;
    margin: 12px auto;
    max-width: 250px;
    border-radius: 4px;
    border: 1px solid black;
  }

  .chord-progressions-name {
    background: black;
    color: white;
    padding: 4px;
  }

  .chord-progressions-wrapper {

  }

  .chord-progressions-chord {
    padding: 4px 7px;
    display: inline-block;
    background: #e6e6e6;
    margin: 4px;
    border-radius: 2px;
  }

</style>
