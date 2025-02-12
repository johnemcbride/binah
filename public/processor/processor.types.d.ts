import { FrameData } from '../common/types';
import { HealthMonitorSessionMode, OnFaceDetected, OnVitalSign, OnFinalResults, OnError, OnWarning, SubjectDemographic } from '../session/session.types';
import { LogAlgoMeasurements, SdkLoggerType } from '../logger/logger.types';
import { MonitorFeatures } from '@binah/wasm';
import { DeviceOrientation } from '../device/types';
export declare enum ProcessorState {
    IDLE = 0,
    PROCESSING = 1,
    STOPPING = 2,
    CLOSED = 3
}
export interface HealthMonitorProcessor {
    start(): void;
    stop(withReport: boolean): void;
    close(): void;
    process(frameData: FrameData): void;
    setErrorListener(onError?: () => void): void;
}
export interface ProcessorBuilderOptions {
    mode: HealthMonitorSessionMode;
    onFaceDetected: OnFaceDetected;
    cameraId: string;
    onVitalSign?: OnVitalSign;
    onFinalResults?: OnFinalResults;
    onError?: OnError;
    onWarning?: OnWarning;
    orientation?: DeviceOrientation;
    subjectDemographic?: SubjectDemographic;
}
export interface ProcessorOptions {
    onFaceDetected: OnFaceDetected;
    onVitalSign?: OnVitalSign;
    onFinalResults?: OnFinalResults;
    onError?: OnError;
    onWarning?: OnWarning;
    resolveFeatures: ResolveFeatures;
    logAlgoMeasurements?: LogAlgoMeasurements;
    doLogging?: boolean;
    doPerformance?: boolean;
    doRecording?: boolean;
    doMeasuring?: boolean;
    sdkLogger?: SdkLoggerType;
    requestedOrientation?: DeviceOrientation;
    subjectDemographic?: SubjectDemographic;
    cameraId: string;
}
export interface ResolveFeatures {
    (measurementTime: number): MonitorFeatures;
}
