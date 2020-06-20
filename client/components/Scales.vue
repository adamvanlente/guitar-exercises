<template>
  <div class="scale-wrapper" v-if="currentExercise">

    <div class="scale-heading">
      <div class="scale-key-label">key of</div>
      <div class="scale-key-name">{{ currentExercise.key }} </div>
    </div>

    <div class="scale-notes">
      <span>NOTES:</span>
      <label v-for="note in currentExercise.notes">{{ note }}</label>
    </div>

    <div class="scale-labels">
      <label v-bind:class="[currentExercise.type == 'Pentatonic' ? 'pent-style' : '',
                            currentExercise.type == 'Standard' ? 'standard-style' : '']">{{ currentExercise.type }}</label>
      <label> {{ currentExercise.shape }} Shape</label>
    </div>

    <div class="relative-notes" v-if="currentExercise.relative">
      <div>
        {{currentExercise.key}}'s relative {{ currentExercise.relative.name }} is {{ currentExercise.relative.note }}<label v-if="currentExercise.relative.name == 'Minor'">m</label>
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
  .scale-key-label {
    color: gray;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .scale-key-name {
    background: #f1f1f1;
    margin: 12px auto;
    display: block;
    max-width: 100px;
    padding: 9px;
    color: #333;
    border-radius: 4px;
    font-size: 38px;
    border: 1px solid #d0d0d0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
  }

  .scale-notes {
    font-size: 12px;
    margin-top: 24px;
  }

  .scale-notes label {
    display: inline-block;
    background: #eceaea;
    margin: 0px 5px;
    padding: 2px 7px;
    border-radius: 4px;
    color: #4a4747;
  }

  .scale-labels label {
    color: #333;
    background: #f1f1f1;
    border-radius: 4px;
    padding: 4px 16px;
    letter-spacing: 1px;
    font-size: 12px;
    text-transform: uppercase;
    margin: 4px;
    display: inline-block;
  }

  .pent-style {
    color: #ff2121 !important;
    border: 1px solid #ff2121;
  }

  .standard-style {
    color: #595994 !important;
    border: 1px solid #595994;
  }

  .relative-notes {
    font-size: 13px;
    margin: 12px;
    color: #999a9a;
  }

</style>
