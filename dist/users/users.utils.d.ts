import { Resolver } from "./../types.d";
export declare const SECRET_DEV = "8afd3f57-5bb7-459a-94fa-c8b588a28f72";
export declare const getUser: (token: string) => Promise<{
    id: number;
    username: string;
    email: string;
    name: string | null;
    location: string | null;
    avatarURL: string | null;
    githubUsername: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
declare type ProtectedResolver = (resolvedFn: Resolver) => Resolver;
export declare const loginOnlyProtector: ProtectedResolver;
export {};
