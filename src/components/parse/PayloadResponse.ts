import { SensorResponse } from "../../service";

export interface PayloadResponse {
  id: string;
  identifier: string;
  parsed: SensorResponse[];
  encodingKey: string;
  date:Date;
}
