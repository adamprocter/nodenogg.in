<template>
  <div ref="nodes" class="node">
    <vue-draggable-resizable
      class="innernode"
      :w="127"
      :h="84"
      :x="0"
      :y="0"
      :z="1"
      :draggable="true"
      :resizable="false"
      style="border: 0px"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="newnode">
        <g transform="translate(-1345 -843)">
          <rect
            class="a"
            width="127"
            height="84"
            transform="translate(1345 865)"
          />
          <g class="b" transform="translate(1361 843)">
            <rect class="d" width="127" height="84" />
            <rect class="e" x="3.5" y="3.5" width="120" height="77" />
          </g>
          <line class="c" x2="41" transform="translate(1406.5 884.5)" />
          <line class="c" y2="41" transform="translate(1426.5 863.5)" />
        </g>
      </svg>
    </vue-draggable-resizable>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="182"
      height="196.814"
      viewBox="0 0 182 196.814"
    >
      <defs>
        <style>
          .f {
            fill: none;
          }
          .g,
          .g {
            fill: #333;
          }
          .c {
            fill: #fff;
          }
          .d,
          .e {
            stroke: none;
          }
        </style>
      </defs>
      <g transform="translate(-1485.374 -735.578)">
        <g class="f" transform="translate(1489.998 835.06) rotate(-47)">
          <path
            class="d"
            d="M53.519,0l53.519,142.717L53.055,101.138,0,142.717Z"
          />
          <path
            class="g"
            d="M 53.51882553100586 19.93599700927734 L 15.31051635742188 121.824821472168 L 48.73732376098633 95.62881469726562 L 53.01795196533203 92.27416229248047 L 57.32657623291016 95.59273529052734 L 91.86629486083984 122.195915222168 L 53.51882553100586 19.93599700927734 M 53.51882553100586 -1.52587890625e-05 L 107.0376510620117 142.7168579101562 L 53.05514907836914 101.1384582519531 L 0 142.7168579101562 L 53.51882553100586 -1.52587890625e-05 Z"
          />
        </g>
        <path
          class="g"
          d="M53.519,0l53.519,142.717L53.055,101.138,0,142.717Z"
          transform="translate(1489.998 835.06) rotate(-47)"
        />
        <g class="c" transform="translate(1485.374 813.861) rotate(-47)">
          <path
            class="g"
            d="M 99.45198822021484 132.4564208984375 L 55.19086837768555 98.3656005859375 L 53.03655624389648 96.70631408691406 L 50.89624404907227 98.38362121582031 L 7.655252933502197 132.2708435058594 L 53.51882553100586 9.967990875244141 L 99.45198822021484 132.4564208984375 Z"
          />
          <path
            class="g"
            d="M 53.51882553100586 19.93599700927734 L 15.31051635742188 121.824821472168 L 48.73732376098633 95.62881469726562 L 53.01795196533203 92.27416229248047 L 57.32657623291016 95.59273529052734 L 91.86629486083984 122.195915222168 L 53.51882553100586 19.93599700927734 M 53.51882553100586 -1.52587890625e-05 L 107.0376510620117 142.7168579101562 L 53.05514907836914 101.1384582519531 L 0 142.7168579101562 L 53.51882553100586 -1.52587890625e-05 Z"
          />
        </g>
      </g>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="194"
      viewBox="0 0 160 194"
    >
      <defs>
        <style>
          .a,
          .d,
          .g {
            fill: none;
          }
          .a,
          .b,
          .c {
            stroke: #4f4f4f;
          }
          .a,
          .c,
          .d,
          .e {
            stroke-width: 7px;
          }
          .b {
            fill: #333;
          }
          .c {
            fill: #4f4f4f;
          }
          .d {
            stroke: #2d9cdb;
          }
          .e {
            fill: #fff;
            stroke: #333;
          }
          .f {
            stroke: none;
          }
        </style>
      </defs>
      <g transform="translate(-914 -825)">
        <path
          class="a"
          d="M849.969,915.934c94.642,0-12.173-151.082,80.414-151.082"
          transform="translate(106 84)"
        />
        <g class="b" transform="translate(920 979)">
          <circle class="f" cx="20" cy="20" r="20" />
          <circle class="g" cx="20" cy="20" r="19.5" />
        </g>
        <g class="c" transform="translate(1034 829)">
          <circle class="f" cx="20" cy="20" r="20" />
          <circle class="g" cx="20" cy="20" r="16.5" />
        </g>
        <path
          class="d"
          d="M849.969,915.934c94.642,0-12.173-151.082,80.414-151.082"
          transform="translate(100 80)"
        />
        <g class="e" transform="translate(914 975)">
          <circle class="f" cx="20" cy="20" r="20" />
          <circle class="g" cx="20" cy="20" r="16.5" />
        </g>
        <g class="e" transform="translate(1028 825)">
          <circle class="f" cx="20" cy="20" r="20" />
          <circle class="g" cx="20" cy="20" r="16.5" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
}
</script>

<style lang="css" scoped>
.a {
  fill: #333;
}
.b {
  fill: #fff;
}
.b,
.c {
  stroke: #333;
  stroke-width: 7px;
}
.c,
.e {
  fill: none;
}
.d {
  stroke: none;
}
</style>
