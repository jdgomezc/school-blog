import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import school_1 from "@/assets/school_1.webp"
import school_2 from "@/assets/school_2.webp"
import school_3 from "@/assets/school_3.webp"

export default function ImagesCarousel() {

    const height = "h-[30rem]"

    const images = [school_1, school_2, school_3]

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
                        <div className="">
                            <Card className={"p-0 border-0"}>
                                <CardContent className={`flex aspect-square items-center justify-center p-0 ${height}`}>
                                    <img src={src} alt={`image_${i+1}`} className="w-full h-full object-cover" draggable="false" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}
