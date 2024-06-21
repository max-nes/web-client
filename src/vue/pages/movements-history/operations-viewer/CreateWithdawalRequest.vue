<template>
  <tbody>
    <!--TODO: no details info at this moment-->
  </tbody>
</template>

<script>
import { CreateWithdrawRequestOp } from '@/js/records/operation-details/create-withdrawal-request'

export default {
  props: {
    operationDetails: {
      type: CreateWithdrawRequestOp,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../attributes-viewer';
</style>
