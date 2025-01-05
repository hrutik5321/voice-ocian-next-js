"use client";
import { fetchLanguagesAndCategories } from "@/services/home";
import { useEffect, useState } from "react";

const LanguagesList = () => {
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const languagesList = await fetchLanguagesAndCategories().then(
  //   (data) => data.languages,
  // );
  useEffect(() => {
    fetchLanguagesAndCategories()
      .then((data) => {
        setLanguagesList(data.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <ul className="list-disc grid lg:grid-cols-7 mt-24 ml-10 col-start-7 grid-cols-2 justify-center items-center overflow-x-hidden">
      {languagesList.map((lang, i) => {
        return (
          <li className="text-sm text-primary leading-7" key={i}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
};

export default LanguagesList;
