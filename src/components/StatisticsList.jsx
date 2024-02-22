"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

async function getOPR(teamKey) {
  try {
    const res = await fetch(
      `https://api.ftcscout.org/rest/v1/teams/${teamKey}/quick-stats?season=2023`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      console.info("Success: " + res.statusText);
      console.info("Received OPR");
    } else {
      console.warn("Failure: " + res.statusText);
      throw new Error("HTTP " + res.status);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn("Failure: ", e);
  }
}

async function getData(teamName) {
  const npOPR = await getOPR(teamName);
  const totalOPR = Math.round(npOPR.tot.value);
  const autoOPR = Math.round(npOPR.auto.value);
  const teleOpORP = Math.round(npOPR.dc.value);
  const endgameOPR = Math.round(npOPR.eg.value);
  console.info(totalOPR, autoOPR, teleOpORP, endgameOPR);
}

/*
  async function getMatchDetails(teamKey) {
    try {
      const res = await fetch(
        `https://theorangealliance.org/api/team/${teamKey}/matches/2324`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "X-TOA-Key": process.env.ORANGE_ALLIANCE_KEY,
            "X-Application-Origin": "FTC Scouting",
          },
        }
      );
      if (res.ok) {
        console.info("Success: " + res.statusText);
        console.info("Received Match Details");
      } else {
        console.warn("Failure: " + res.statusText);
        throw new Error("HTTP " + res.status);
      }
      return await res.json();
    } catch (e) {
      console.warn("Failure: ", e);
    }
  }
  */

export default async function StatisticsList() {
  const statistics = [
    {
      id: 1,
      name: "Autonomous OPR",
      value: "000",
      dataSet: [
        {
          id: 1,
          name: "Team Prop",
          value: "Yes",
        },
        { id: 2, name: "Yellow Pixel", value: "Yes" },
        { id: 3, name: "Purple Pixel", value: "Yes" },
      ],
    },
    {
      id: 2,
      name: "TeleOp OPR",
      value: "111",
      dataSet: [
        {
          id: 1,
          name: "Mosaics",
          value: "222",
        },
        { id: 2, name: "Set Name", value: "333" },
        { id: 3, name: "Penalties", value: "444" },
        { id: 4, name: "Total Points", value: "555" },
      ],
    },
    {
      id: 3,
      name: "Endgame OPR",
      value: "666",
      dataSet: [
        {
          id: 1,
          name: "Drone",
          value: "10",
        },
        { id: 2, name: "Climb", value: "Backstage" },
      ],
    },
  ];

  return (
    <div>
      <div className="p-10">
        <div className="px-2 sm:px-0">
          <h1 className="text-xl mb-2 w-fit dark:text-white">Team Data</h1>
          <p className="text-md text-gray-700 w-fit dark:text-gray-300">
            Performance Statistics
          </p>
        </div>
        <div className="mt-6 border-t border-gray-400">
          <dl className="divide-y divide-gray-400">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 dark:text-white">
              <dt className="leading-6 text-md w-fit font-semibold">
                Team Number:
              </dt>
              <dd className="mt-1 leading-6 sm:col-span-2 sm:mt-0 text-md w-fit">
                {/* {teamNumber} from Query */}
              </dd>
            </div>
            {statistics.map(({ id, name, value, dataSet }) => (
              <Disclosure key={id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="px-4 py-6 sm:flex sm:flex-cols sm:gap-x-4 sm:px-0 w-full dark:text-white">
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 " : ""
                        } h-4 w-4 transition-all duration-300 transform`}
                      />
                      <dt className="leading-6 font-semibold text-md w-fit">
                        {name}:
                      </dt>
                      <dd className="leading-6 sm:col-span-2 sm:mt-0 w-fit">
                        {value}
                      </dd>
                    </Disclosure.Button>
                    {dataSet.map(({ id, name, value }) => (
                      <Disclosure.Panel className="divide-y divide-gray-400">
                        <div
                          key={id}
                          className="ml-16 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 dark:text-white"
                        >
                          <dt className="leading-6 font-semibold text-md w-fit">
                            {name}:
                          </dt>
                          <dd className="leading-6 sm:col-span-2 sm:mt-0 w-fit">
                            {value}
                          </dd>
                        </div>
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}