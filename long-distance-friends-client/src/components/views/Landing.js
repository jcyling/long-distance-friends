import React from "react";
import Footer from "../common/Footer";

const Index = () => {

  return (
    <div>
      <main className="px-10">
        <section className="pt-32 pb-24 px-20 bg-gradient-to-tr from-purple-300 to-orange-200 rounded-[3rem] flex flex-col justify-center items-center">
          <h1 className="leading-tighter tracking-tighter text-gray-900 font-extrabold w-2/3">
            Schedule hangouts for friends and family in different timezones.
          </h1>
          <p className="pb-24">
            An easier way for people to figure out when they can meet.
          </p>
          <button className="btn text-gray-800 bg-white hover:bg-amber-300 00 text-xl">
            <a href="/login">
              Make a hangout
            </a>
          </button>
          <div className="flex flex-nowrap flex-row place-content-around clear-both h-max w-full">
            <img
              src={require("../../static/images/illustrations/034.png")}
              style={{
                height: "30rem",
              }}
            />
            <img
              src={require("../../static/images/illustrations/026.png")}
              style={{
                height: "30rem",
              }}
            />
          </div>
        </section>
        <section className="my-5 py-20 px-10 bg-gray-100 flex flex-col rounded-[3rem] items-center">
          <h2>
            Make plans easily for multiple people.
          </h2>
          <div className="py-10 flex flex-wrap flex-row justify-evenly text-4xl tracking-tighter w-1/2 md:flex-nowrap sm:flex-wrap">
            <span className="bg-amber-300 px-5 py-2 rounded-full shrink-0">Get a Link</span>
            <span className="p-3 sm:w-full">➔</span>
            <span className="bg-amber-300 px-5 py-2 rounded-full shrink-0">Find Time</span>
            <span className="p-3 sm:w-full">➔</span>
            <span className="bg-amber-300 px-5 py-2 rounded-full shrink-0">Hangout</span>
          </div>
          <img
            src={require("../../static/images/illustrations/024.png")}
            style={{
              height: "30rem",
            }}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;