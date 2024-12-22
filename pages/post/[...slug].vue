<template>
    <main>
      <ContentDoc>
        <template v-slot="{ doc }">
          <article>
            <h1>{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </article>
        </template>
        <template #not-found>
            <h1>沒有這個文章 >_<</h1>
        </template>
    </ContentDoc>
    </main>
</template>