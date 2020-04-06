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

    function remove() {
        console.log('remove');
    }

    props.repository.subscribe(function(emails: Email[]): void {
        (layoutComponents.emailList as EmailListApi).update(emails);
    });

    return { render, remove };
}
