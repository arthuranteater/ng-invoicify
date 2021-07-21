export interface Error {
    [key: string]: string | undefined   
}

export interface Validation {
    [key: string]: {[key: string]: string | undefined }  
}

// Type '{ description: { required: string; minlength: string; maxlength: string; }; rate: { pattern: string; }; quanity: { pattern: string; }; amount: { pattern: string; }; }' is not assignable to type 'Validation'.
