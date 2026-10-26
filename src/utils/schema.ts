import { config } from 'zod/mini'

// Mini apps validate without generating code dynamically.
config({ jitless: true })

export type { ZodMiniType as Schema } from 'zod/mini'
export {
  array,
  boolean,
  enum as enumSchema,
  looseObject,
  optional,
  string,
  unknown,
} from 'zod/mini'
