import { join } from "path";
import { readFile } from "fs";

const dataDir = join(__dirname, "../data");

interface TestFixtures {
  tests: TestCase[];
}

export interface TestCase {
  base: string;
  expected: string;
}

export const loadFixtures = (fileName: string): Promise<TestFixtures> => {
  return new Promise((resolve, reject) => {
    const filePath = join(dataDir, fileName);
    readFile(filePath, { encoding: "utf8" }, (error, data) => {
      if (error) return reject(error);
      try {
        resolve(JSON.parse(data.toString()));
      } catch (error) {
        return reject(error);
      }
    });
  });
};
