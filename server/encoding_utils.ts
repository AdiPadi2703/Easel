import {
  v4 as uuidv4,
  parse as uuidParse,
  stringify as uuidStringify,
} from "uuid";

export async function convert_to_UUID(input: number) {
  const baseUUID = uuidv4();
  const bytes = Buffer.from(baseUUID.replace(/-/g, ""), "hex");
  bytes.writeUInt32BE(input, bytes.length - 4);
  return uuidStringify(bytes);
}

export async function convert_from_UUID(uuid: string) {
  const bytes = Buffer.from(uuidParse(uuid));
  return bytes.readUint32BE(bytes.length - 4);
}
