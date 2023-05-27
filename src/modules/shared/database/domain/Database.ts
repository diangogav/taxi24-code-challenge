export interface Database {
  connect(): Promise<void>
  close(): Promise<void>
  clear(): Promise<void>
}