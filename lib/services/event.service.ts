
export interface IEventService {
  addEventListener(
    event: string,
    handler: () => void
  ): void;
  removeEventListener(
    event: string,
    handler: () => void
  ): void;
  dispatchEvent(event: string): void;
}


export class BrowserEventService implements IEventService {
  addEventListener(event: string, handler: () => void): void {
    if (typeof window !== "undefined") {
      window.addEventListener(event, handler);
    }
  }

  removeEventListener(event: string, handler: () => void): void {
    if (typeof window !== "undefined") {
      window.removeEventListener(event, handler);
    }
  }

  dispatchEvent(event: string): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(event));
    }
  }
}


