import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface CertificationFormInput {
    cv?: ExternalBlob;
    portfolio?: ExternalBlob;
    name: string;
    education: Array<Education>;
    workExperience: Array<WorkExperience>;
    email: string;
    additionalFiles: Array<ExternalBlob>;
    skills: Array<Skill>;
}
export interface Skill {
    name: string;
    level: string;
}
export interface WorkExperience {
    description: string;
    company: string;
    position: string;
    durationInMonths: bigint;
}
export interface Education {
    certificate?: ExternalBlob;
    institution: string;
    degree: string;
    yearGraduated: bigint;
}
export interface CertificationForm {
    cv?: ExternalBlob;
    id: string;
    portfolio?: ExternalBlob;
    name: string;
    education: Array<Education>;
    workExperience: Array<WorkExperience>;
    email: string;
    additionalFiles: Array<ExternalBlob>;
    timestamp: Time;
    skills: Array<Skill>;
}
export interface backendInterface {
    getForms(): Promise<Array<CertificationForm>>;
    submitForm(input: CertificationFormInput): Promise<string>;
}
