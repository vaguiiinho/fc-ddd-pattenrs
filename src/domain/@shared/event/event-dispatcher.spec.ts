
import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLogWhenCustomerIsChangeAddressHandler from "../../customer/event/handler/envia-console-log-customer-is-change-address.handler";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-console-log1-customer-is-created.handler";
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-console-log2-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
        const eventHandler3 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
        const eventHandler4 = new EnviaConsoleLogWhenCustomerIsChangeAddressHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler4)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandler3)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
            .toMatchObject(eventHandler4)
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
        const eventHandler3 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
        const eventHandler4 = new EnviaConsoleLogWhenCustomerIsChangeAddressHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler4)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandler3)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
            .toMatchObject(eventHandler4)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler3)
        eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler4)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(0)
    })

    it("should unregister all event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        const eventHandler2 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
        const eventHandler3 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()

        const eventHandler4 = new EnviaConsoleLogWhenCustomerIsChangeAddressHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler4)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandler3)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
            .toMatchObject(eventHandler4)

        eventDispatcher.unregisterall()

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined()
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeUndefined()
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
        const eventHandler3 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
        const eventHandler4 = new EnviaConsoleLogWhenCustomerIsChangeAddressHandler()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle")
        const spyEventHandler4 = jest.spyOn(eventHandler4, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler4)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandler3)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
            .toMatchObject(eventHandler4)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        })


        const address = {
            street: "Street 1",
            number: 123,
            zip: "13330-250",
            city: "São Paulo"
        }

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: 1,
            name: "customer1",
            address: address
        })

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: customerCreatedEvent.eventData.id,
            name: customerCreatedEvent.eventData.name,
            address: {
                street: "Street 1 alterado",
                number: 1234,
                zip: "13330-123",
                city: "Rio Grande do Sul"
            }
        })

        eventDispatcher.notify(productCreatedEvent)
        eventDispatcher.notify(customerCreatedEvent)
        eventDispatcher.notify(customerChangeAddressEvent)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
        expect(spyEventHandler3).toHaveBeenCalled()
        expect(spyEventHandler4).toHaveBeenCalled()

    })
})