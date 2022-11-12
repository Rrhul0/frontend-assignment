import { Event } from '../features/events/eventSlice'

export default function EventCard({ event }: { event: Event }) {
    return (
        <li className='shadow-lg shadow-stone-300 py-6 px-8 rounded-lg'>
            <h2 className='text-primary font-bold text-xl'>{event.desc}</h2>
            <div className='text-secondry text-sm'>{event.startDate}</div>
        </li>
    )
}
