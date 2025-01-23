import { Skeleton } from "@nextui-org/react";

export default function PageEventSkeleton() {
    return (
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7">
            <div className="rounded-lg hidden object-cover md:block w-full col-span-7 h-96 bg-slate-200"></div>
            <div className="lg:col-span-3">
                <div className='flex w-full rounded-lg px-3 md:px-8 md:py-5 min-h-72 md:min-h-fit relative overflow-hidden items-end text-primary-foreground md:text-secondary-foreground lg:h-full lg:items-start bg-slate-100 animate-pulse'>
                    <div className='absolute z-[-10] w-full h-full left-0 object-cover rounded-lg md:hidden'></div>
                    <div className='w-full flex flex-col mt-48 md:mt-0 gap-2 lg:justify-between lg:h-full'>
                        <div className='flex items-center md:items-start md:flex-col gap-2 mb-1'>
                            <h1 className='text-xl md:text-2xl font-bold bg-slate-200 text-slate-200 rounded-2xl'>Animate</h1>
                        </div>
                        <div className='flex items-center gap-1.5 font-semibold'>
                            <div>
                                <p className="bg-slate-200 text-slate-200 rounded-2xl">Animate</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-1.5 font-semibold bg-slate-200 text-slate-200 rounded-2xl'><p>Animate</p></div>
                        <div className='flex items-center gap-1.5 font-semibold bg-slate-200 text-slate-200 rounded-2xl'><p>Animate</p></div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-4">
                <div className="flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full bg-slate-100 animate-pulse">
                    <div className="aspect-square w-32 md:w-auto lg:order-2 bg-slate-200 rounded-2xl">
                    </div>
                    <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full">
                        <h4 className="hidden md:block ml-3 mt-2.5 mb-8 font-bold text-xl md:text-2xl bg-slate-200 text-slate-200 rounded-2xl">
                            Animate
                        </h4>
                        <div className="flex gap-11 mb-5 font-semibold">
                            <p className="bg-slate-200 text-slate-200 rounded-2xl">Animate</p>
                            <p className="mr-6 bg-slate-200 text-slate-200 rounded-2xl">Animate</p>
                        </div>
                        <div className="bg-slate-200 text-slate-200 rounded-2xl">
                            <p className="hidden md:block font-semibold">Animate</p>
                            <p className="line-clamp-3 md:line-clamp-none text-sm">Animate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3 xl:col-span-4">
                <div className='flex flex-col w-full rounded-lg md:px-8 md:py-5 lg:h-full bg-slate-100 animate-pulse'>
                    <h4 className='mt-2.5 mb-8 font-bold text-xl md:text-2xl bg-slate-200 text-slate-200 rounded-2xl'>Animate</h4>
                    <p className='h-full line-clamp-3 md:line-clamp-none text-sm bg-slate-200 text-slate-200 rounded-2xl'>Animate</p>
                </div>
            </div>
            <div className="lg:col-span-4 xl:col-span-3">
                <div className='flex flex-col w-full lg:h-full rounded-lg p-1.5 md:px-8 md:py-5 w-fit hidden md:block bg-slate-100 animate-pulse'>
                    <h4 className='mt-2.5 mb-5 font-bold text-xl md:text-2xl bg-slate-200 text-slate-200 rounded-2xl'>Animate</h4>
                    <div className='flex gap-12 justify-evenly'>
                        <div className='pb-16 pt-10'>
                            <p className='mb-8 bg-slate-200 text-slate-200 rounded-2xl'>Animate</p>
                            <ul className='flex gap-5 flex-wrap'>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                            </ul>
                        </div>
                        <span className='w-px bg-border'></span>
                        <div className='pb-16 pt-10'>
                            <p className='mb-8 bg-slate-200 text-slate-200 rounded-2xl'>Animate</p>
                            <ul className='flex gap-5'>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                                <li className="w-[40px] h-[40px] bg-slate-200 text-slate-200 rounded-2xl"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 lg:col-span-7 bg-slate-200 text-slate-200 rounded-2xl">
            </div>
        </div>
    );
}