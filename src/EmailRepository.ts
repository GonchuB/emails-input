import { EmailValue, EmailRepositoryChangeHandler, EmailValidator, Email, EmailRepositoryApi } from './types';

export function EmailRepository(initialEmails: EmailValue[], validator: EmailValidator): EmailRepositoryApi {
    const subscriptors: EmailRepositoryChangeHandler[] = [];
    const store: {
        emailIds: Email['id'][];
        emails: Record<Email['id'], Email>;
    } = { emailIds: [], emails: {} };

    function getAllEmails(): Email[] {
        return store.emailIds.map(function (emailId: Email['id']): Email {
            return store.emails[emailId];
        });
    }
    function subscribe(callback: EmailRepositoryChangeHandler): void {
        subscriptors.push(callback);
    }
    function handleChange(): void {
        const emails = getAllEmails();
        subscriptors.forEach(function (onChange) {
            onChange(emails);
        });
    }
    function createEmail(emailValue: EmailValue): Email {
        return {
            id: emailValue,
            value: emailValue,
            isValid: validator(emailValue),
        };
    }
    function createEmailRecord(emailValues: EmailValue[]): Record<Email['id'], Email> {
        return emailValues.reduce(function (state, emailId) {
            return Object.assign(state, { [emailId]: createEmail(emailId) });
        }, {});
    }
    function setEmails(emailValues: EmailValue[]): void {
        store.emails = createEmailRecord(emailValues);
        store.emailIds = Array.from(emailValues);
        handleChange();
    }
    function addEmail(emailValue: EmailValue): void {
        const email = createEmail(emailValue);
        if (store.emailIds.indexOf(email.id) < 0) {
            store.emailIds = store.emailIds.concat([email.id]);
            store.emails[email.id] = email;
            handleChange();
        }
    }
    function deleteEmail(emailId: Email['id']): void {
        if (store.emailIds.indexOf(emailId) >= 0) {
            store.emailIds = store.emailIds.filter(function (id) {
                return emailId !== id;
            });
            delete store.emails[emailId];
            handleChange();
        }
    }

    setEmails(initialEmails);

    

    return {
        setEmails,
        getAllEmails,
        addEmail,
        deleteEmail,
        subscribe,
        validator,
    };
}
