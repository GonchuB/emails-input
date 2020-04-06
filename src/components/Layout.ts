import {
    EmailRepositoryApi,
    Component,
    Email,
} from '../types';
import { IDS, CLASS_NAMES } from '../constants';
import { EmailList, EmailListApi } from './EmailList';
import { EmailField } from './EmailField';

export interface LayoutProps {
    repository: EmailRepositoryApi;
}

/**
If input has too many emails, user should be able to scroll it.
Pasted emails should be converted into blocks immediately. If multiple comma-separated emails are pasted (e.g., “ivan@mail.ru, max@mail.ru”), they should be converted into multiple blocks.
 */
export function Layout(props: LayoutProps): Component {
    const repository = props.repository;

    const layoutComponents: Record<string, Component> = {};
    const layoutContainer = document.createElement('div');
    layoutContainer.setAttribute('id', IDS.EMAILS_INPUT);
    layoutContainer.setAttribute('class', CLASS_NAMES.EMAILS_INPUT);

    function render(): HTMLElement {
        const emailField = EmailField({ emailValidator: repository.validator, onSubmit: repository.addEmail })
        layoutComponents.emailField = emailField;

        const emailList = EmailList({
            onDelete: repository.deleteEmail,
            emails: repository.getAllEmails(),
            emailField,
        });
        layoutComponents.emailList = emailList;
        layoutContainer.appendChild(emailList.render());

        return layoutContainer;
    }

    function remove(): void {
        if (layoutComponents.emailList) {
            layoutComponents.emailList.remove();
            layoutContainer.remove();
        }
    }

    props.repository.subscribe(function(emails: Email[]): void {
        (layoutComponents.emailList as EmailListApi).update(emails);
    });

    return { render, remove };
}
