import { pool } from "./index";

export const execute = <T>(
  query: string,
  params: string[] | Object
): Promise<T> => {
  try {
    if (!pool) throw new Error("Pool is not created.");

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("failed to execute query");
  }
};
