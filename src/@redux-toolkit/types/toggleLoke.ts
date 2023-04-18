export interface REQUEST {
  token: string,
  pid: string,
  uid: string,
  type: "INC" | "DEC",
  me: any,
  oid: string,
};