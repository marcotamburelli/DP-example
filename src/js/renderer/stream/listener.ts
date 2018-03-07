import { XLib } from 'hello';

interface Subscription {
  unsubscribe(): void;
}

export interface Message<P> {
  eventType: string;
  payload: P;
}

export interface GenericSubscriber<P> {
  next(value: P): any;
  error(err: Error): any;
  complete(value?: P): any;
}

export interface GenericObservable<P> {
  subscribe: (subscriber: GenericSubscriber<P>) => Subscription;
}

export type ProcessingFunction<P> = (payload: P) => (Listener<P> | void);

export interface Consumer<P> {
  [eventType: string]: ProcessingFunction<P>;
}

export class Listener<P> {
  private subscription: Subscription;
  private childListeners = new Map<ProcessingFunction<any>, Listener<any>>();
  private consumer = new Map<string, ProcessingFunction<P>>();

  static create<P>(stream: GenericObservable<Message<P>>) {
    return new Listener<P>(stream);
  }

  private constructor(private stream: GenericObservable<Message<P>>) {
    this.subscription = stream.subscribe({
      next: ({ eventType, payload }) => {
        const processingFunc = this.consumer.get(eventType);

        if (processingFunc) {
          this.childListeners.forEach(listener => listener && listener.dispose());

          const listener = processingFunc(payload);

          (listener instanceof Listener) && this.childListeners.set(processingFunc, listener);
        }
      },
      error: (e) => { },
      complete: () => { }
    });
  }

  dispose() {
    this.subscription && this.subscription.unsubscribe();
    this.childListeners.forEach(listener => listener && listener.dispose());
  }

  on(eventType: string) {
    return {
      execute: (func: ProcessingFunction<P>) => {
        this.consumer.set(eventType, func);
      }
    };
  }
}
