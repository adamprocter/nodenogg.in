<template>
  <div v-show="tipsplease">
    <draggable
      class="innernode"
      :w="450"
      :h="690"
      :x="50"
      :y="15"
      :z="1"
      :scale="scale"
      :draggable="true"
      :resizable="false"
      style="background-color: #6fcf97; border: 2px solid black"
    >
      <div class="nodes welcome">
        <img src="https://alpha.nodenogg.in/files/organise.png" />

        <p>
          Hey! Welcome <span class="inline">👋</span> to
          <strong>web mode</strong> this is where you can start to organise your
          thoughts <strong>spatially</strong>.
        </p>
        <p>
          You can move nodes by choosing the arrow icon

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
          You create connections by choosing this icon

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
          (shortcut <strong>c</strong>), you can create unlimited connections
          per node and per person.
        </p>
        <p>
          You can add (<strong
            ><a href="https://guides.github.com/features/mastering-markdown/"
              >markdown</a
            ></strong
          >
          formatted) nodes here too just tap to the add node icon
          <svg
            class="example"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            viewBox="0 0 143 106"
          >
            <g transform="translate(-1345 -843)">
              <g class="aa" transform="translate(1345 865)">
                <rect class="dd" width="127" height="84" />
                <rect class="ee" x="0.5" y="0.5" width="126" height="83" />
              </g>
              <g class="bb" transform="translate(1361 843)">
                <rect class="dd" width="127" height="84" />
                <rect class="ee" x="3.5" y="3.5" width="120" height="77" />
              </g>
              <line class="cc" x2="41" transform="translate(1406.5 884.5)" />
              <line class="cc" y2="41" transform="translate(1426.5 863.5)" />
            </g>
          </svg>
        </p>

        <p>
          And remember to hide any nodes just tap the hide icon
          <svg
            class="example"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            viewBox="0 0 158 158"
          >
            <g transform="translate(-1591.6 -842.601)">
              <path
                d="M55,9.465c30.376,0,71.063,15.16,71.063,45.535S85.376,101.028,55,101.028-15.718,85.376-15.718,55,24.624,9.465,55,9.465Z"
                transform="translate(1610 875)"
              />
              <g class="z" transform="translate(1616 865)">
                <path
                  class="x"
                  d="M 55.00000381469727 97.52814483642578 C 47.5827751159668 97.52814483642578 39.61429595947266 96.55204010009766 31.95606803894043 94.70535278320312 C 23.91633796691895 92.76667022705078 16.30660820007324 89.87577056884766 9.949525833129883 86.34516906738281 C 3.042046308517456 82.50887298583984 -2.367432832717896 77.99252319335938 -6.128662109375 72.92156219482422 C -10.16918277740479 67.47402191162109 -12.21789073944092 61.44435501098633 -12.21789073944092 55 C -12.21789073944092 39.30952072143555 -0.1744952797889709 29.4342098236084 9.928650856018066 23.91279411315918 C 13.16560935974121 22.1437931060791 16.71875381469727 20.5400218963623 20.4893798828125 19.14606475830078 C 24.12692070007324 17.80127334594727 27.97865104675293 16.64689826965332 31.93756675720215 15.71498107910156 C 39.58069229125977 13.91579341888428 47.55554580688477 12.96479320526123 55.00000381469727 12.96479320526123 C 62.44902420043945 12.96479320526123 70.44358825683594 13.91604328155518 78.11937713623047 15.71568870544434 C 86.21414947509766 17.61356353759766 93.86746215820312 20.4495849609375 100.2518997192383 23.91716766357422 C 110.4301071166992 29.44523048400879 122.5629806518555 39.32521057128906 122.5629806518555 55 C 122.5629806518555 61.43754196166992 120.4986724853516 67.46379089355469 116.4273986816406 72.911376953125 C 112.6376113891602 77.98233795166016 107.1883773803711 82.50062561035156 100.2310638427734 86.34071350097656 C 93.83364868164062 89.87177276611328 86.18119049072266 92.76396179199219 78.10095977783203 94.70460510253906 C 70.40991973876953 96.55177307128906 62.42173385620117 97.52814483642578 55.00000381469727 97.52814483642578 Z"
                />
                <path
                  class="w"
                  d="M 54.99999618530273 16.46478271484375 C 28.28687286376953 16.46478271484375 -8.717903137207031 29.85636138916016 -8.717903137207031 55.0000114440918 C -8.717903137207031 80.46525573730469 28.28687286376953 94.02813720703125 54.99999618530273 94.02813720703125 C 81.85781860351562 94.02813720703125 119.0629959106445 80.46525573730469 119.0629959106445 55.0000114440918 C 119.0629959106445 29.85636138916016 81.85781860351562 16.46478271484375 54.99999618530273 16.46478271484375 M 54.99999618530273 9.46478271484375 C 85.37564849853516 9.46478271484375 126.0629959106445 24.62433624267578 126.0629959106445 55.0000114440918 C 126.0629959106445 85.37565612792969 85.37564849853516 101.0281372070312 54.99999618530273 101.0281372070312 C 24.62434387207031 101.0281372070312 -15.71790313720703 85.37565612792969 -15.71790313720703 55.0000114440918 C -15.71790313720703 24.62433624267578 24.62434387207031 9.46478271484375 54.99999618530273 9.46478271484375 Z"
                />
              </g>
              <circle
                cx="21.5"
                cy="21.5"
                r="21.5"
                transform="translate(1650 898)"
              />
              <line
                class="y"
                x1="138"
                y2="138"
                transform="translate(1601.5 852.5)"
              />
            </g>
          </svg>
        </p>
        <SvgButton @click="hideTips()" />
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
    scale: (state) => state.ui.scale,
  }),

  methods: {
    hideTips() {
      this.tipsplease = false
      //  this.hidetipsstate = false
    },
  },
  components: {
    SvgButton,
    draggable,
  },
}
</script>

<style lang="css" scoped>
img {
  max-width: 200px;
  padding: 0px;
  margin: 10px;
}

.inline {
  font-size: 2em;
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
/* add new node */
.aa {
  fill: #333;
  stroke: #707070;
}
.bb {
  fill: #fff;
  stroke: #333;
}
.bb,
.cc {
  stroke-width: 7px;
}
.cc,
.ee {
  fill: none;
}
.cc {
  stroke: #2d9cdb;
}
.dd {
  stroke: none;
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

.z {
  fill: #fff;
}
.y {
  fill: none;
  stroke: #2d9cdb;
  stroke-linecap: round;
  stroke-width: 14px;
}
.x,
.w {
  stroke: none;
}
.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}
</style>
