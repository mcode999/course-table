<script setup>
import {defineProps} from "vue";

defineProps({
  courseName: {
    type: String,
    default: "Null"
  },
  courseKey: {
    type: String,
    default: "Null"
  }
})

const emit = defineEmits(['handleDragEnd'])

function handleDragStart(e) {
  const tar = e.target;
  tar.style.opacity = '.6';
}

function handleDragEnd(e) {
  const tar = e.target;
  tar.style.opacity = '1';
  emit('handleDragEnd', tar);
}

</script>

<template>
  <div class="course-panel"
       draggable="true"
       @dragstart="handleDragStart"
       @dragend="handleDragEnd"
       :data-key = "courseKey"
  >
    <h1>{{ courseName }}</h1>
    <span class="remove-btn">x</span>
  </div>
</template>

<style lang="scss" scoped>
.course-panel {
  position: relative;
  width: 140px;
  height: 100px;
  background-color: coral;
  margin: 5px auto;
  padding: 5px;
  box-sizing: border-box;
  cursor: move;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
  }

  .remove-btn {
    position: absolute;
    top: 0;
    right: 10px;
    color: white;
  }

}
</style>
