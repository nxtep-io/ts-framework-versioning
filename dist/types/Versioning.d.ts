import { Logger } from 'ts-framework-common';
import { BaseRequest, BaseResponse } from "ts-framework";
export interface VersioningOptions {
    verbose?: boolean;
    current: string;
    minimum?: string;
    recommended?: string;
    header?: string;
    logger?: Logger;
    requestedHeader?: string;
    recommendedHeader?: string;
}
export default class Versioning {
    /**
     * The express middleware for handling Versioning using headers.
     *
     * @param req The request instance
     * @param res The response instance
     * @param next The reference to the middleware chain
     */
    static middleware(options: VersioningOptions): (req: BaseRequest, res: BaseResponse, next: Function) => void;
}
