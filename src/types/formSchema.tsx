import {z} from "zod";

const FormSchema = z.object({
    pal: z.string({
        required_error: "Please select a pal.",
    }),
})

export default FormSchema;