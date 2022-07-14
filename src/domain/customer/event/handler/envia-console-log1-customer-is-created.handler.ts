import EventHandlerInterface from "../../../@shared/event/event-hadler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1WhenCustomerIsCreatedHandler
    implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}