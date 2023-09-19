import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WordHeader = () => {
  return (
    <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your voice {'<>'} deepfake voice
        </h1>

        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[20px]">Some sample text to read off</AccordionTrigger>
            <AccordionContent className="max-w-[700px]">
              Ladies and gentlemen, welcome to the bustling streets of New York City, the city that never sleeps. Nestled on the eastern coast of the United States, New York City stands tall as a global metropolis, capturing the dreams and aspirations of millions.

              As you walk through the vibrant neighborhoods, the symphony of diverse cultures fills the air. From the iconic Times Square, where the neon lights dance with electric energy, to the serene beauty of Central Park, where nature finds solace amidst the concrete jungle, New York City offers an experience like no other.

              The city's architecture is a testament to human ingenuity and ambition. The towering skyscrapers of Manhattan, including the Empire State Building and One World Trade Center, reach for the heavens, symbolizing the indomitable spirit of New Yorkers. Each street corner tells a story, from the historic brownstones of Brooklyn to the artistic graffiti adorning the walls of the Lower East Side.

              New York City is a cultural melting pot, where people from every corner of the globe come together to create a vibrant tapestry of traditions. The aroma of diverse cuisines permeates the air, tantalizing taste buds with flavors from every continent. From savoring authentic Italian pizza in Little Italy to indulging in a mouthwatering hot dog from a street vendor, culinary delights await at every turn.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  )
}

export default WordHeader