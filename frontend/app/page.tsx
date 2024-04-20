import { fetchTotalTrails, fetchTrailss } from "@utils/test";
import { HomeProps, TrailProps } from "@types";
import {
  trailNoise,
  trailDifficulty,
  trailLength,
  trailRating,
  trailBorough,
} from "@constants";
import TrailCard from "@components/TrailCard";
import { ShowMore, CustomFilter, Hero } from "@components";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allTrails = (await fetchTrailss({
    borough: searchParams.borough || "",
    length: searchParams.length || "short",
    rating: searchParams.rating || "3+stars",
    noise: searchParams.noise || "normal",
    difficulty: searchParams.difficulty || "easy",
    limit: searchParams.limit || 8,
  })) as Array<any>;

  const allTrailsSize = (await fetchTotalTrails()) as number;
  const isDataEmpty = !allTrails || Object.keys(allTrails).length === 0;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-20 padding-x padding-y max-width" id="discover">
        <div className="ml-5">
          <Image
            src="/hikerai.png"
            alt="hikerai"
            width={200}
            height={200}
            className="object-contain"
          />
          {/* <h1 className="text-4xl font-extrabold">HikerAI Search</h1>
          <p>Explore out trails you might like</p> */}
        </div>

        <div className="home__filter-container">
          <h1 className="text-[25px] font-extrabold mr-6">Explore: </h1>
          <CustomFilter title="borough" options={trailBorough} />
          <CustomFilter title="length" options={trailLength} />
          <CustomFilter title="rating" options={trailRating} />
          <CustomFilter title="noise" options={trailNoise} />
          <CustomFilter title="difficulty" options={trailDifficulty} />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__trails-wrapper">
              {Object.entries(allTrails).map(([borough, trails]) =>
                trails.map((trail: TrailProps, index: number) => (
                  <TrailCard key={index} trail={trail} />
                ))
              )}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) >= allTrailsSize}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
