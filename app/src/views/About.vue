<template>
  <div class="about">
    <h1>About</h1>
    <p>
      nodenogg.in is designed to support a new type of co-creation, a messy
      spatial area in which you work together creating and connecting ideas and
      concepts
    </p>
    <p>
      Made by Adam Procter and Toby Milner-Gulland.
      <em>
        (+ many helpers (Mathew Parker, im looking at you) &amp;
        <a href="https://patreon.com/procterbot">supporters</a>)
      </em>
    </p>
    <ul>
      <li>
        Co-create and contribute ideas, with text, links and attachments with
        other people in realtime.
      </li>
    </ul>
    <h3>
      version {{ myVersion }} - See full
      <a
        href="https://gitlab.adamprocter.co.uk/nn/nodenoggin/-/blob/main/CHANGELOG.md"
        >Changelog</a
      >
    </h3>

    <h3>Considerations</h3>
    <ul>
      <li>
        &nbsp;You may need to create a new microcosm to take advantage of new
        enhancements
      </li>
      <li>&nbsp;Data is not yet encrypted.</li>
      <li>&nbsp;There is no Export yet.</li>

      <li>
        Please
        <strong>UNDERSTAND</strong> all data as not backed up, data structures
        and data will ocasssionaly be deleted or changed remotely which may
        effect and break your local data. Please make a seperate copy (copy and
        paste into a local file)
      </li>
    </ul>
    <h2>Design-led ethical Edutech</h2>
    <ul>
      <li>
        &nbsp;
        <a href="https://discourse.adamprocter.co.uk">discuss</a>(and feedback)
      </li>
      <li>
        &nbsp;
        <a href="https://discursive.adamprocter.co.uk/categories/phd/"
          >discursive (phd catergory link)</a
        >
        (blog)
      </li>
      <li>
        &nbsp;
        <a href="https://researchnot.es">researchnot.es</a> (blog)
      </li>
      <li>
        &nbsp;
        <a href="https://manifold.soton.ac.uk">manifold</a> (writing)
      </li>
      <li>
        &nbsp;
        <a href="https://fragmentum.adamprocter.co.uk">fragmentum</a>
        (microcast)
      </li>
      <li>
        &nbsp;
        <a href="https://gitlab.adamprocter.co.uk/nn/">gitlab</a>
        (code)
      </li>
      <li>
        &nbsp;
        <a href="https://github.com/adamprocter/couchdoc-mirror/issues"
          >issues</a
        >
        (raise and review)
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'About',

  data: function () {
    return {}
  },
  computed: mapState({
    myVersion: (state) => state.version,
  }),
}
</script>

<style lang="css" scoped>
.about {
  margin-left: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
}
</style>
