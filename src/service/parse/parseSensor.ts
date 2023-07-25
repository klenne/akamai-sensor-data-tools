import { getSeperator, isJSON, isBool, RawSensorJson } from "./utils";
import { secondDec, firstDec } from "./dec";
import { v4 as uuidv4 } from "uuid";

interface Divider {
  identifier: string;
  endIdentifier?: string;
  name: string;
  reverse?: boolean; // incase data is behind the divider - necessary for first children
  children?: Divider[];
  last?: boolean;
  new?: boolean;
}

export interface ParsedSensor {
  [name: string]: string;
}
export interface ParsedSensorResponse {
  sensor: SensorResponse[];
  encodingKey: string;
}
export interface SensorResponse {
  id: string;
  name: string;
  value: string;
}
const dividers: Divider[] = [
  { identifier: "-100", name: "deviceData" },
  { identifier: "-105", name: "informinfo" },
  { identifier: "-108", name: "bmak.kact" },
  { identifier: "-101", name: "windowEvents" },
  { identifier: "-110", name: "bmak.mact" },
  { identifier: "-117", name: "bmak.tact" },
  { identifier: "-109", name: "bmak.dmact" },
  { identifier: "-102", name: "informinfo" },
  { identifier: "-111", name: "bmak.doact" },
  { identifier: "-114", name: "bmak.pact" },
  { identifier: "-103", name: "bmak.vcact" },
  { identifier: "-106", name: "bmak.aj_type + bmak.aj_indx" },
  { identifier: "-115", name: "bunch of stuff" },
  { identifier: "-112", name: "document.URL" },
  { identifier: "-119", name: "bmak.mr" },
  { identifier: "-122", name: "sed" },
  { identifier: "-123", name: "mn_r part 1" },
  { identifier: "-124", name: "mn_r part 2" },
  { identifier: "-126", name: "mn_r part 3" },
  { identifier: "-127", name: "bmak.nav_perm" },
  { identifier: "-128", name: "one28" },
  { identifier: "-131", name: "one31" },
  { identifier: "-132", name: "one32" },
  { identifier: "-133", name: "one33" },
  { identifier: "-70", name: "bmak.fpcf.fpValStr" },
  { identifier: "-80", name: "fpValHash" },
  { identifier: "-90", name: "dynamicFuncRes" },
  { identifier: "-116", name: "bmak.o9" },
  { identifier: "-129", name: "some fingerprint stuff", last: true },
];

function recursiveSplitByDivider(
  sensor: string,
  detailed: boolean,
  divider: Divider,
  seperator: string
): ParsedSensor | null {
  const { name, children, reverse, endIdentifier, last, identifier } = divider;
  let finalParsedSensor: ParsedSensor = {};

  let firstSplit = [];

  let secondSplit = [];

  if (!reverse) {
    firstSplit = sensor.split(divider.identifier + seperator);

    if (firstSplit.length < 2) return null;

    if (endIdentifier) {
      if (firstSplit[1].includes(endIdentifier)) {
        secondSplit = firstSplit[1].split(endIdentifier);
      } else {
        secondSplit = firstSplit;
      }
    } else {
      secondSplit = firstSplit[1].split(seperator);
    }
  } else {
    firstSplit = sensor.split(endIdentifier || divider.identifier);
    if (firstSplit.length < 2) return null;

    secondSplit = firstSplit;
  }

  if (!last && !divider.new && secondSplit.length < 2) return null;

  let value = secondSplit[0];

  if (detailed && children && children.length > 0) {
    children.forEach((child) => {
      if (value.length < 3) return;
      const childParsedSensor = recursiveSplitByDivider(value, detailed, child, seperator);
      if (childParsedSensor) {
        finalParsedSensor = {
          ...finalParsedSensor,
          ...childParsedSensor,
        };
        const replaceValue = `${childParsedSensor[child.name]}${
          child.endIdentifier ? child.endIdentifier : ""
        }`;
        value = value.replace(replaceValue, "");
      } else {
        let splitReplace = "";
        if (child.endIdentifier) splitReplace = child.endIdentifier;
        [, value] = value.split(splitReplace);
      }
    });
  } else {
    finalParsedSensor = {
      ...finalParsedSensor,
      [name]: value,
    };
  }

  if (identifier === "-100" || identifier === "-115") {
    const val = finalParsedSensor[name];
    if (val.includes(":;:")) {
      console.log("\n", JSON.stringify(val.split(",;,").sort()));
    } else {
      console.log("\n", JSON.stringify(val.split(",")));
    }
  }

  return finalParsedSensor;
}

const parseBmSzComps = (sensor: string): number[] => {
  return sensor
    .slice(2)
    .split(";")
    .slice(0, 2)
    .map((n) => Number(n));
};

export const ParseNewSensor = (sensor: string, detailed: boolean): ParsedSensorResponse => {
  try {
    let rawSensor = sensor.toString();

    const jsonCheck = isJSON(sensor);
    if (!isBool(jsonCheck) && "sensor_data" in (jsonCheck as RawSensorJson)) {
      rawSensor = (jsonCheck as RawSensorJson).sensor_data;
    }

    const bmSzComps = parseBmSzComps(rawSensor);

    const dirty = rawSensor.split(";").slice(4).join(";");

    const halfClean = firstDec(dirty, bmSzComps[0]);

    const clean = secondDec(halfClean, bmSzComps[1]);

    const seperator = getSeperator(clean);

    console.log("\n", clean);
    console.log("\n", JSON.stringify(clean.split(seperator)));

    let parsedSensor = [] as SensorResponse[];
    let dividersCp = [...dividers] as any;

    let match: any;
    let regex = RegExp(`${seperator}(-\\d{2,3})`, "gm");
    while ((match = regex.exec(clean)) !== null) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      console.log(match[1]);
      if (!dividersCp.find((itemd: Divider) => itemd.identifier == match[1])) {
        dividersCp.push({ identifier: match[1], name: `New token ${match[1]}`, new: true });
      }
    }

    dividersCp.forEach((d: Divider) => {
      const values = recursiveSplitByDivider(clean, detailed, d, seperator);
      if (values != null) {
        let val = Object.getOwnPropertyNames(values);
        parsedSensor.push({ id: uuidv4(), name: `${val[0]}`, value: values[`${val[0]}`] });
      }
    });
    let encodingKey = "";
    let keyMatch = /.{22}==/gm.exec(clean);
    if (keyMatch) {
      encodingKey = keyMatch[0];
    }
    return { encodingKey: encodingKey, sensor: parsedSensor };
  } catch (e) {
    throw e;
  }
};

export const CamelCaseToSentenceCase = (camelCaseString: string): string => {
  const result = camelCaseString.replace(/([A-Z])/g, " $1");
  return `${result.charAt(0).toUpperCase()}${result.slice(1)}`;
};
