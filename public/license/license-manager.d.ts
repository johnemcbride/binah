import { LicenseOptions } from './license.types';
import { HealthMonitorCodes } from '../health-monitor-codes';
export declare class LicenseManager {
    private licenseData;
    private onEnabledVitalSigns;
    private onOfflineMeasurement;
    private onActivation;
    private onLicenseError;
    init({ licenseKey, productId, licenseInfo, onLicenseError, }: LicenseOptions): Promise<void>;
    update(): Promise<void>;
    isMeasuringAllowed(): boolean;
    sendInfoMessages(): void;
    calculateSecondsToEnd(): number;
    getLicenseStatus(): HealthMonitorCodes;
    private goToServer;
    private handleServerResponse;
    throwIfInvalidLicenseFormat(licenseKey: any, productId: any): void;
}
