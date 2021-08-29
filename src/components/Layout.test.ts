import * as Layout from "./Layout"
// @ponicode
describe("Layout.Layout", () => {
    test("0", () => {
        let object: any = [{ value: "Elio", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", isValid: false }, { value: "elio@example.com", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Dillenberg", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", isValid: true }, { value: "Dillenberg", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: true }, { value: "Dillenberg", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: true }]
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", repository: { validator: () => false, getAllEmails: () => object, addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "Michael" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object: any = [{ value: "elio@example.com", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Dillenberg", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: false }, { value: "Dillenberg", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: false }, { value: "Elio", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Elio", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: true }]
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "a85a8e6b-348b-4011-a1ec-1e78e9620782", repository: { validator: () => false, getAllEmails: () => object, addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "Michael" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object: any = [{ value: "elio@example.com", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: true }, { value: "Elio", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Dillenberg", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: false }, { value: "Elio", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: true }]
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", repository: { validator: () => false, getAllEmails: () => object, addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "Michael" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object: any = [{ value: "Elio", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", isValid: false }, { value: "Elio", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Elio", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: true }, { value: "Dillenberg", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", isValid: false }, { value: "elio@example.com", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: true }]
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "7289708e-b17a-477c-8a77-9ab575c4b4d8", repository: { validator: () => false, getAllEmails: () => object, addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "Edmond" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object: any = [{ value: "elio@example.com", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", isValid: true }, { value: "elio@example.com", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Elio", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Dillenberg", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", isValid: false }, { value: "Elio", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", isValid: false }]
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "7289708e-b17a-477c-8a77-9ab575c4b4d8", repository: { validator: () => true, getAllEmails: () => object, addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            Layout.Layout({ uniqueId: "", repository: { validator: () => true, getAllEmails: () => [], addEmail: () => undefined, deleteEmail: () => undefined, setEmails: () => undefined, subscribe: () => undefined }, placeholder: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})
