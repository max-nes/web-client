<template>
  <div class="request-attributes-viewer app__table">
    <table>
      <tbody>
        <tr>
          <td>{{ 'poll-requests.start-time-title' | globalize }}</td>
          <td>{{ request.startTime | formatCalendar }}</td>
        </tr>

        <tr>
          <td>{{ 'poll-requests.end-time-title' | globalize }}</td>
          <td>{{ request.endTime | formatCalendar }}</td>
        </tr>

        <tr>
          <td>{{ 'poll-requests.number-of-choices-title' | globalize }}</td>
          <td>{{ request.numberOfChoices }}</td>
        </tr>

        <tr>
          <td>{{ 'poll-requests.permission-type-title' | globalize }}</td>
          <td>
            {{ pollPermissionTypeTranslated }}
          </td>
        </tr>

        <tr>
          <td
            class="request-attributes-viewer__question"
            :colspan="isQuestionMaxLen ? 2 : 1"
          >
            {{ 'poll-requests.question-title' | globalize }}
            <template v-if="isQuestionMaxLen">
              <br>
              {{ request.question }}
            </template>
          </td>
          <template v-if="!isQuestionMaxLen">
            <td>
              {{ request.question }}
            </td>
          </template>
        </tr>
        <tr
          v-for="(choice, id) in request.choices"
          :key="id">
          <!-- eslint-disable-next-line max-len -->
          <td>{{ 'poll-requests.choice-title' | globalize({ number: choice.number }) }}</td>
          <td>{{ choice.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { PollRequest } from '@/js/records/requests/poll-request.record'
import { keyValues } from '@/key-values'

const QUESTION_MAX_LEN = 20

export default {
  name: 'request-attributes-viewer',
  props: {
    request: { type: PollRequest, required: true },
  },
  computed: {
    isQuestionMaxLen () {
      return this.request.question.length >= QUESTION_MAX_LEN
    },
    pollPermissionTypeTranslated () {
      let translationId

      switch (this.request.permissionType) {
        case keyValues.restrictedPollType:
          translationId = 'poll-requests.restricted-type-desc'
          break

        case keyValues.unrestrictedPollType:
          translationId = 'poll-requests.unrestricted-type-desc'
          break

        default:
          translationId = '[UNKNOWN_PERMISSION_TYPE]'
          break
      }

      return this.$options.filters.globalize(translationId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.request-attributes-viewer .request-attributes-viewer__question:last-child {
  text-align: left;
  white-space: normal;
}

.request-attributes-viewer tr td:last-child {
  text-align: right;
}
</style>
