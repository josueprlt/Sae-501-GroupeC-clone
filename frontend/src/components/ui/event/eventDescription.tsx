export default function EventDescription({ description }: { description: string }) {
    return (
        <div className='flex flex-col w-full md:bg-secondary rounded-lg md:px-8 md:py-5 lg:h-full md:shadow-md'>
            <h4 className='mt-2.5 mb-8 font-bold text-xl md:text-2xl'>Description</h4>
            <p className='line-clamp-3 md:line-clamp-none text-sm'>{description}</p>
        </div>
    );
}