export interface SubscribeRequest {
    email: string;
}

export interface SubscribeResponse {
    success: boolean;
}

export interface ErrorResponse {
    error: string;
}

export interface PendingConfirmation {
    email: string;
    timestamp: number;
    expiresAt: number;
    reminderSent: boolean;
    reminderTimeout?: NodeJS.Timeout;
}

export interface SenderNetSubscriber {
    email: string;
    groups: string[];
}

export interface EmailConfig {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export interface EnvConfig {
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_SECURE: boolean;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
    SENDER_API_KEY: string;
    SENDER_TEMP_GROUP_ID: string;
    SENDER_NEWSLETTER_GROUP_ID: string;
    APP_URL: string;
    FRONTEND_URL: string;
}