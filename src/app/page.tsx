import Mockup from "./Components/Mockup";
import { CardHoverEffectDemo } from "./Components/Cardhover";
import { Testimonials } from "./Components/Testimonals";
import Visionandmision from "./Components/Visionandmision";

import CoreValues2 from "./Components/Corevalue2";
import Whoarewe from "./Components/Whoarewe";
import Homebanner from "./Components/HomeBanner";

export default function Home() {
  return (
    <>
      <Mockup />

      <Whoarewe />

      <CardHoverEffectDemo />

      <Visionandmision />
      <Homebanner />
      <div className="sm:mt-0 mt-5">
        <CoreValues2 />
      </div>

      <Testimonials />
    </>
  );
}
