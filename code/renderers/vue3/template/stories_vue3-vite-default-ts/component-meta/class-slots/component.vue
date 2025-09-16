<script lang="ts">
import type { VNode } from 'vue';

export default {} as new () => {
  $slots: {
    default(_: { num: number }): VNode[];
    foo(_: { str: string }): VNode[];
  };
};
</script>
