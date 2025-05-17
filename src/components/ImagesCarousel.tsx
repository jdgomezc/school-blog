import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/landscape-carousel";

import school_1 from "@/assets/school_1.jpeg";
import school_2 from "@/assets/school_2.jpeg";
import school_3 from "@/assets/school_3.jpeg";
import school_4 from "@/assets/school_4.jpeg";
import school_5 from "@/assets/school_5.jpeg";
import school_6 from "@/assets/school_6.jpeg";
import school_7 from "@/assets/school_7.jpeg";
import school_8 from "@/assets/school_8.jpeg";
import school_9 from "@/assets/school_9.jpeg";
import school_10 from "@/assets/school_10.jpeg";

export default function ImagesCarousel() {
  const height = "h-96 2xl:h-[40rem]";

  const images = [
    school_1,
    school_2,
    school_3,
    school_4,
    school_5,
    school_6,
    school_7,
    school_8,
    school_9,
    school_10,
  ];

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className={`w-full ${height}`}
    >
      <CarouselContent>
        {images.map(({ src }, i) => (
          <CarouselItem key={i}>
            <div className="select-none">
              <Card className={"p-0 border-0"}>
                <CardContent
                  className={`flex aspect-square items-center justify-center p-0 ${height}`}
                >
                  <img
                    src={src}
                    alt={`image_${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
