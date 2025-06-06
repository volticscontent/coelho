<template>
  <div class="steps-header">
    <div class="progress-bar">
      <div 
        class="progress-fill"
        :style="{ width: `${progressWidth}%` }"
      />
    </div>

    <div class="steps-list">
      <div 
        v-for="step in steps"
        :key="step.id"
        class="step"
        :class="stepClasses(step.id)"
      >
        <div class="step-icon">
          <span class="material-icons">{{ step.icon }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'StepsHeader',
  props: {
    steps: {
      type: Array,
      required: true
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const progressWidth = computed(() => {
      return ((props.currentStep - 1) / (props.steps.length - 1)) * 100
    })

    function stepClasses(stepId) {
      return {
        active: props.currentStep >= stepId,
        completed: props.currentStep > stepId
      }
    }

    return {
      progressWidth,
      stepClasses
    }
  }
}
</script> 