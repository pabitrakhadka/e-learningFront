import * as Yup from "yup";

// First Name Validation Schema
const NameValidate = () =>
    Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required").matches(/^[A-Za-z]+$/, "Must be only alphabetic characters")
// Email Validation Schema
const EmailValidate = () =>
    Yup.string()
        .email('Invalid email')
        .required('Required');
//String message validate
const stringMessageValidate = () => {
    return Yup.string()
        .min(5, "Too Short")
        .required("Required");
};

const passwordValidate = () => {
    return Yup.string()
        .min(8, "Password must be at least 8 characters") // Set minimum length to 8
        .max(32, "Password cannot exceed 32 characters") // Set maximum length to 32
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // Ensure at least 8 characters
            "Password must contain at least one letter and one number"
        )
        .required("Password is required"); // Make password a required field
};
const confirm_passwordValidate = () => {
    return Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required")
}

const registerSchama = Yup.object().shape({
    name: NameValidate(),
    email: EmailValidate(),
    address: stringMessageValidate(),
    password: passwordValidate(),
    confirm_password: confirm_passwordValidate(),
})

// Login Schema
const loginSchema = Yup.object().shape({
    email: EmailValidate(),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password cannot exceed 32 characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must contain at least one letter and one number"
        )
        .required("Password is required"),
});
//Quiz Schema
const categoryIdValidate = () => {
    return Yup.number()
        .typeError('Category ID must be a number') // Error if value is not a number
        .required('Category ID is required');
};



const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const newsSchema = Yup.object().shape({
    title: Yup.string()
        .required("Heading is required"),
    description: Yup.string()
        .required("Description is required"),
    category_id: Yup.number().required("Category is Required"),
    // image: Yup.mixed()
    //     .nullable()  // Allow null value
    //     .required("Image is required")  // Ensure the file is uploaded if not null
    //     .test(
    //         "fileSize",
    //         "File size is too large. Maximum size is 10MB",
    //         (value) => !value || (value && value.size <= FILE_SIZE)  // Validate file size
    //     )
    //     .test(
    //         "fileFormat",
    //         "Unsupported file format",
    //         (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))  // Validate file format
    //     ),
});

//Pdf file validate
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB

const pdfValidationSchema = Yup.object().shape({
    pdfFile: Yup.mixed()
        .required("A PDF file is required.")
        .test(
            "fileType",
            "Only PDF files are allowed.",
            (value) => value && value.type === "application/pdf"
        )
        .test(
            "fileSize",
            "File size must be less than 5MB.",
            (value) => value && value.size <= FILE_SIZE_LIMIT
        ),
    categoryId: categoryIdValidate()
});

//contact Schema
const contactSchema = Yup.object().shape({
    name: NameValidate(),
    email: EmailValidate(),
    subject: stringMessageValidate(),
    message: stringMessageValidate()
});


const categorySchema = Yup.object().shape({
    name: Yup.string().required("Category Name is Required"),
    description: Yup.string().nullable(),
});

const imagesSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    images: Yup.array()
        .of(
            Yup.mixed()
                .required("An image is required")
                .test("fileType", "Only image files are allowed", (value) =>
                    value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
                )
                .test("fileSize", "File size is too large (max 5MB)", (value) =>
                    value && value.size <= 5 * 1024 * 1024 // 5MB
                )
        )
        .min(1, "At least one image is required") // At least one image must be uploaded
        .max(5, "You can upload up to 5 images"), // Limit the number of images
});


const ebookSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required.')
        .min(3, 'Title should be at least 3 characters long.')
        .max(255, 'Title should be less than 255 characters long.'),
    author: Yup.string()
        .required('Author is required.')
        .min(3, 'Author name should be at least 3 characters long.')
        .max(255, 'Author name should be less than 255 characters long.'),
    description: Yup.string()
        .required('Description is required.')
        .min(10, 'Description should be at least 10 characters long.')
        .max(1000, 'Description should be less than 1000 characters long.'),
    pdf: Yup.mixed()
        .required('PDF file is required.')
        .test(
            'fileType',
            'Only PDF files are allowed.',
            (value) => value && value.type === 'application/pdf'
        )
        .test(
            'fileSize',
            'File size should not exceed 40MB.',
            (value) => value && value.size <= 40 * 1024 * 1024 // 5MB limit
        ),
});

const noticeSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required.')
        .min(3, 'Title should be at least 3 characters long.')
        .max(255, 'Title should be less than 255 characters long.'),
    content: Yup.string()
        .required('Content is required.')
        .min(10, 'Content should be at least 10 characters long.')
        .max(1000, 'Content should be less than 1000 characters long.'),
    pdf: Yup.mixed().optional()

        .test(
            'fileType',
            'Only PDF files are allowed.',
            (value) => value && value.type === 'application/pdf'
        )
        .test(
            'fileSize',
            'File size should not exceed 40MB.',
            (value) => value && value.size <= 40 * 1024 * 1024 // 5MB limit
        ),
});

const systemSettingSchemaYup = yup.object().shape({
    id: yup
        .number()
        .integer('ID must be an integer')
        .positive('ID must be a positive number')
        .required('ID is required'),
    key: yup
        .string()
        .min(1, 'Key must not be empty')
        .required('Key is required'),
    value: yup
        .string()
        .min(1, 'Value must not be empty')
        .required('Value is required'),
    description: yup.string(),
});
// Export Schemas
export { contactSchema, loginSchema, registerSchama, newsSchema, categorySchema, imagesSchema, ebookSchema, noticeSchema };
