# emails input

An emails input component.

## Live demo

https://adoring-hamilton-929e1b.netlify.com/

## API

```html
<!-- Your markup with buttons, headers, etc -->
<script src="./emails-input.js"></script>
<script>
    function isEmailValid(email) {
        return /^.+@.+\..+$/.test(email);
    }
    
    const inputContainerNode = document.querySelector("#emails-input"); // <- your entry point for the component
    const emailsInput = EmailsInput(inputContainerNode, { initialEmails: ['admin@example.com'], validator: isEmailValid });
    
    document.querySelector("#button-add").addEventListener('click', function onButtonAddClick() {
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
</script>
```

## Solution design

Disclaimer: this is not using strict UML, rather using some of its diagrams to give an idea of the design.

![UML-diagram](https://user-images.githubusercontent.com/857221/78648384-2ea56f00-78bc-11ea-930c-48d30784f9fa.png)

## Performance

### Pasting 50 csv emails
![paste-50](https://user-images.githubusercontent.com/857221/78581134-c14dfb80-7833-11ea-9e75-9e60374704b7.jpg)

### Pasting 1,000 csv emails
![paste-1000](https://user-images.githubusercontent.com/857221/78581127-be530b00-7833-11ea-8940-e882c401afc3.jpg)

### After removing the 1,000 emails
![remove-1000](https://user-images.githubusercontent.com/857221/78587405-2eb25a00-783d-11ea-8a50-23607e865b96.png)

## Building the repo

```shell
npm run build
```

## Building to `public`

Builds the js and moves it to the `./public` folder.

```shell
npm run build:public
```