export type EmailValue = string;
export type EmailValueChangeHandler = (emails: EmailValue[]) => void;
export type EmailValidator = (value: EmailValue) => boolean;

export interface Email {
    value: EmailValue;
    id: string;
    isValid: boolean;
}

export type SubmitHandler = (emailValue: EmailValue) => void;
export type AddHandler = (emailValue: EmailValue) => void;
export type DeleteHandler = (emailId: Email['id']) => void;

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

export type EmailRepositoryChangeHandler = (emails: Email[]) => void;
export interface EmailRepositoryApi {
    validator: EmailValidator;
    getAllEmails: () => Email[];
    addEmail: AddHandler;
    deleteEmail: DeleteHandler;
    setEmails: (emails: EmailValue[]) => void;
    subscribe: (onChange: EmailRepositoryChangeHandler) => void;
}

export interface Component {
    remove: () => HTMLElement;
    render: () => HTMLElement;
    focus?: () => void;
}
