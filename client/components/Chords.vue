<template>
  <div class="scale-wrapper" v-if="currentExercise">

    <div class="scale-heading">
      <div class="scale-key-label">chord</div>
      <div class="scale-key-name">{{ currentExercise.key }} {{ currentExercise.chord.symbol }} </div>
    </div>

    <div class="scale-notes">
      <span>NOTES:</span>
      <label v-for="note in currentExercise.notes">{{ note }}</label>
    </div>

    <div class="scale-labels">
      <label> Suggested Shape: {{ currentExercise.shape }}</label>
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

  .scale-key-name {
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
  }

  .scale-labels label {
    background: #333;
    color: white;
  }
</style>
