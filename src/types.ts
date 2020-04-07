// Functions and values to deal with 'primitive types' for the domain. In the case of emails, a string.
export type EmailValue = string;
export type EmailValueChangeHandler = (emails: EmailValue[]) => void;
export type EmailValidator = (value: EmailValue) => boolean;

// Internal representation of the Email object. The component
// is not necessarily tied to just emails. It works with any 'tag'
// that can be represented by an id, a value, and that can be both valid or invalid.
export interface Email {
    value: EmailValue;
    id: string;
    isValid: boolean;
}

export interface PublicApi {
    getEmails: () => EmailValue[];
    setEmails: (emails: EmailValue[]) => void;
    subscribe: (onChange: EmailValueChangeHandler) => void;
}

export interface PublicOptions {
    initialEmails?: EmailValue[];
    validator?: EmailValidator;
    placeholder?: string;
}

// API of DOM components.
export interface Component {
    remove: () => HTMLElement;
    render: () => HTMLElement;
    focus?: () => void;
}

// Internal callbacks and repository to store emails.
export type SubmitHandler = (emailValue: EmailValue) => void;
export type AddHandler = (emailValue: EmailValue) => void;
export type DeleteHandler = (emailId: Email['id']) => void;

export type EmailRepositoryChangeHandler = (emails: Email[]) => void;
export interface EmailRepositoryApi {
    validator: EmailValidator;
    getAllEmails: () => Email[];
    addEmail: AddHandler;
    deleteEmail: DeleteHandler;
    setEmails: (emails: EmailValue[]) => void;
    subscribe: (onChange: EmailRepositoryChangeHandler) => void;
}
