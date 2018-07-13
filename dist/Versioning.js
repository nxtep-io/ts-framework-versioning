"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver = require("semver");
const ts_framework_1 = require("ts-framework");
class Versioning {
    /**
     * The express middleware for handling Versioning using headers.
     *
     * @param req The request instance
     * @param res The response instance
     * @param next The reference to the middleware chain
     */
    static middleware(options) {
        if (options.verbose) {
            ts_framework_1.Logger.info(`Initializing server middleware: Versioning`);
        }
        return (req, res, next) => {
            // Add the current server version to the response
            res.set(options.header || 'X-API-Version', options.current);
            // Get requested version from header
            const requestedVersion = req.header(options.requestedHeader || 'X-API-Requested-Version');
            if (requestedVersion && !semver.valid(requestedVersion)) {
                // Could not recognize the semver requested version
                throw new ts_framework_1.HttpError(`Invalid requested version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
            }
            else if (requestedVersion && semver.lt(options.current, requestedVersion)) {
                throw new ts_framework_1.HttpError(`Unsupported version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
            }
            else if (requestedVersion && !semver.satisfies(requestedVersion, options.current)) {
                // Check if the version satisfies the current one
                if (options.minimum && !semver.gte(requestedVersion, options.minimum)) {
                    res.set(options.recommendedHeader || 'X-API-Recommended-Version', options.recommended);
                    throw new ts_framework_1.HttpError(`Unsupported version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
                }
                else if (options.recommended && !semver.gte(requestedVersion, options.recommended)) {
                    res.set(options.recommendedHeader || 'X-API-Recommended-Version', options.recommended);
                }
            }
            // Continue the request
            next();
        };
    }
}
exports.default = Versioning;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9WZXJzaW9uaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBQ2pDLCtDQUFzRjtBQVl0RjtJQUNFOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEIscUJBQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWMsRUFBRSxFQUFFO1lBQzdELGlEQUFpRDtZQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxvQ0FBb0M7WUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLElBQUkseUJBQXlCLENBQUMsQ0FBQztZQUUxRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELG1EQUFtRDtnQkFDbkQsTUFBTSxJQUFJLHdCQUFTLENBQUMsOEJBQThCLGdCQUFnQixFQUFFLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ25JLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNLElBQUksd0JBQVMsQ0FBQyx3QkFBd0IsZ0JBQWdCLEVBQUUsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsaURBQWlEO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSwyQkFBMkIsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZGLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHdCQUF3QixnQkFBZ0IsRUFBRSxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDN0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksMkJBQTJCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RixDQUFDO1lBQ0gsQ0FBQztZQUVELHVCQUF1QjtZQUN2QixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQXZDRCw2QkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJztcbmltcG9ydCB7IExvZ2dlciwgSHR0cEVycm9yLCBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBIdHRwQ29kZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcblxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uaW5nT3B0aW9ucyB7XG4gIHZlcmJvc2U/OiBib29sZWFuO1xuICBjdXJyZW50OiBzdHJpbmc7XG4gIG1pbmltdW0/OiBzdHJpbmc7XG4gIHJlY29tbWVuZGVkPzogc3RyaW5nO1xuICBoZWFkZXI/OiBzdHJpbmc7XG4gIHJlcXVlc3RlZEhlYWRlcj86IHN0cmluZztcbiAgcmVjb21tZW5kZWRIZWFkZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25pbmcge1xuICAvKipcbiAgICogVGhlIGV4cHJlc3MgbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgVmVyc2lvbmluZyB1c2luZyBoZWFkZXJzLlxuICAgKiBcbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcmVzIFRoZSByZXNwb25zZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbmV4dCBUaGUgcmVmZXJlbmNlIHRvIHRoZSBtaWRkbGV3YXJlIGNoYWluXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1pZGRsZXdhcmUob3B0aW9uczogVmVyc2lvbmluZ09wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBMb2dnZXIuaW5mbyhgSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBWZXJzaW9uaW5nYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBzZXJ2ZXIgdmVyc2lvbiB0byB0aGUgcmVzcG9uc2VcbiAgICAgIHJlcy5zZXQob3B0aW9ucy5oZWFkZXIgfHwgJ1gtQVBJLVZlcnNpb24nLCBvcHRpb25zLmN1cnJlbnQpO1xuXG4gICAgICAvLyBHZXQgcmVxdWVzdGVkIHZlcnNpb24gZnJvbSBoZWFkZXJcbiAgICAgIGNvbnN0IHJlcXVlc3RlZFZlcnNpb24gPSByZXEuaGVhZGVyKG9wdGlvbnMucmVxdWVzdGVkSGVhZGVyIHx8ICdYLUFQSS1SZXF1ZXN0ZWQtVmVyc2lvbicpO1xuXG4gICAgICBpZiAocmVxdWVzdGVkVmVyc2lvbiAmJiAhc2VtdmVyLnZhbGlkKHJlcXVlc3RlZFZlcnNpb24pKSB7XG4gICAgICAgIC8vIENvdWxkIG5vdCByZWNvZ25pemUgdGhlIHNlbXZlciByZXF1ZXN0ZWQgdmVyc2lvblxuICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKGBJbnZhbGlkIHJlcXVlc3RlZCB2ZXJzaW9uOiAke3JlcXVlc3RlZFZlcnNpb259YCwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNULCB7IGN1cnJlbnQ6IG9wdGlvbnMuY3VycmVudCB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdGVkVmVyc2lvbiAmJiBzZW12ZXIubHQob3B0aW9ucy5jdXJyZW50LCByZXF1ZXN0ZWRWZXJzaW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKGBVbnN1cHBvcnRlZCB2ZXJzaW9uOiAke3JlcXVlc3RlZFZlcnNpb259YCwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNULCB7IGN1cnJlbnQ6IG9wdGlvbnMuY3VycmVudCB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdGVkVmVyc2lvbiAmJiAhc2VtdmVyLnNhdGlzZmllcyhyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLmN1cnJlbnQpKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2ZXJzaW9uIHNhdGlzZmllcyB0aGUgY3VycmVudCBvbmVcbiAgICAgICAgaWYgKG9wdGlvbnMubWluaW11bSAmJiAhc2VtdmVyLmd0ZShyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLm1pbmltdW0pKSB7XG4gICAgICAgICAgcmVzLnNldChvcHRpb25zLnJlY29tbWVuZGVkSGVhZGVyIHx8ICdYLUFQSS1SZWNvbW1lbmRlZC1WZXJzaW9uJywgb3B0aW9ucy5yZWNvbW1lbmRlZCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihgVW5zdXBwb3J0ZWQgdmVyc2lvbjogJHtyZXF1ZXN0ZWRWZXJzaW9ufWAsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCwgeyBjdXJyZW50OiBvcHRpb25zLmN1cnJlbnQgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZWNvbW1lbmRlZCAmJiAhc2VtdmVyLmd0ZShyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLnJlY29tbWVuZGVkKSkge1xuICAgICAgICAgIHJlcy5zZXQob3B0aW9ucy5yZWNvbW1lbmRlZEhlYWRlciB8fCAnWC1BUEktUmVjb21tZW5kZWQtVmVyc2lvbicsIG9wdGlvbnMucmVjb21tZW5kZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbnRpbnVlIHRoZSByZXF1ZXN0XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9XG59Il19