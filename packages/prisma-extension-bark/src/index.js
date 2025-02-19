import { Prisma } from '@prisma/client'

import * as find from './find/index.js'
import * as create from './create/index.js'
import * as deletes from './delete/index.js'
import * as operations from './operations/index.js'

/**
 * Initialize Bark as Prisma Extension
 *
 * @type {import('$types/index').withBark}
 */
export const withBark = (args) => Prisma.defineExtension((client) => {
	const extensionMethods = {
		...find,
		...create,
		...deletes,
		...operations,
	}

	return client.$extends({
		name: 'prisma-extension-bark',
		model: Object.fromEntries(args.modelNames.map(m => [m, extensionMethods])),
	})
})
