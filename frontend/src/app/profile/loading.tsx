export default function PageProfileSkeleton() {

    return (
        <div className="animate-pulse">
            <div className="flex">
                <button className="text-slate-200 bg-slate-200 mb-2 mr-2 px-2 py-2 px-4 rounded-lg">Modifier le profil</button>
                <button className="text-slate-200 bg-slate-200 mb-2 mr-2 px-2 py-2 px-4 rounded-lg">Modifier les paramètres</button>
                <button className="text-slate-200 bg-slate-200 mb-2 mr-2 px-2 py-2 px-4 rounded-lg">Supprimer mon compte</button>
            </div>
            <div className="flex w-full text-slate-100 bg-slate-100 p-1.5 rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full">
                <div className="flex flex-row-reverse gap-10 w-full hover:cursor-pointer lg:order-2 text-slate-100 bg-slate-100">
                    <div className="rounded-lg object-cover hover:opacity-75 bg-slate-200 h-full w-full" />
                    <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full text-slate-100 bg-slate-100">
                        <h4 className="hidden md:block mt-2.5 mb-8 font-bold text-xl md:text-2xl text-slate-200 bg-slate-200 rounded-lg">
                            Animate
                        </h4>
                        <div className="flex gap-11 mb-5 font-semibold">
                            <p className="text-slate-200 bg-slate-200 rounded-lg">
                                Animate
                            </p>
                            <p className="mr-6 text-slate-200 bg-slate-200 rounded-lg">Animate</p>
                        </div>

                        <div className="overflow-hidden rounded-lg">
                            <p className="hidden md:block font-semibold text-slate-200 bg-slate-200">Animate</p>
                            <p className="line-clamp-3 md:line-clamp-none text-sm text-slate-200 bg-slate-200">Animate</p>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}