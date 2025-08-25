import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    // This function is not ideal because it runs on every publish event
    // defineDocumentFunction({name: 'first-published', event: {on: ['publish']}}), 

    // This function is ideal because it only runs on publish events for events that don't already have a first published date
    defineDocumentFunction({
      name: 'first-published',
      event: {
        on: ['publish'],
        filter: '_type == "event" && !defined(firstPublished)',
      },
    }),
  ],
})
