import { z } from 'zod';

export const OptionsSchema = z.object({
  projectName: z.string().min(1),
  dir: z.string().min(1),            // куда писать (обычно ".")
  withIcons: z.boolean().default(false)
});

export type Options = z.infer<typeof OptionsSchema>;
