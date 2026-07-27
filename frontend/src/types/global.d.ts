interface Window {
  dataLayer: unknown[];

  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetIdOrEventName: string | Date,
    parameters?: Record<string, unknown>,
  ) => void;
}
