<script setup lang="ts">

interface Props {
	title: string;
	okButtonText: string;
	cancelButtonText: string;
  isLoading: boolean;
}

const { title, okButtonText, cancelButtonText, isLoading } = defineProps<Props>()

const emit = defineEmits([ 'run-file-upload', 'close-upload-modal' ])

</script>
<template>
  <div className="upload-modal">
    <div className="upload-modal__container">
      <h4 className="upload-modal__title">{{ title }}</h4>
      <div className="upload-modal__content">
        <slot name="uploadModal"></slot>
      </div>
      <div className="upload-modal__buttons">
        <span
          v-if="cancelButtonText && !isLoading"
          @click="emit('close-upload-modal')"
          className="upload-modal__button upload-modal__button--cancel"
        >
          {{ cancelButtonText }}
        </span>

        <span
          v-if="okButtonText && !isLoading"
          @click="emit('run-file-upload')"
          className="upload-modal__button upload-modal__button--ok"
        >
          {{ okButtonText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.upload-modal {
  position: absolute;
  display: flex;
  background: rgba(0,0,0,0.4);
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;

  &__container {
    padding: 24px 24px 12px 24px;
    background-color: white;
    font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.9);
    flex-basis: 75%;
    max-width: 350px;

    .upload-modal__title {
      color: $primary-text-color;
      font-size: 20px;
      line-height: 20px;
      font-weight: 500;
      text-align: center;
    }

    .upload-modal__content {
      max-height: 24rem;
      margin-top: $spacer-2;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .upload-modal__buttons {
      display: flex;
      justify-content: center;
      margin-top: $spacer;

      .upload-modal__button {
        margin-left: 8px;
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.3px;
        cursor: pointer;
      }

      .upload-modal__button--cancel:hover {
        background: rgb(232, 230, 230);
      }

      .upload-modal__button--ok {
        color: red;
      }

      .upload-modal__button--ok:hover {
        background: rgb(248, 233, 233);
      }
    }
  }
}
</style>