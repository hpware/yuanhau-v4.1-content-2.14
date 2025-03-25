<script setup lang="ts">
const alert = (msg: string) => {
  window.alert(msg);
};
</script>

<template>
  <div>
    <UploadButton
      :config="{
        endpoint: 'imageUploader',
        onClientUploadComplete: (file) => {
          console.log('uploaded', file);
          alert('Upload complete');
        },
        onUploadError: (error) => {
          console.error(error, error.cause);
          alert('Upload failed');
        },
      }"
    />
    <UploadDropzone
      :config="{
        endpoint: 'imageUploader',
        onClientUploadComplete: (file) => {
          console.log('uploaded', file);
          alert('Upload complete');
        },
        onUploadError: (error) => {
          console.error(error, error.cause);
          alert('Upload failed');
        },
      }"
    />
  </div>
</template>
