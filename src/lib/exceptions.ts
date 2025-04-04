export class XAIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'XAIError'
  }
} 