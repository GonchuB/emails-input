# emails input

A 4KB emails input component.

![emails-input](https://user-images.githubusercontent.com/857221/78660447-5f41d480-78cd-11ea-8549-77c8e44cb390.png)

## Live demos

Using [Netlify](https://www.netlify.com/)

- Single input https://adoring-hamilton-929e1b.netlify.com/
- Multiple inputs https://adoring-hamilton-929e1b.netlify.com/multipleInputs

## API

### EmailsInput function

The `EmailsInput` function accepts 2 parameters:

- `node` (required): entry point of the emails input. The component will attach itself to this DOM node.
- `options` (required): options object to customise the component
- `options.initialEmails` (optional): an array of strings to be used as initial data. Defaults to `[]`
- `options.validator` (optional): a validator function that, given a string, returns true if the string is a valid email, false otherwise. Defaults to testing the regular expression `/^.+@.+\..+$/`.
- `options.placeholder` (optional): the placeholder that will be used for the input element. Defaults to `'add more people...'`

### EmailsInput instance methods

The `EmailsInput` component exposes 3 methods in its public API:

- `getEmails(): string[]`: A method to get all entered emails. Both valid and invalid.
- `setEmails(emails: string[]): void`: A method to replace all entered emails with new ones.
- `subscribe(callback: (emails: string[]) => void): void`: Ability to subscribe for emails list changes.

### Example usage

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
    
    document.querySelector("#button-get").addEventListener('click', function onButtonGetClick() {
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

### Bundle size

![bundle-size](https://user-images.githubusercontent.com/857221/78660242-0f630d80-78cd-11ea-9860-dc486ccca898.png)

### Pasting 50 csv emails

![paste-50](https://user-images.githubusercontent.com/857221/78581134-c14dfb80-7833-11ea-9e75-9e60374704b7.jpg)

### Pasting 1,000 csv emails

![paste-1000](https://user-images.githubusercontent.com/857221/78581127-be530b00-7833-11ea-8940-e882c401afc3.jpg)

### After removing the 1,000 emails

![remove-1000](https://user-images.githubusercontent.com/857221/78587405-2eb25a00-783d-11ea-8a50-23607e865b96.png)

## Improvements

Things that can be changed to improve the current codebase and/or performance:

- Minify css class names. With a minimal css-in-js solution, or using the same hash function in runtine (call function with base class name instead of just using the class name) as in build time (pre-process css class names).
- When adding or removing elements using the ui, use an ad-hoc reaction that won't update the full list of emails (trying to find the "deleted emails" currently iterates over the list of rendered components to check if they were delete).
- Use the `Component` abstraction to take care of manipulating the dom, adding and removing event listeners, etc. Not necessarily related to performance, but having DOM manipulation done in one place only helps reduce memory leaks. By abstracting the DOM under a `Component` interface, it can be changed in isolation in the future, optimised, etc.
- Avoid prop drilling. Although the current tree is quite shallow, prop drilling usually turns into a mess. If more options or properties are needed, consider having something shared between components to handle different configurations.

## Building the repo

```shell
npm run build
```

## Building to `public`

Builds the js and moves it to the `./public` folder.

```shell
npm run build:public
```

## Running tests

```shell
npm run test
```

## Running the demo locally

First, build the `emails-input.js` bundle and move it to the `public` folder:
```shell
npm run build:public
```

Use a static file server to serve the contents of `public`:
```shell
# Using serve
npx serve public
# or using python
cd public && python -m SimpleHTTPServer 5000
```