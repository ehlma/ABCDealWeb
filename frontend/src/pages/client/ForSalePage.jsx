

const ForSalePage = () => {
    return (
        <>
            <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 custom:px-6 lg:px-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Biler til salgs</h1>
                <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl">
                    Her finner du bilene vi har ute for salg. Klikk under for å gå direkte til vår Finn-profil.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="https://www.finn.no/mobility/search/car/mobilehome?orgId=8250738"
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="inline-block rounded-full bg-primary text-white px-8 py-3 text-lg font-medium shadow-md hover:bg-primary-dark transition-all duration-300"
                        >
                        Se biler på Finn.no
                    </a>
                </div>
            </section>
        </>
    )
}

export default ForSalePage;