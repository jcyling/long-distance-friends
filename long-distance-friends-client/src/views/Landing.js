import React from "react";

const Index = () => {
  return (
    <div>
      <main>
        <section className="pt-32 pb-24 px-5">
          <h1 className="leading-tighter tracking-tighter pb-24">An easier way for long distance friends to schedule a hang out.</h1>
          <button className="btn">
            <a href="/login">
              Make a hangout
            </a>
          </button>
        </section>
        <section className="">
          <h2>
            Make plans for people in different timezones.
          </h2>
          <div>
            <span className="font-extrabold">Link ➔ Time ➔ Hangout</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;