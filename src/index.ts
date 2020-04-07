import { EmailValue, Email, PublicApi, PublicOptions, EmailValueChangeHandler } from './types';
import { EmailRepository } from './EmailRepository';
import { Layout } from './components/Layout';

import './styles.css';

const DEFAULT_EMAIL_REGEXP = /^.+@.+\..+$/;

let instanceCount = 0;

export function EmailsInput(node: HTMLElement, options: PublicOptions): PublicApi {
    instanceCount += 1;

    function defaultValidator(emailValue: EmailValue): boolean {
        return DEFAULT_EMAIL_REGEXP.test(emailValue);
    }
    const repository = EmailRepository(options.initialEmails || [], options.validator || defaultValidator);

    function getEmails(): EmailValue[] {
        return repository.getAllEmails().map(function (email: Email) {
            return email.value;
        });
    }
    function subscribe(callback: EmailValueChangeHandler): void {
        repository.subscribe(function (emails: Email[]) {
            callback(
                emails.map(function (email: Email) {
                    return email.value;
                }),
            );
        });
    }

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
