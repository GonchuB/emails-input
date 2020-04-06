import { EmailList, EmailListApi } from '../components/EmailList';
import { DeleteHandler } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function (): void {};
const defaultNode = document.createElement('div');
defaultNode.setAttribute('id', 'default-node');
const defaultEmailField = {
    render: function (): HTMLElement {
        const element = document.createElement('div');
        element.setAttribute('id', 'email-field');
        return element;
    },
    remove: noop,
};

function createTestComponent({
    onDelete = noop as DeleteHandler,
    emails = [{ id: 'email@example.com', value: 'email@example.com', isValid: true }],
    emailField = defaultEmailField,
}): EmailListApi {
    return EmailList({
        onDelete,
        emails,
        emailField,
    });
}

describe('EmailList component', function () {
    describe('render', function () {
        it('creates the correct container', function () {
            const emailList = createTestComponent({ emails: [] });

            const emailListElement = emailList.render();

            expect(emailListElement.getAttribute('id')).toEqual('emails-input-container');
            expect(emailListElement.getAttribute('class')).toEqual('emails-input--container');
        });

        it('appends a list of emails and the email field', function () {
            const emailList = createTestComponent({
                emails: [
                    { id: 'email@example.com', value: 'email@example.com', isValid: true },
                    { id: 'asd.com', value: 'asd.com', isValid: false },
                ],
            });

            const emailListElement = emailList.render();

            const [firstEmailTag, secondEmailTag, emailField] = emailListElement.children;
            expect(firstEmailTag.getAttribute('id')).toEqual('emails-input-tag-email@example.com');
            expect(secondEmailTag.getAttribute('id')).toEqual('emails-input-tag-asd.com');
            expect(emailField.getAttribute('id')).toEqual('email-field');
        });

        it('appends the email field and handles and empty email list', function () {
            const emailList = createTestComponent({ emails: [] });

            const emailListElement = emailList.render();

            const [emailField] = emailListElement.children;
            expect(emailField.getAttribute('id')).toEqual('email-field');
        });
    });
    describe('remove', function () {
        it('removes the email tags from the dom', function () {
            const emailList = createTestComponent({
                emails: [
                    { id: 'email@example.com', value: 'email@example.com', isValid: true },
                    { id: 'asd.com', value: 'asd.com', isValid: false },
                ],
            });

            const emailListElement = emailList.render();
            emailList.remove();

            const [emailField] = emailListElement.children;
            expect(emailField.getAttribute('id')).toEqual('email-field');
        });
    });
    describe('update', function () {
        it('appends a list of emails', function () {
            const emailList = createTestComponent({
                emails: [
                    { id: 'email@example.com', value: 'email@example.com', isValid: true },
                    { id: 'asd.com', value: 'asd.com', isValid: false },
                ],
            });

            const emailListElement = emailList.render();

            const newEmails = [
                { id: 'email@example.com', value: 'email@example.com', isValid: true },
                { id: 'asd.com', value: 'asd.com', isValid: false },
                { id: 'new@domain.com', value: 'new@domain.com', isValid: true },
                { id: 'admin@force.com', value: 'admin@force.com', isValid: true },
            ];
            emailList.update(newEmails);

            const children = emailListElement.children;
            [
                'emails-input-tag-email@example.com',
                'emails-input-tag-asd.com',
                'emails-input-tag-new@domain.com',
                'emails-input-tag-admin@force.com',
            ].forEach(function (expectedId, index) {
                expect(children[index].getAttribute('id')).toEqual(expectedId);
            });
            expect(children[4].getAttribute('id')).toEqual('email-field');
        });

        it('removes emails not present in the new list', function () {
            const emailList = createTestComponent({
                emails: [
                    { id: 'email@example.com', value: 'email@example.com', isValid: true },
                    { id: 'asd.com', value: 'asd.com', isValid: false },
                ],
            });

            const emailListElement = emailList.render();

            const newEmails = [
                { id: 'new@domain.com', value: 'new@domain.com', isValid: true },
                { id: 'admin@force.com', value: 'admin@force.com', isValid: true },
            ];
            emailList.update(newEmails);

            const children = emailListElement.children;
            ['emails-input-tag-new@domain.com', 'emails-input-tag-admin@force.com'].forEach(function (
                expectedId,
                index,
            ) {
                expect(children[index].getAttribute('id')).toEqual(expectedId);
            });
            expect(children[2].getAttribute('id')).toEqual('email-field');
        });

        it('does not append emails that are already present', function () {
            const emailList = createTestComponent({
                emails: [
                    { id: 'email@example.com', value: 'email@example.com', isValid: true },
                    { id: 'asd.com', value: 'asd.com', isValid: false },
                ],
            });

            const emailListElement = emailList.render();

            const newEmails = [
                { id: 'email@example.com', value: 'email@example.com', isValid: true },
                { id: 'asd.com', value: 'asd.com', isValid: false },
            ];
            emailList.update(newEmails);

            const children = emailListElement.children;
            ['emails-input-tag-email@example.com', 'emails-input-tag-asd.com'].forEach(function (expectedId, index) {
                expect(children[index].getAttribute('id')).toEqual(expectedId);
            });
            expect(children[2].getAttribute('id')).toEqual('email-field');
        });
    });
});
