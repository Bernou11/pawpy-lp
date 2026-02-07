import { config } from '../config.js';
import { SenderNetSubscriber } from '../types.js';

type HeadersInit = Record<string, string> | [string, string][] | Headers;

class SenderService {
    private readonly baseUrl = 'https://api.sender.net/v2';
    private readonly headers: HeadersInit;

    constructor() {
        this.headers = {
            'Authorization': `Bearer ${config.SENDER_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    async addToTempGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID],
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to add subscriber to temp group: ${error}`);
        }
    }

    async removeFromTempGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID]
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to remove subscriber from temp group: ${error}`);
        }
    }

    async removeFromNewsletterGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_NEWSLETTER_GROUP_ID]
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to remove subscriber from newsletter group: ${error}`);
        }
    }

    async moveToNewsletterGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_NEWSLETTER_GROUP_ID],
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to move subscriber to newsletter group: ${error}`);
        }
    }
}

export const senderNetService = new SenderService();