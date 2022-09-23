import { pool } from './db';
import { RowDataPacket } from "mysql2";
import type { RequestHandler } from '@builder.io/qwik-city';

import { Resource, component$ } from '@builder.io/qwik';
import { useEndpoint } from "@builder.io/qwik-city";


type EndpointData = CityData | undefined;

interface CityData extends RowDataPacket {
  Name: string;
  Population: number;
}

export class CityPopRepo {
  async readByName(name: string): Promise<EndpointData> {
    const queryString = "SELECT Name,Population FROM city WHERE Name = ?";
    const [rows, fields] = await pool.query<CityData[]>(queryString, [name ?? 'Kabul']);
    return rows?.[0]
  }
}

export const onGet: RequestHandler<EndpointData> = async ({ url }) => {
  const name = url.searchParams.get("name") ?? 'Kabul';
  const cityPopRepo = new CityPopRepo();
  var row = await cityPopRepo.readByName(name);
  return row
};

export default component$(() => {
  const cityData = useEndpoint<EndpointData>();
  return (
    <Resource
      value={cityData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(city) => (
        <>
          <h1>Name: {city?.Name}</h1>
        </>
      )}
    />
  );
});

