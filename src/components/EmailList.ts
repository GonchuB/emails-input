import {
    DeleteHandler,
    Email,
    Component,
} from '../types';
import { IDS, CLASS_NAMES } from '../constants';
import { EmailTag } from './EmailTag';

interface EmailListProps {
    onDelete: DeleteHandler;
    emails: Email[];
    emailField: Component;
}

export interface EmailListApi extends Component {
    update: (emails: EmailListProps['emails']) => HTMLElement;
}

export function EmailList(props: EmailListProps): EmailListApi {
    const emailComponents: Record<string, Component> = {};
    const listContainer = document.createElement('div');
    listContainer.setAttribute('id', IDS.EMAIL_LIST_CONTAINER);
    listContainer.setAttribute('class', CLASS_NAMES.EMAILS_INPUT_CONTAINER);

    const emailFieldElement: HTMLElement = props.emailField.render();

    function removeEmail(emailId: Email['id']): void {
        emailComponents[emailId].remove();
        delete emailComponents[emailId];
    }
    function render(): HTMLElement {
        props.emails.forEach(function (email: Email) {
            const emailComponent = EmailTag({ onDelete: props.onDelete, email });
            emailComponents[email.id] = emailComponent;
            listContainer.appendChild(emailComponent.render());
        });

        listContainer.append(emailFieldElement);
        return listContainer;
    }
    function update(emails: Email[]): HTMLElement {
        const newEmails = emails.filter(function (email) {
            return !emailComponents[email.id];
        });
        newEmails.forEach(function (email: Email) {
            const emailComponent = EmailTag({ onDelete: removeEmail, email });
            emailComponents[email.id] = emailComponent;
            listContainer.insertBefore(emailComponent.render(), emailFieldElement);
        });
        const toDelete = Object.keys(emailComponents).filter(function (emailId) {
            return emails.findIndex(function (email) {
                return email.id === emailId;
            }) < 0;
        });
        toDelete.forEach(function(emailId) {
            removeEmail(emailId)
        });
        return listContainer;
    }
    function remove(): void {
        Object.keys(emailComponents).forEach(function (emailId: Email['id']) {
            removeEmail(emailId);
        });
    }

    return {
        render,
        remove,
        update,
    };
}