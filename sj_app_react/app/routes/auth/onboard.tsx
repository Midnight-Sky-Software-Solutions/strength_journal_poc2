import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/onboard"
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { KG_GUID, LBS_GUID } from "lib/utils";
import { Button } from "primereact/button";
import { object } from "zod";
import { useNavigate } from "react-router";

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const { data } = await sjclient.GET("/api/Countries");
  return data!;
}

export default function Onboard({
  loaderData
}: Route.ComponentProps) {
  const weightUnitOptions = [
    { label: 'KG', value: KG_GUID },
    { label: 'LBS', value: LBS_GUID }
  ];

  const [onboardingData, setOnboardingData] = useState({
    userCountryCode: 'CA',
    preferredWeightUnitId: KG_GUID
  });

  const [ working, setWorking ] = useState(false);

  const navigate = useNavigate();

  function onboard(formData: FormData) {
    setWorking(true);
    sjclient.POST("/api/Users", {
      body: Object.fromEntries(formData)
    })
    .then(() => navigate('/'))
    .finally(() => setWorking(false))
    console.log(Object.fromEntries(formData));
  }

  return (
    <div className="w-full flex justify-center">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <h2 className="text-2xl font-bold">Onboarding</h2>
          <form
            action={onboard}
            className="grow flex flex-col gap-5 mt-10"
          >
            <div className="flex flex-col gap-6 pt-5">
              <Dropdown
                name="userCountryCode"
                options={loaderData}
                optionLabel="name"
                optionValue="code"
                value={onboardingData.userCountryCode}
                onChange={e => setOnboardingData({ ...onboardingData, userCountryCode: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-6 pt-5">
              <Dropdown
                name='preferredWeightUnitId'
                options={weightUnitOptions}
                value={onboardingData.preferredWeightUnitId}
                onChange={e => setOnboardingData({ ...onboardingData, preferredWeightUnitId: e.target.value })}
              />
            </div>
            <div>
              <Button loading={working} label="Let's Go!" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}