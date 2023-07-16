<template>
  <div class="board">
    <div class="left">
      <h1>选课区</h1>
      <course-panel
          v-for="({name}, key) in data.courses"
          :course-name="name"
          @handle-drag-end="handleDragEnd"
          :course-key="key"
      >
      </course-panel>
    </div>
    <div
        class="right"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
    >
      <table border="1">
        <tr>
          <th>时间段 / 星期</th>
          <th
              v-for="(weekday, index) of data.weekday"
              :key="index">
            {{ weekday }}
          </th>
        </tr>
        <tr
            v-for="(timeSlot, index) of data.time_slot"
            :key="index"
        >
          <th>{{ timeSlot }}</th>
          <td
              v-for="weekday of 7"
              :data-weekday="weekday"
              :data-time-slot="index"
          >
            <template v-if="cellData[`${weekday}-${index}`]">
              <course-panel
                  :course-name="data.courses[cellData[`${weekday}-${index}`]].name"
                  :course-key="cellData[`${weekday}-${index}`]"
                  v-course-panel="{
                    cellData,
                    weekday,
                    timeSlot: index,
                  }"
              >
              </course-panel>
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import CoursePanel from "../components/CoursePanel.vue";
import vCoursePanel from "../directives/vCoursePanel.js";
import {ref} from "vue";

const data = {
  weekday: [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
  ],
  time_slot: [
    '08:00-08:50',
    '09:00-09:50',
    '10:00-10:50',
    '11:00-11:50',
    '14:00-14:50',
    '15:00-15:50',
    '16:00-16:50',
    '17:00-17:50',
  ],
  courses: {
    chinese: {
      name: '语文',
      teachers: [
        '张三',
        '李四',
      ]
    },
    math: {
      name: '数学',
      teachers: [
        '王五',
        '赵六',
      ]
    },
    english: {
      name: '英语',
      teachers: [
        '孙七',
        '周八',
      ]
    }
  }
}

const cellData = ref({
  '1-1': 'english',
  '2-5': 'math',
  '3-3': 'chinese',
})

let targetCell = null;

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();
  const tar = e.target;
  const tagName = tar.tagName.toLowerCase();
  targetCell = tagName !== 'td' ? null : tar;

}

function handleDragEnd(target) {
  if (targetCell) {
    const weekday = targetCell.dataset.weekday;
    const timeSlot = targetCell.dataset.timeSlot;
    const prop = `${weekday}-${timeSlot}`;
    if (!cellData.value[prop]) {
      const key = target.dataset.key;
      cellData.value[prop] = key;
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  position: relative;

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;

    h1 {
      margin: 5px;
      font-size: 24px;
      text-align: center;
    }

  }

  .right {
    width: 100%;
    background-color: powderblue;
    padding-left: 300px;
    box-sizing: border-box;

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      th {
        background-color: #cdffcc;
      }

      tr {
        background-color: #fdfe98;
      }

      td {
        height: 100px;
      }
    }
  }

}
</style>
