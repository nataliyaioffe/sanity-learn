import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({context, event}) => {
  try {
    await createClient({
      ...context.clientOptions,
      useCdn: false,
      apiVersion: '2025-05-08',
    })
    // Patch is a method on the client that allows us to update a document
    // setIfMissing is a method that sets a value if the field is missing
    // commit is a method that commits the patch to the Content Lake
    // dryRun is a boolean that indicates if the patch should be committed to the Content Lake
    // context.local is a boolean that indicates if the patch should be committed to the Content Lake
      .patch(event.data._id)
      .setIfMissing({
        firstPublished: new Date().toISOString(),
      })
      .commit({dryRun: context.local})
    console.log(context.local ? 'Dry run:' : 'Updated:', `firstPublished set on ${event.data._id}`)
  } catch (error) {
    console.error(error)
  }
})