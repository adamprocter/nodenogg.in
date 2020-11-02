<template>
  <div>
    <div v-show="tipsplease" class="nodes welcome">
      <img src="https://alpha.nodenogg.in/files/collect.png" />

      <p>
        magpie mode is designed for you to gather your thoughts and research, as
        quickly and easily as possible.
      </p>
      <p>
        Tap or press the add node icon
        <svg
          class="example"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          viewBox="0 0 143 106"
        >
          <g transform="translate(-1345 -843)">
            <g class="a" transform="translate(1345 865)">
              <rect class="d" width="127" height="84" />
              <rect class="e" x="0.5" y="0.5" width="126" height="83" />
            </g>
            <g class="b" transform="translate(1361 843)">
              <rect class="d" width="127" height="84" />
              <rect class="e" x="3.5" y="3.5" width="120" height="77" />
            </g>
            <line class="c" x2="41" transform="translate(1406.5 884.5)" />
            <line class="c" y2="41" transform="translate(1426.5 863.5)" />
          </g>
        </svg>
        (shortcut <strong>n</strong>)
      </p>
      <p>
        Don't forget you can use
        <a href="https://guides.github.com/features/mastering-markdown/"
          >markdown</a
        >
        to quickly format your text and add images from websources, you can even
        use html and embed codes.
      </p>
      <p>
        To see what everyone else has collected in your team and to start
        organising, just switch to organise mode (best on a large display).
      </p>

      <div class="btn-row">
        <BaseButton buttonClass="danger" @click="hideTips()">Hide</BaseButton>
      </div>
    </div>
    <div v-show="!tipsplease"></div>
  </div>
</template>

<script>
import marked from 'marked'
import { mapState } from 'vuex'

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
}
</script>

<style lang="css" scoped>
img {
  max-width: 400px;
  padding: 0 50;
}

.welcome {
  /* max-width: 450px; */
  width: 95%;
  margin-top: 1em;
  margin-left: 1em;
  background-color: white;
  border: 2px solid black;
  padding: 1em;
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

.a {
  fill: #333;
  stroke: #707070;
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

.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}
</style>
