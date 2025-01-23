import { Skeleton } from "@nextui-org/react";

export function CardEventSkeleton() {
    return (
        <li
            className="flex justify-between items-center gap-10 h-32 w-full 4xl:w-[480px] rounded-3xl bg-slate-100 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden animate-pulse"
        >
          <section className='flex flex-col justify-between w-full h-full p-3.5 pr-0'>
            <div className='text-sm md:text-lg bg-slate-200 text-slate-200 rounded-2xl'>
              <p className='w-full'>animate</p>
              <p className='w-full'>animate</p>
            </div>
            <div className='flex gap-2 text-cardDate text-xs md:text-sm bg-slate-200 text-slate-200 rounded-2xl'>
              <p className='w-full'>animate</p>
            </div>
          </section>
          <section className='w-5/12 h-full sm:w-6/12 bg-slate-200 text-slate-200'>
            <span className='object-cover w-full h-full'></span>
          </section>
        </li>
      );
}