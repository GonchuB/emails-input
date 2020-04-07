import { EmailValue, Email, PublicApi, PublicOptions, EmailValueChangeHandler } from './types';
import { EmailRepository } from './EmailRepository';
import { Layout } from './components/Layout';

import './styles.css';

const DEFAULT_EMAIL_REGEXP = /^.+@.+\..+$/;

// Keep count of the times EmailsInput was called. Use it to make sure each id is unique in the dom.
let instanceCount = 0;

export function EmailsInput(node: HTMLElement, options: PublicOptions): PublicApi {
    instanceCount += 1;

    function defaultValidator(emailValue: EmailValue): boolean {
        return DEFAULT_EMAIL_REGEXP.test(emailValue);
    }
    const repository = EmailRepository(options.initialEmails || [], options.validator || defaultValidator);

    // Adapt internal representation to expected value type
    function emailValue(email: Email): EmailValue {
        return email.value;
    }
    function getEmails(): EmailValue[] {
        return repository.getAllEmails().map(emailValue);
    }
    function subscribe(callback: EmailValueChangeHandler): void {
        repository.subscribe(function (emails: Email[]): void {
            callback(emails.map(emailValue));
        });
    }

    // Create layout and append to node.
    const layoutElement = Layout({
        repository,
        placeholder: options.placeholder,
        uniqueId: '--' + instanceCount.toString(),
    });
    node.appendChild(layoutElement.render());

    return {
        getEmails,
        setEmails: repository.setEmails,
        subscribe,
    };
}

declare global {
    interface Window {
        EmailsInput: (node: HTMLElement, options: PublicOptions) => PublicApi;
    }
}

window.EmailsInput = EmailsInput;
