import { Tab } from "@headlessui/react";
import { Result } from "ethers/lib/utils";

import { AuctionState } from "../pages";
import { useAccount, useBlockNumber } from "wagmi";

import ConnectWalletBtn from "./ConnectWallet";

import Logo from "../images/lil-logo.png";
import AuctionBtn from "./AuctionBtn";
import DisabledAuctionBtn from "./DisabledAuctionBtn";
import Link from "next/link";
import PendingLil from "./PendingLil";

interface Props {
  data: Result | undefined;
  isFetching: boolean;
  isFetched: boolean;
}

const InfoLil = ({ data, isFetching, isFetched }: Props) => {
  const { data: blockNumber } = useBlockNumber();
  const { isConnected } = useAccount();
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:max-w-6xl">
      <div className="w-full flex justify-between items-end">
        <span className="w-3/5">
          <Link href="https://lilnouns.wtf">
            <img src={Logo.src} alt="logo" className="cursor-pointer" />
          </Link>
        </span>
        <div className="flex justify-around items-end w-2/5">
          <Link href="#wtf">
            <a className="text-white text-2xl hover:underline mr-2 md:mr-0">WTF?</a>
          </Link>

          <Link href="https://twitter.com/lilblockparty">
            <a className="text-white text-2xl hover:underline mr-2 md:mr-0">Twitter</a>
          </Link>

          <span className="hidden md:block">
            <ConnectWalletBtn />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-start pt-8 ">
        <h1 className="text-5xl font-bold mb-2 text-[#F8F8F2] w-full">Lil&apos; Block Party </h1>
        <p className="font-bold text-[#92FFFF] text-3xl mb-6">
          Watch the blocks. Pick a lil. Join the party.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
        <Tab.Group as="div" className="flex flex-col-reverse">
          <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
            <Tab.Panel>
              {!isFetching && data?.[3] !== undefined && (
                <img
                  src={`data:image/svg+xml;base64,${data?.[2] || ""}`}
                  alt={"nouns"}
                  className="h-full w-full object-cover shadow-xl object-center sm:rounded-lg"
                />
              )}

              {isFetching && data?.[3] !== undefined && (
                <div className="h-full w-full drop-shadow-md sm:rounded-lg flex justify-center bg-[#D4D7E1]" />
              )}

              {data?.[3] === undefined && <PendingLil />}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* lilNoun info */}

        <div className="flex flex-col justify-center mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 my-auto h-full max-w-sm">
          <div className="mt-8">
            {data?.[3] === AuctionState.OVER_NOT_SETTLED && (
              <>
                <p className="text-[#92FFFF] font-bold mb-6 text-2xl">
                  Up next on block {blockNumber}{" "}
                </p>
                <h1 className="text-6xl font-bold text-[#F8F8F2]">
                  {data?.[1] && `Lil Noun # ${parseInt(data[1]._hex.toString())}`}
                </h1>

                <div className="mt-3 mb-3">
                  <h2 className="sr-only">lilNoun information</h2>
                  <p className="text-5xl text-[#F8F8F2]">Ξ 0.15</p>
                </div>
                <AuctionBtn data={data} isFetching={isFetching} />

                <Link href="#wtf">
                  <a className="text-[#92FFFF] underline font-balsamiq mt-4 inline-block">
                    Learn more about settling and bidding on Lil Nouns
                  </a>
                </Link>
              </>
            )}

            {data?.[3] === AuctionState.ACTIVE ||
              (data?.[3] === undefined && <DisabledAuctionBtn />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoLil;
