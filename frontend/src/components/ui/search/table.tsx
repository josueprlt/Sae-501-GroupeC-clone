import Link from 'next/link';
import { CardEvent } from "@/components/ui/event/cardEvent";

export default function EventsTable({
  events,
}: {
  events: any[];
}) {
  return (
    <div className="w-full">
      <ul className="flex items-center gap-5 my-10 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {events.map((event, index) => (
          <CardEvent
            nom={event.title}
            lieu={event.location}
            startDate={event.start_date}
            endDate={event.end_date}
            img={event.image}
            id={event.id}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}