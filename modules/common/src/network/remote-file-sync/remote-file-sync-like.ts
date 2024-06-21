// An interface to define an object that provides remote file sync (and keep syncd)
// capabilities.  Mainly in common so I don't have to import AWS into my sqlite package
// or vice versa

import { FileTransferResult } from "./file-transfer-result.js";

export interface RemoteFileSyncLike {
   get lastSyncEpochMS(): number ;
   get remoteModifiedAtLastSyncEpochMS(): number ;
   get localFileName(): string ;
   get localFileBytes(): number ;
   get localFileUpdatedEpochMS(): number ;
   get remoteUpdatedEpochMS(): Promise<number> ;
   get remoteSizeInBytes(): Promise<number> ;
   sendLocalToRemote(): Promise<FileTransferResult> ;
   fetchRemoteToLocal(): Promise<FileTransferResult> ;
   fetchRemoteToLocalIfNewerThan?(epochMS: number): Promise<FileTransferResult> ;
}

