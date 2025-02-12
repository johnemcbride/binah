import { FaceSessionOptions, HealthMonitorSession } from './session.types';
export declare class SessionFactory {
    static createFaceSession({ input, cameraDeviceId, onFaceDetected, processingTime, onVitalSign, onFinalResults, onError, onWarning, onStateChange, orientation, subjectDemographic, }: FaceSessionOptions): Promise<HealthMonitorSession>;
    private static createCamera;
}
