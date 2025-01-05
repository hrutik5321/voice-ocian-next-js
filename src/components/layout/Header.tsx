"use client";
import { IconType } from "react-icons";
import { FaWhatsapp, FaSkype, FaCaretDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaCartShopping } from "react-icons/fa6";
import { useAppSelector } from "@/store";
import Link from "next/link";
import Image from "next/image";
import HeaderSheet from "./HeaderSheet";
import { useEffect, useState } from "react";

type HeaderInfoLinksProps = {
  Icon: IconType; // Note the capital "I" in Icon
  title: string;
};

const HeaderInfoLinks: React.FC<HeaderInfoLinksProps> = ({ Icon, title }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex gap-1 items-center">
      <Icon className="text-base text-[#999999]" />
      <p className="text-base text-[#f04323]">{title}</p>
    </div>
  );
};

const Header = () => {
  // const navigate = useRouter();
  const linksData = [
    {
      name: "eLearning Voice Over",
      link: "/learning",
      imgUrl: "https://voiceoceanllp.com/img/Voice%20Ocean%20e-Learning.jpg",
    },
    {
      name: "IVR Voice Over",
      link: "/ivr",
      imgUrl: "https://voiceoceanllp.com/img/Voice%20Ocean%20IVR.jpg",
    },
    {
      name: "Videos Voice Over",
      link: "/video-voice-over",
      imgUrl:
        "https://voiceoceanllp.com/img/Voice%20Ocean%20Internet%20Videos.jpg",
    },
    {
      name: "Commercials",
      link: "/commercial-voice-over",
      imgUrl:
        "https://voiceoceanllp.com/img/Voice%20Ocean%20Commercials%20&%20Spots.jpg",
    },
  ];

  const cart = useAppSelector((state) => state.cart);
  return (
    <header className="w-screen py-2 px-5 lg:flex justify-between bg-black bg-opacity-70 fixed items-center z-10">
      {/* LOGO SECTION */}
      <div className="flex md:block mb-5 lg:mb-0 justify-between items-center">
        <Link href="/">
          <Image
            loading="lazy"
            src="/images/voice-ocean-logo.png"
            width={100}
            height={100}
            className="w-[100px] h-[70px] lg:w-[180px] lg:h-[100px]"
            alt="logo"
          />
        </Link>
        <HeaderSheet />
      </div>

      {/* NAV LINKS SECTION */}
      <div>
        <div className="block lg:flex gap-5 justify-end pr-10">
          <div className="flex gap-5">
            <HeaderInfoLinks Icon={FaWhatsapp} title="+91 9850 638 414" />
            <HeaderInfoLinks Icon={FaSkype} title="transru21" />
          </div>
          <div className="flex justify-between items-center ">
            <HeaderInfoLinks
              Icon={MdEmail}
              title="projects@voiceoceanllp.com"
            />
            <Link
              className="relative cursor-pointer lg:hidden"
              // onClick={() => navigate("/cart-checkout")}
              href="/cart-checkout"
            >
              <FaCartShopping className="text-white" size={18} />
              {cart.bookedArtists.length > 0 ? (
                <div className="w-[15px] h-[15px] rounded-full absolute -top-2 -right-2 bg-primary flex items-center justify-center">
                  <p className=" text-white text-xs">
                    {cart.bookedArtists.length}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </Link>
          </div>
        </div>

        <div className="lg:flex mt-2 gap-1 items-center hidden pr-10">
          <Button variant="ghostprimary">
            <Link href="/">HOME</Link>
          </Button>
          <Link href="/voice-over">
            <Button variant="ghostprimary">VOICE OVER</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghostprimary">ABOUT US</Button>
          </Link>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghostprimary">
                SERVICES <FaCaretDown className="text-xs ml-1" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white p-0 rounded border-t-2 border-primary border-r-0 border-b-0 border-l-0 translate-x-[26%] mt-[-5px]">
              {linksData.map((link, i) => {
                return (
                  <div className="hover:bg-gray-100 px-5">
                    <Link
                      className=" text-sm px-4 py-1 cursor-pointer w-full "
                      // onClick={() => navigate(link.link)}
                      href={link.link}
                      key={i}
                    >
                      <p className="text-grayTxt" key={link.name}>
                        {link.name}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </HoverCardContent>
          </HoverCard>

          <Link href="/clients">
            <Button variant="ghostprimary">OUR CLIENTS</Button>
          </Link>
          <Link href="/contact-us">
            <Button variant="ghostprimary">CONTACT US</Button>
          </Link>

          <Link
            className="relative cursor-pointer"
            // onClick={() => navigate("/cart-checkout")}
            href={"/cart-checkout"}
          >
            <FaCartShopping className="text-white" size={18} />
            {cart.bookedArtists.length > 0 ? (
              <div className="w-[15px] h-[15px] rounded-full absolute -top-2 -right-2 bg-primary flex items-center justify-center">
                <p className=" text-white text-xs">
                  {cart.bookedArtists.length}
                </p>
              </div>
            ) : (
              <></>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
