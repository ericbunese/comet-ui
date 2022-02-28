export class ValidationError {
    public detail: ValidationErrorDetail[] = [];
}

class ValidationErrorDetail {
    public loc: string[] = [];
    public msg: string | null = null;
    public type: string | null = null;
}