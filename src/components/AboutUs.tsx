export function AboutUs(){
    return(
    <section className="food">
        <div className="flex flex-col items-center justify-center px-6 pt-24 pb-32"> 
            <div className= "w-4/5 max-w-6xl bg-white rounded-lg shadow">
                 <img className="mx-auto items-center justify-center" src="/src/assets/color_logo.png"></img>
                 <div className="flex flex-col items-center justify-center px-6 py-8">
                    <span className="text-3xl">Your schools' dining halls - </span>
                    <span className="mt-4 text-3xl font-medium text-blue-700">simplified</span>

                    <span className="text-3xl mt-16">Our features -</span>
                    <ul className = 'list-disc mt-3 space-y-3 text-lg font-semibold'>
                        <li>Quick, convenient dining hall reviews</li>
                        <li>Managed university accounts</li>
                        <li>Hall calendars, menus, and general information</li>
                        <li>Nutritional break-downs</li>
                    </ul>
                 </div>
                 <div className="flex flex-col items-center justify-center px-6 py-8">
                    <span className="text-2xl">Meet the team -</span>
                    <div className="flex flex-col items-center justify-center mt-6 mb-6 text-xl">
                        <img className="h-60" src="/src/assets/team_icon_1.png"></img>
                        Peter
                    </div>
                    <ul className = 'flex space-x-10'>
                        <div className="flex flex-col items-center justify-center text-xl">
                        <img className="w-48" src="/src/assets/team_icon_2.png"></img>
                        Frank
                        </div>

                        <div className="flex flex-col items-center justify-center text-xl">
                        <img className="w-48" src="/src/assets/team_icon_2.png"></img>
                        Rodolfo
                        </div>

                        <div className="flex flex-col items-center justify-center text-xl">
                        <img className="w-48" src="/src/assets/team_icon_2.png"></img>
                        Niklas
                        </div>
                    </ul>
                 </div>

                 <div className="flex flex-col items-center justify-center px-6 py-8 text-3xl">
                    Thank you!
                 </div>
            </div>
        </div>
    </section>)
}