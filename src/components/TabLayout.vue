<template>
  <div class="tabLayout" ref="tabLayout" @click="verifyChild($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabLayout",
  data() {
    return {
      current: 1,
      lastItemIndex: null
    }
  },
  methods: {
    verifyChild(e) {
      let tabLayout = this.$refs.tabLayout;
      for (let i = 0; i < tabLayout.children.length; i++) {
        let child = tabLayout.children[i];
        if (child.contains(e.target)) {
          this.toggleTab(i, child)
        }
      }
    },
    toggleTab(index, node) {
      this.lastItemIndex = this.current
      this.$emit('changeTab', index)
      let tabLayout = this.$refs.tabLayout;
      let winWidth = window.innerWidth;
      if (node) {
        let liLeft = node.offsetLeft,
            liWidth = node.offsetWidth,
            liCenter = (winWidth - liWidth) / 2,
            liTarget = liLeft - liCenter;

        tabLayout.scrollTo({left: liTarget, top: 0, behavior: 'smooth'});
        // tabLayout.scrollLeft = liTarget;

      }
    },
  },
};
</script>
<style scoped>

.tabLayout {
  display: flex;
  height: auto;
  white-space: nowrap;
  overflow: scroll;
}

.tabLayout::-webkit-scrollbar {
  display: none;
}


</style>
