import { z } from 'zod'
import { toLatinDigits } from '@/utils/format'

export const plateSchema = z
  .object({
    prefix: z.string().transform((v) => toLatinDigits(v)),
    suffix: z.string().transform((v) => toLatinDigits(v)),
    code: z.string().transform((v) => toLatinDigits(v)),
  })
  .superRefine((val, ctx) => {
    const okPrefix = /^\d{2}$/.test(val.prefix)
    const okSuffix = /^\d{3}$/.test(val.suffix)
    const okCode = /^\d{2}$/.test(val.code)
    if (!okPrefix || !okSuffix || !okCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'شماره پلاک مورد نظر را کامل کنید.',
      })
    }
  })

export type PlateFormInput = z.infer<typeof plateSchema>

export function validatePlate(input: PlateFormInput) {
  return plateSchema.safeParse(input)
}
