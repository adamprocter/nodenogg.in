<template>
  <div v-show="tipsplease">
    <draggable
      class="innernode"
      :w="450"
      :h="590"
      :x="50"
      :y="15"
      :z="1"
      :draggable="true"
      :resizable="false"
      style="background-color: #6fcf97"
    >
      <div class="nodes welcome">
        <img src="https://alpha.nodenogg.in/files/organise.png" />

        <p>
          organise mode is designed for you to start to organise your thoughts
          together in your team.
        </p>
        <p>
          You can move nodes together in real time using the arrow icon

          <svg
            class="example"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            viewBox="0 0 182 196.814"
          >
            <g transform="translate(-1485.374 -735.578)">
              <g class="a" transform="translate(1489.998 835.06) rotate(-47)">
                <path
                  class="d"
                  d="M53.519,0l53.519,142.717L53.055,101.138,0,142.717Z"
                />
                <path
                  class="e"
                  d="M 53.51882553100586 19.93599700927734 L 15.31051635742188 121.824821472168 L 48.73732376098633 95.62881469726562 L 53.01795196533203 92.27416229248047 L 57.32657623291016 95.59273529052734 L 91.86629486083984 122.195915222168 L 53.51882553100586 19.93599700927734 M 53.51882553100586 -1.52587890625e-05 L 107.0376510620117 142.7168579101562 L 53.05514907836914 101.1384582519531 L 0 142.7168579101562 L 53.51882553100586 -1.52587890625e-05 Z"
                />
              </g>
              <path
                class="b"
                d="M53.519,0l53.519,142.717L53.055,101.138,0,142.717Z"
                transform="translate(1489.998 835.06) rotate(-47)"
              />
              <g class="c" transform="translate(1485.374 813.861) rotate(-47)">
                <path
                  class="d"
                  d="M 99.45198822021484 132.4564208984375 L 55.19086837768555 98.3656005859375 L 53.03655624389648 96.70631408691406 L 50.89624404907227 98.38362121582031 L 7.655252933502197 132.2708435058594 L 53.51882553100586 9.967990875244141 L 99.45198822021484 132.4564208984375 Z"
                />
                <path
                  class="e"
                  d="M 53.51882553100586 19.93599700927734 L 15.31051635742188 121.824821472168 L 48.73732376098633 95.62881469726562 L 53.01795196533203 92.27416229248047 L 57.32657623291016 95.59273529052734 L 91.86629486083984 122.195915222168 L 53.51882553100586 19.93599700927734 M 53.51882553100586 -1.52587890625e-05 L 107.0376510620117 142.7168579101562 L 53.05514907836914 101.1384582519531 L 0 142.7168579101562 L 53.51882553100586 -1.52587890625e-05 Z"
                />
              </g>
            </g>
          </svg>
          (shortcut <strong>a</strong>)
        </p>
        <p>
          You can also use the connection icon

          <svg
            class="example"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            viewBox="0 0 160 194"
          >
            <g transform="translate(-914 -825)">
              <path
                class="h"
                d="M849.969,915.934c94.642,0-12.173-151.082,80.414-151.082"
                transform="translate(106 84)"
              />
              <g class="i" transform="translate(920 979)">
                <circle class="m" cx="20" cy="20" r="20" />
                <circle class="n" cx="20" cy="20" r="19.5" />
              </g>
              <g class="j" transform="translate(1034 829)">
                <circle class="m" cx="20" cy="20" r="20" />
                <circle class="n" cx="20" cy="20" r="16.5" />
              </g>
              <path
                class="k"
                d="M849.969,915.934c94.642,0-12.173-151.082,80.414-151.082"
                transform="translate(100 80)"
              />
              <g class="l" transform="translate(914 975)">
                <circle class="m" cx="20" cy="20" r="20" />
                <circle class="n" cx="20" cy="20" r="16.5" />
              </g>
              <g class="l" transform="translate(1028 825)">
                <circle class="m" cx="20" cy="20" r="20" />
                <circle class="n" cx="20" cy="20" r="16.5" />
              </g>
            </g>
          </svg>
          to draw connections between nodes, you can create as many as you want
          as can each team member (shortcut <strong>c</strong>)
        </p>
        <p>
          You can still use
          <a href="https://guides.github.com/features/mastering-markdown/"
            >markdown</a
          >
          to quickly format your text and add images from websources, you can
          even use html and embed codes.
        </p>
        <SvgButton />
        <div class="btn-row">
          <BaseButton buttonClass="danger" @click="hideTips()">Hide</BaseButton>
        </div>
      </div>
    </draggable>
    <div v-show="!tipsplease"></div>
  </div>
</template>

<script>
import marked from 'marked'
import { mapState } from 'vuex'
import SvgButton from '@/components/SvgButton'
import draggable from '@/experimental/Draggable'

export default {
  data: function () {
    return {
      tipsplease: true,
    }
  },

  mounted() {
    // this.tipsplease = this.hidetipsstate
  },
  filters: {
    marked: marked,
  },

  computed: mapState({
    hidetipsstate: (state) => state.hidetipsstate,
  }),

  methods: {
    hideTips() {
      this.tipsplease = false
      //  this.hidetipsstate = false
    },
  },
  components: {
    SvgButton,
    draggable
  },
}
</script>

<style lang="css" scoped>
img {
  max-width: 200px;
  padding: 0px;
  margin: 10px;
}

.vdr {
  padding: 0 0.5em;
}

.example {
  width: 30px;
}

.icon {
  margin-left: 1em;
  padding: 0.5em;
  cursor: pointer;
}

/* connections */
.h,
.k,
.n {
  fill: none;
}
.h,
.i,
.j {
  stroke: #4f4f4f;
}
.h,
.j,
.k,
.l {
  stroke-width: 7px;
}
.i {
  fill: #333;
}
.j {
  fill: #4f4f4f;
}
.k {
  stroke: #2d9cdb;
}
.l {
  fill: #fff;
  stroke: #333;
}
.m {
  stroke: none;
}

/*  arrow */
.a {
  fill: none;
}
.b,
.e {
  fill: #333;
}
.c {
  fill: #fff;
}
.d,
.e {
  stroke: none;
}
.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}
</style>
