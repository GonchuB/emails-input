import { EmailValue, Email, PublicApi, PublicOptions, EmailValueChangeHandler } from './types';
import { EmailRepository } from './EmailRepository';
import { Layout } from './components/Layout';

import './styles.css';

export function EmailsInput(node: HTMLElement, options: PublicOptions): PublicApi {
    function defaultValidator(emailValue: EmailValue): boolean {
        return /^.+@.+\..+$/.test(emailValue);
    }
    const repository = EmailRepository(options.initialEmails || [], options.validator || defaultValidator);

    function getEmails(): EmailValue[] {
        return repository.getAllEmails().map(function (email: Email) {
            return email.value;
        });
    }
    function subscribe(callback: EmailValueChangeHandler): void {
      repository.subscribe(function (emails: Email[]) {
          callback(emails.map(function (email: Email){
            return email.value;
          }));
        })
    }

    const layoutElement = Layout({ node, repository });
    node.appendChild(layoutElement.render());

    return {
        getEmails,
        setEmails: repository.setEmails,
        subscribe,
    };
}

function isEmailValid(email: string): boolean {
  return /^.+@.+\..+$/.test(email);
}

const inputContainerNode = document.querySelector("#emails-input");
const emailsInput = EmailsInput(inputContainerNode as HTMLElement, { initialEmails: ['admin@example.com', 'asd.com', 'bienvenido@gmail.com', 'admin@@', 'azucar@ysabor.com'], validator: isEmailValid });

document.querySelector("#button-add")?.addEventListener('click', function onButtonAddClick() {
  const email =
    (Math.random().toString(36) + "00000000000000000").slice(2, 12) +
    "@" +
    (Math.random() > 0.2 ? "domain" : "") +
    ".com";

  const allEmails = emailsInput.getEmails();
  emailsInput.setEmails(allEmails.concat([email]));
});

document.querySelector("#button-get")?.addEventListener('click', function onButtonGetClick() {
  const validEmailsCount = emailsInput.getEmails().filter(function(email) {
    return isEmailValid(email);
  }).length;

  alert(validEmailsCount);
});