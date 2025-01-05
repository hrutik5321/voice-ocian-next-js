"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store";
import { removeArtist } from "@/features/cartSlice";
import { cn } from "@/lib/utils";
import { Actor } from "@/types";
import Link from "next/link";
interface UserCardProps {
  isSameUser?: boolean;
  isBooked?: boolean;
  isSlider?: boolean;
  details?: Actor;
}

const UserCard: FC<UserCardProps> = ({
  isSameUser,
  isBooked,
  isSlider,
  details,
}) => {
  const disptch = useAppDispatch();
  return (
    <div
      className={cn(
        "border border-primary  hover:shadow-lg p-3 lg:p-5 rounded-md transition-all h-min overflow-hidden",
        isSlider ? "lg:mr-5" : "",
      )}
    >
      <div className={cn("lg:flex gap-3", isSlider ? "flex" : "")}>
        <img
          loading="lazy"
          src={
            details?.profile_photo
              ? details.profile_photo
              : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
          }
          alt=""
          className={cn(
            "lg:rounded-full rounded-md w-full h-[120px] lg:w-[65px] lg:h-[65px]",
            isSlider ? "w-[65px] h-[65px] rounded-full" : "",
          )}
        />
        <div className="text-sm mt-2 lg:mt-0 text-center lg:text-left">
          <Link
            href={`/voice-over-talents/${details?.id}`}
            className="text-primary font-medium"
          >
            {details?.name}
          </Link>
          <p className="truncate w-full text-xs">{details?.id}</p>
          <p>Channel Promo</p>
        </div>
      </div>
      <div className="flex text-xs lg:text-base text-primary font-medium gap-1 flex-wrap lg:gap-2 mt-3">
        <p>{details?.gender}</p>
        {details?.languages ? <p>|</p> : <></>}

        <p>{details?.languages}</p>

        {details?.artist_category ? <p>|</p> : <></>}
        <p>{details?.artist_category}</p>
      </div>
      <audio controls className="w-full mt-3">
        <source
          src={
            details?.voice_samples.length
              ? details.voice_samples[0].sample
              : "https://file-examples.com/storage/fe0e2ce82f660c1579f31b4/2017/11/file_example_MP3_700KB.mp3"
          }
          type="audio/ogg"
        />
        {/* <source src="horse.mp3" type="audio/mpeg" /> */}
        Your browser does not support the audio element.
      </audio>
      {/* <div className="flex justify-center mt-4"> */}
      {!isSameUser && !isBooked ? (
        <Link href={`/voice-over-talents/${details?.id}`}>
          <Button
            className="bg-primary w-full mt-4 hover:bg-primary"
            // onClick={() => navigate("/voice-over-talents/" + details?.id)}
          >
            Book Now
          </Button>
        </Link>
      ) : (
        <></>
      )}

      {isBooked ? (
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
            if (details) disptch(removeArtist({ removedArtist: details }));
          }}
        >
          Remove
        </Button>
      ) : (
        <></>
      )}

      {/* </div> */}
    </div>
  );
};

export default UserCard;
