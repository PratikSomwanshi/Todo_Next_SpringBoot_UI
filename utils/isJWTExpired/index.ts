import { TokenErrorCode } from "../enums";

export function isSessionExpired(code: string): boolean {
    switch (code) {
        case TokenErrorCode.EXPIRED:
            return true;
        case TokenErrorCode.INVALID:
            return true;
        case TokenErrorCode.NOT_FOUND:
            return true;
        default:
            return false;
    }
}
